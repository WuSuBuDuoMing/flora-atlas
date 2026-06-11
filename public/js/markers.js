/**
 * 花间集 - 花卉标记模块（Leaflet 版）
 * 使用 Leaflet marker 定位花卉
 */

const MarkersModule = (function () {

  let markers = [];  // { leafletMarker, data }
  let markerLayer = null;

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
   * @param {Object} flower - 花卉数据对象
   * @returns {L.divIcon} Leaflet divIcon 实例
   */
  function createIcon(flower) {
    // 使用花卉独特图标和颜色
    const icon = typeof getFlowerIcon === 'function'
      ? getFlowerIcon(flower.name)
      : { emoji: flower.emoji, hue: flower.color };

    return L.divIcon({
      className: 'flower-leaflet-marker',
      html: `<div style="
        width:36px;height:36px;
        border-radius:50%;
        background:linear-gradient(135deg, ${icon.hue}40, ${icon.hue}20);
        border:2px solid ${icon.hue}60;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 3px 12px ${icon.hue}30;
        cursor:pointer;
        transition:transform 0.3s ease;
      "><span style="font-size:20px;line-height:1;">${icon.emoji}</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  }

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

  return { init, filterBySeason, highlight };

})();
