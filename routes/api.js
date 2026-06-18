/**
 * @fileoverview 花间集 - RESTful API 路由
 * 提供花卉数据、城市坐标、统计数据和 GeoJSON 省级地图接口
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

// 读取 GeoJSON 省级地图数据
let geoData = null;
try {
  const geoPath = path.join(__dirname, '..', 'data', 'china.geo.json');
  geoData = JSON.parse(fs.readFileSync(geoPath, 'utf8'));
} catch (err) {
  console.warn('⚠️ 无法加载 china.geo.json:', err.message);
}

/**
 * GET /api/flowers
 * 获取全部花卉数据
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
 * GET /api/flowers/:id
 * 获取单个花卉详情
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
 * 获取统计数据
 */
router.get('/stats', (req, res) => {
  const uniqueFlowers = [...new Set(flowers.map(f => f.name))];
  const uniqueCities = [...new Set(flowers.map(f => f.city))];
  const uniqueProvinces = [...new Set(flowers.map(f => f.province))];

  res.json({
    success: true,
    data: {
      totalCities: 296,
      checkedCities: flowers.length,
      totalFlowerTypes: 66,
      currentFlowerTypes: uniqueFlowers.length,
      currentProvinces: uniqueProvinces.length,
      cities: uniqueCities,
      flowers: uniqueFlowers,
      provinces: uniqueProvinces
    }
  });
});

/**
 * GET /api/geo
 * 获取中国省级 GeoJSON 地图数据
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
