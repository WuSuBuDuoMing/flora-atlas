/**
 * @fileoverview 花间集 - RESTful API 路由
 * 提供花卉数据、城市坐标、统计数据、搜索、省份聚合、稀有度筛选和 GeoJSON 省级地图接口
 *
 * @module routes/api
 * @requires express
 * @requires path
 * @requires fs
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

/** @type {Array<Object>} 54 个城市花卉数据 */
const flowers = require('../data/flowers.json');

/** @type {Array<Object>} 18 个原始城市坐标 */
const cities = require('../data/cities.json');

/**
 * GeoJSON 省级地图数据（懒加载）
 * @type {Object|null}
 */
let geoData = null;
try {
  const geoPath = path.join(__dirname, '..', 'data', 'china.geo.json');
  geoData = JSON.parse(fs.readFileSync(geoPath, 'utf8'));
} catch (err) {
  console.warn('⚠️ 无法加载 china.geo.json:', err.message);
}

/**
 * 省份聚合统计数据（缓存，避免重复计算）
 * @type {Array<Object>|null}
 */
let provincesCache = null;

/**
 * 统计数据（缓存，避免重复计算）
 * @type {Object|null}
 */
let statsCache = null;

/**
 * GET /api/flowers
 * 获取全部花卉数据
 *
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {{ success: boolean, count: number, data: Array<Object> }}
 */
router.get('/flowers', (req, res) => {
  res.json({
    success: true,
    count: flowers.length,
    data: flowers
  });
});

/**
 * GET /api/flowers/season/:season
 * 按季节筛选花卉（spring / summer / autumn / winter）
 * 注意：此路由必须在 /:id 之前，避免被误匹配
 *
 * @param {string} req.params.season - 季节标识 (spring|summer|autumn|winter)
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {{ success: boolean, season: string, count: number, data: Array<Object> }}
 */
router.get('/flowers/season/:season', (req, res) => {
  const { season } = req.params;
  const validSeasons = ['spring', 'summer', 'autumn', 'winter'];

  if (!validSeasons.includes(season)) {
    return res.status(400).json({
      success: false,
      message: `无效季节参数，可选值: ${validSeasons.join(', ')}`
    });
  }

  const filtered = flowers.filter(f => f.season === season);

  res.json({
    success: true,
    season,
    count: filtered.length,
    data: filtered
  });
});

/**
 * GET /api/flowers/search?q=keyword
 * 按关键词搜索花卉，模糊匹配 city、province、name、desc、place、scientific、alias、rarity、habitat 字段
 *
 * @param {string} req.query.q - 搜索关键词（必填，至少 1 个字符）
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {{ success: boolean, query: string, count: number, data: Array<Object> }}
 *
 * @example
 * GET /api/flowers/search?q=牡丹
 * {
 *   "success": true,
 *   "query": "牡丹",
 *   "count": 2,
 *   "data": [
 *     { "id": "...", "name": "牡丹", "city": "洛阳", "province": "河南", ... }
 *   ]
 * }
 *
 * @example
 * // 缺少 q 参数
 * GET /api/flowers/search
 * {
 *   "success": false,
 *   "message": "缺少搜索关键词参数 q"
 * }
 */
router.get('/flowers/search', (req, res) => {
  const q = req.query.q;

  if (!q || q.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: '缺少搜索关键词参数 q'
    });
  }

  const keyword = q.trim().toLowerCase();

  const matched = flowers.filter(f => {
    return ['city', 'province', 'name', 'desc', 'place', 'scientific', 'alias', 'rarity', 'habitat'].some(field => {
      const value = f[field];
      if (typeof value !== 'string') return false;
      return value.toLowerCase().includes(keyword);
    });
  });

  res.json({
    success: true,
    query: q.trim(),
    count: matched.length,
    data: matched
  });
});

/**
 * GET /api/flowers/rarity/:rarity
 * 按稀有度筛选花卉（common / uncommon / rare）
 * 注意：此路由必须在 /:id 之前，避免被误匹配
 *
 * @param {string} req.params.rarity - 稀有度标识 (common|uncommon|rare)
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {{ success: boolean, rarity: string, count: number, data: Array<Object> }}
 *
 * @example
 * GET /api/flowers/rarity/rare
 * {
 *   "success": true,
 *   "rarity": "rare",
 *   "count": 3,
 *   "data": [
 *     { "id": "...", "name": "雪莲花", "rarity": "rare", ... }
 *   ]
 * }
 */
router.get('/flowers/rarity/:rarity', (req, res) => {
  const { rarity } = req.params;
  const validRarities = ['common', 'uncommon', 'rare'];

  if (!validRarities.includes(rarity)) {
    return res.status(400).json({
      success: false,
      message: `无效稀有度参数，可选值: ${validRarities.join(', ')}`
    });
  }

  const filtered = flowers.filter(f => f.rarity === rarity);

  res.json({
    success: true,
    rarity,
    count: filtered.length,
    data: filtered
  });
});

/**
 * GET /api/flowers/:id
 * 获取单个花卉详情
 *
 * @param {string} req.params.id - 花卉唯一标识
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {{ success: boolean, data: Object }}
 */
router.get('/flowers/:id', (req, res) => {
  const flower = flowers.find(f => f.id === req.params.id);

  if (!flower) {
    return res.status(404).json({
      success: false,
      message: `未找到 id 为 "${req.params.id}" 的花卉数据`
    });
  }

  res.json({
    success: true,
    data: flower
  });
});

/**
 * GET /api/cities
 * 获取所有城市坐标数据
 *
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {{ success: boolean, count: number, data: Array<Object> }}
 */
router.get('/cities', (req, res) => {
  res.json({
    success: true,
    count: cities.length,
    data: cities
  });
});

/**
 * GET /api/stats
 * 获取统计数据（总城市数、已收录城市数、花卉品种数、省份数、稀有度分布等）
 * 使用缓存机制避免重复计算
 *
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {{ success: boolean, data: Object }}
 */
router.get('/stats', (req, res) => {
  if (!statsCache) {
    const uniqueFlowers = [...new Set(flowers.map(f => f.name))];
    const uniqueCities = [...new Set(flowers.map(f => f.city))];
    const uniqueProvinces = [...new Set(flowers.map(f => f.province))];
    const rarityCounts = { common: 0, uncommon: 0, rare: 0 };
    const seasonCounts = { spring: 0, summer: 0, autumn: 0, winter: 0 };
    flowers.forEach(f => {
      if (rarityCounts[f.rarity] !== undefined) rarityCounts[f.rarity]++;
      if (seasonCounts[f.season] !== undefined) seasonCounts[f.season]++;
    });

    statsCache = {
      totalCities: 296,
      checkedCities: flowers.length,
      totalFlowerTypes: 66,
      currentFlowerTypes: uniqueFlowers.length,
      currentProvinces: uniqueProvinces.length,
      rarityCounts,
      seasonCounts,
      cities: uniqueCities,
      flowers: uniqueFlowers,
      provinces: uniqueProvinces
    };
  }

  res.json({
    success: true,
    data: statsCache
  });
});

/**
 * GET /api/provinces
 * 获取所有省份及其花卉统计，按花卉数量降序排列
 *
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {{ success: boolean, count: number, data: Array<{ name: string, flowerCount: number, cities: string[] }> }}
 *
 * @example
 * GET /api/provinces
 * {
 *   "success": true,
 *   "count": 20,
 *   "data": [
 *     { "name": "云南", "flowerCount": 8, "cities": ["昆明", "大理", "丽江"] },
 *     { "name": "四川", "flowerCount": 5, "cities": ["成都", "九寨沟"] }
 *   ]
 * }
 */
router.get('/provinces', (req, res) => {
  if (!provincesCache) {
    const provinceMap = {};

    flowers.forEach(f => {
      const province = f.province;
      if (!province) return;

      if (!provinceMap[province]) {
        provinceMap[province] = { name: province, flowerCount: 0, cities: new Set() };
      }

      provinceMap[province].flowerCount += 1;

      if (f.city) {
        provinceMap[province].cities.add(f.city);
      }
    });

    provincesCache = Object.values(provinceMap)
      .map(p => ({ ...p, cities: [...p.cities].sort() }))
      .sort((a, b) => b.flowerCount - a.flowerCount);
  }

  res.json({
    success: true,
    count: provincesCache.length,
    data: provincesCache
  });
});

/**
 * GET /api/geo
 * 获取中国省级 GeoJSON 地图数据
 *
 * @param {Object} req - Express 请求对象
 * @param {Object} res - Express 响应对象
 * @returns {Object} GeoJSON FeatureCollection
 */
router.get('/geo', (req, res) => {
  if (!geoData) {
    return res.status(503).json({
      success: false,
      message: 'GeoJSON 数据未加载'
    });
  }

  res.json(geoData);
});

module.exports = router;
