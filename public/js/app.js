/**
 * @fileoverview 花间集 - 主入口模块
 * 协调各子模块、加载花卉数据、初始化花瓣粒子动画和事件绑定
 *
 * @module App
 */

const App = (function () {

  // ---- 全局数据 ----
  /** @type {Array<Object>} 全部花卉数据 */
  let allFlowers = [];

  /** @type {string} 当前选中的季节筛选值 */
  let currentSeason = 'all';

  /** @type {boolean} 是否处于 3D 地球视图 */
  let isGlobeView = false;

  /** @type {Object|null} 花卉统计数据缓存 */
  let statsCache = null;

  /**
   * 启动应用
   */
  async function boot() {
    try {
      // 加载花卉数据（使用相对路径，兼容子路径部署）
      const res = await fetch('api/flowers');
      const json = await res.json();
      allFlowers = json.data || [];

      // 初始化各模块
      await MapModule.init();
      MarkersModule.init(allFlowers);
      DetailModule.init();
      ListModule.init(allFlowers);

      // 初始化 3D 地球
      GlobeModule.init(allFlowers);

      // 渲染统计信息
      renderStats();

      // 初始化花卉统计面板
      initStatsPanel();

      // 启动花瓣粒子
      startPetals();

      // 绑定季节筛选
      bindSeasonFilter();

      // 绑定视图切换
      bindViewToggle();

      console.log(`🌸 花间集已加载 ${allFlowers.length} 个城市花卉数据`);
    } catch (err) {
      console.error('花间集启动失败:', err);
    }
  }

  /**
   * 渲染顶部统计信息
   */
  function renderStats() {
    const bar = document.getElementById('stats-bar');
    // 从 localStorage 读取真实打卡数据
    let checkedIds = [];
    try { checkedIds = JSON.parse(localStorage.getItem('huajianji-checked') || '[]'); } catch {}
    const checkedCount = allFlowers.filter(f => checkedIds.includes(f.id)).length;
    const flowerTypes = getUniqueCount(allFlowers, 'name');

    bar.innerHTML = `
      已打卡 <span class="stat-highlight">${checkedCount}</span> 城 /
      共 <span class="stat-highlight">${allFlowers.length}</span> 城，
      <span class="stat-highlight">${flowerTypes}</span> 种花
    `;
  }

  /**
   * 统计数组中某字段的去重数量
   * @param {Array} arr - 数据数组
   * @param {string} field - 要去重的字段名
   * @returns {number} 去重后的数量
   */
  function getUniqueCount(arr, field) {
    return [...new Set(arr.map(item => item[field]))].length;
  }

  /**
   * 绑定季节筛选按钮
   */
  function bindSeasonFilter() {
    const filterBar = document.getElementById('season-filter');
    const buttons = filterBar.querySelectorAll('.season-filter__btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // 更新选中状态
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentSeason = btn.dataset.season;

        // 联动过滤标记和列表
        MarkersModule.filterBySeason(currentSeason);
        ListModule.filterBySeason(currentSeason);
      });
    });
  }

  /**
   * 绑定视图切换按钮（地图 ↔ 地球）
   */
  function bindViewToggle() {
    const toggleBtn = document.getElementById('view-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    const toggleLabel = document.getElementById('toggle-label');
    const mapArea = document.getElementById('map-area');
    const globeContainer = document.getElementById('globe-container');
    const seasonFilter = document.getElementById('season-filter');
    const listPanel = document.getElementById('list-panel');

    toggleBtn.addEventListener('click', () => {
      isGlobeView = !isGlobeView;

      if (isGlobeView) {
        // 切换到地球视图 — 平滑过渡
        mapArea.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        mapArea.style.opacity = '0';
        mapArea.style.transform = 'scale(0.95)';
        if (seasonFilter) {
          seasonFilter.style.transition = 'opacity 0.3s ease';
          seasonFilter.style.opacity = '0';
        }
        if (listPanel) {
          listPanel.style.transition = 'opacity 0.3s ease';
          listPanel.style.opacity = '0';
        }

        setTimeout(() => {
          mapArea.style.visibility = 'hidden';
          mapArea.style.pointerEvents = 'none';
          if (seasonFilter) seasonFilter.style.visibility = 'hidden';
          if (listPanel) listPanel.style.visibility = 'hidden';

          globeContainer.style.display = 'block';
          globeContainer.style.opacity = '0';
          globeContainer.style.transition = 'opacity 0.5s ease';
          requestAnimationFrame(() => {
            globeContainer.style.opacity = '1';
          });
          GlobeModule.show();
        }, 400);

        toggleBtn.classList.add('active');
        toggleIcon.textContent = '🗺️';
        toggleLabel.textContent = '地图视图';
      } else {
        // 切换到地图视图 — 平滑过渡
        globeContainer.style.transition = 'opacity 0.4s ease';
        globeContainer.style.opacity = '0';

        setTimeout(() => {
          GlobeModule.hide();
          globeContainer.style.display = 'none';

          mapArea.style.visibility = 'visible';
          mapArea.style.pointerEvents = '';
          mapArea.style.opacity = '0';
          mapArea.style.transform = 'scale(1.02)';
          mapArea.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          requestAnimationFrame(() => {
            mapArea.style.opacity = '1';
            mapArea.style.transform = 'scale(1)';
          });

          if (seasonFilter) {
            seasonFilter.style.visibility = 'visible';
            seasonFilter.style.opacity = '0';
            seasonFilter.style.transition = 'opacity 0.4s ease 0.2s';
            requestAnimationFrame(() => { seasonFilter.style.opacity = '1'; });
          }
          if (listPanel) {
            listPanel.style.visibility = 'visible';
            listPanel.style.opacity = '0';
            listPanel.style.transition = 'opacity 0.4s ease 0.3s';
            requestAnimationFrame(() => { listPanel.style.opacity = '1'; });
          }
        }, 400);

        toggleBtn.classList.remove('active');
        toggleIcon.textContent = '🌍';
        toggleLabel.textContent = '地球视图';
      }
    });
  }

  /**
   * 花瓣粒子飘落系统
   * 25 个 emoji 花瓣持续飘落
   */
  function startPetals() {
    const container = document.getElementById('petals-container');
    const petalEmojis = ['🌸', '🌺', '🏵️', '💮', '🌼', '🍃', '🪷', '💮', '✿', '❀'];
    const PETAL_COUNT = 25;

    for (let i = 0; i < PETAL_COUNT; i++) {
      createPetal(container, petalEmojis, i);
    }
  }

  /**
   * 创建单个花瓣
   */
  function createPetal(container, emojis, index) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = emojis[index % emojis.length];

    // 随机参数
    const size = 14 + Math.random() * 16;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * duration;
    const drift = -60 + Math.random() * 120;
    const rotation = 180 + Math.random() * 360;

    petal.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      --drift: ${drift}px;
      --rotation: ${rotation}deg;
    `;

    container.appendChild(petal);
  }

  /**
   * 获取当前季节筛选状态
   */
  function getCurrentSeason() {
    return currentSeason;
  }

  /**
   * 获取所有花卉数据
   */
  function getAllFlowers() {
    return allFlowers;
  }

  /**
   * 计算并缓存花卉统计数据
   * 包含各季节数量、各稀有度数量、覆盖省份总数等
   * @returns {Object} 统计数据对象
   */
  function getStats() {
    if (statsCache) return statsCache;

    const seasonCounts = { spring: 0, summer: 0, autumn: 0, winter: 0 };
    const rarityCounts = { common: 0, uncommon: 0, rare: 0 };
    const provinces = new Set();
    const flowerTypes = new Set();

    allFlowers.forEach(f => {
      if (seasonCounts[f.season] !== undefined) seasonCounts[f.season]++;
      if (rarityCounts[f.rarity] !== undefined) rarityCounts[f.rarity]++;
      if (f.province) provinces.add(f.province);
      if (f.name) flowerTypes.add(f.name);
    });

    statsCache = {
      totalCities: allFlowers.length,
      totalFlowerTypes: flowerTypes.size,
      totalProvinces: provinces.size,
      seasonCounts,
      rarityCounts,
    };

    return statsCache;
  }

  /**
   * 初始化右侧花卉统计信息面板
   * 显示稀有度分布和覆盖省份数
   */
  function initStatsPanel() {
    const stats = getStats();
    let panel = document.querySelector('.flower-stats-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'flower-stats-panel';
      document.body.appendChild(panel);
    }

    panel.innerHTML = `
      <div class="flower-stats-panel__row">
        <span class="flower-stats-panel__label">覆盖省份</span>
        <span class="flower-stats-panel__value">${stats.totalProvinces}</span>
      </div>
      <div class="flower-stats-panel__row">
        <span class="flower-stats-panel__label">花卉品种</span>
        <span class="flower-stats-panel__value">${stats.totalFlowerTypes}</span>
      </div>
      <div class="flower-stats-panel__row">
        <span class="flower-stats-panel__label">普通</span>
        <span class="flower-stats-panel__value">${stats.rarityCounts.common}</span>
      </div>
      <div class="flower-stats-panel__row">
        <span class="flower-stats-panel__label">少见</span>
        <span class="flower-stats-panel__value">${stats.rarityCounts.uncommon}</span>
      </div>
      <div class="flower-stats-panel__row">
        <span class="flower-stats-panel__label">珍稀</span>
        <span class="flower-stats-panel__value" style="color:#8b5cf6">${stats.rarityCounts.rare}</span>
      </div>
    `;

    // 延迟显示，避免初始化时闪现
    setTimeout(() => panel.classList.add('visible'), 600);
  }

  /**
   * 获取花卉统计数据（外部可调用）
   * @returns {Object} 统计数据对象
   */
  function getStatsData() {
    return getStats();
  }

  return {
    boot,
    getCurrentSeason,
    getAllFlowers,
    getStatsData
  };

})();

// ---- 页面加载后启动 ----
document.addEventListener('DOMContentLoaded', () => {
  App.boot();
});
