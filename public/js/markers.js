/**
 * 花间集 - 花卉标记模块（Leaflet 版）
 * 在地图上创建和管理花卉标记点，支持季节过滤和高亮定位
 *
 * @module MarkersModule
 */

const MarkersModule = (function () {

  /** @type {Array<{leafletMarker: L.Marker, data: Object}>} 所有标记及其数据 */
  let markers = [];

  /** @type {L.LayerGroup|null} Leaflet 图层组 */
  let markerLayer = null;

  /**
   * 初始化花卉标记
   * 为每朵花卉创建 Leaflet marker 并绑定点击、悬停事件
   * @param {Array<Object>} flowers - 花卉数据数组
   */
  function init(flowers) {
    const map = MapModule.getMap();
    if (!map) return;

    markerLayer = L.layerGroup().addTo(map);

    flowers.forEach(flower => {
      const marker = L.marker([flower.lat, flower.lng], {
        icon: createIcon(flower),
        riseOnHover: true,
      });

      marker.on('click', () => {
        DetailModule.show(flower);
      });

      // hover 显示标签
      marker.bindTooltip(`${flower.city} · ${flower.name}`, {
        direction: 'top',
        offset: [0, -16],
        className: 'flower-tooltip',
      });

      marker.addTo(markerLayer);
      markers.push({ leafletMarker: marker, data: flower });
    });
  }

  /**
   * 创建花卉标记图标（Leaflet divIcon）
   * 稀有度为 rare 的花卉会有额外的光环动画效果
   * @param {Object} flower - 花卉数据对象
   * @returns {L.divIcon} Leaflet divIcon 实例
   */
  function createIcon(flower) {
    // 使用花卉独特图标和颜色
    const icon = typeof getFlowerIcon === 'function'
      ? getFlowerIcon(flower.name)
      : { emoji: flower.emoji, hue: flower.color };

    const isRare = flower.rarity === 'rare';
    const isUncommon = flower.rarity === 'uncommon';
    const glowStyle = isRare
      ? `box-shadow:0 3px 12px ${icon.hue}30, 0 0 18px ${icon.hue}50, 0 0 36px ${icon.hue}20;`
      : isUncommon
        ? `box-shadow:0 3px 12px ${icon.hue}30, 0 0 10px ${icon.hue}30;`
        : `box-shadow:0 3px 12px ${icon.hue}30;`;
    const rarityRing = isRare
      ? `<div style="position:absolute;inset:-4px;border-radius:50%;border:2px solid ${icon.hue}60;animation:rarity-pulse 2s ease-in-out infinite;pointer-events:none;"></div>`
      : '';

    return L.divIcon({
      className: 'flower-leaflet-marker',
      html: `<div style="position:relative;width:36px;height:36px;${isRare ? 'animation:rarity-float 3s ease-in-out infinite;' : ''}">${rarityRing}<div style="
        width:36px;height:36px;
        border-radius:50%;
        background:linear-gradient(135deg, ${icon.hue}40, ${icon.hue}20);
        border:2px solid ${icon.hue}60;
        display:flex;align-items:center;justify-content:center;
        ${glowStyle}
        cursor:pointer;
        transition:transform 0.3s ease;
      "><span style="font-size:20px;line-height:1;">${icon.emoji}</span></div></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  }

  /**
   * 按季节过滤标记可见性
   * @param {string} season - 'all' | 'spring' | 'summer' | 'autumn' | 'winter'
   */
  function filterBySeason(season) {
    markers.forEach(({ leafletMarker, data }) => {
      if (season === 'all' || data.season === season) {
        leafletMarker.setOpacity(1);
        leafletMarker.getElement()?.classList.remove('dimmed');
      } else {
        leafletMarker.setOpacity(0.15);
        leafletMarker.getElement()?.classList.add('dimmed');
      }
    });
  }

  /**
   * 高亮并定位到指定花卉标记
   * @param {string} id - 花卉 ID
   */
  function highlight(id) {
    const match = markers.find(m => m.data.id === id);
    if (match) {
      const map = MapModule.getMap();
      if (map) {
        map.setView(match.leafletMarker.getLatLng(), 6, { animate: true });
      }
      // 闪烁效果
      const el = match.leafletMarker.getElement();
      if (el) {
        el.style.transform = 'scale(1.6)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 500);
      }
    }
  }

  /**
   * 按关键词过滤标记可见性
   * 模糊匹配 city、province、name、desc、place、scientific、alias、rarity、habitat 字段
   * @param {string} keyword - 搜索关键词，空字符串表示显示全部
   * @returns {void}
   */
  function filterBySearch(keyword) {
    const kw = keyword.toLowerCase();
    markers.forEach(({ leafletMarker, data }) => {
      if (!kw) {
        leafletMarker.setOpacity(1);
        leafletMarker.getElement()?.classList.remove('dimmed');
        return;
      }
      const match = ['city', 'province', 'name', 'desc', 'place', 'scientific', 'alias', 'rarity', 'habitat'].some(field => {
        const val = data[field];
        return typeof val === 'string' && val.toLowerCase().includes(kw);
      });
      if (match) {
        leafletMarker.setOpacity(1);
        leafletMarker.getElement()?.classList.remove('dimmed');
      } else {
        leafletMarker.setOpacity(0.1);
        leafletMarker.getElement()?.classList.add('dimmed');
      }
    });
  }

  /**
   * 获取当前显示的标记数量
   * @returns {number} 未被隐藏的标记数量
   */
  function getVisibleCount() {
    return markers.filter(({ leafletMarker }) => leafletMarker.getOpacity() > 0.5).length;
  }

  return { init, filterBySeason, filterBySearch, highlight, getVisibleCount };

})();
