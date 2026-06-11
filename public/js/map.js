/**
 * 花间集 - 地图交互模块（Leaflet + GeoJSON 版）
 * 使用 Leaflet 地图引擎，GeoJSON 叠加省份
 */

const MapModule = (function () {

  let map = null;
  let geoLayer = null;
  let geoData = null;
  let projection = null;

  const colors = {
    cream: '#FAFBF7',
    dim:   '#D8DDD8',
    ink:   '#5A6670',
    sakura:'#F5DCE0',
    bloom: '#E8B8C2',
    mist:  '#D6E8F0',
    sky:   '#A8C8DC',
  };

  let viewport;

  async function init() {
    viewport = document.getElementById('map-viewport');

    // 加载 GeoJSON
    try {
      const res = await fetch('api/geo');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      geoData = await res.json();
    } catch (err) {
      console.error('加载 GeoJSON 失败:', err);
      viewport.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#5A6670;font-family:serif;font-size:16px;">地图数据加载失败，请刷新重试</div>';
      return;
    }

    // 初始化 Leaflet 地图
    // 中国中心坐标：约 35°N, 105°E
    map = L.map('map-viewport', {
      center: [35, 105],
      zoom: 4,
      minZoom: 3,
      maxZoom: 8,
      zoomControl: false, // 使用自定义控件
      attributionControl: false,
      worldCopyJump: false,
    });

    // 添加省份 GeoJSON 图层
    addProvinces();

    // 绑定自定义控件
    bindControls();
  }

  /**
   * 添加省份 GeoJSON 图层
   * 根据打卡状态高亮已打卡省份
   */
  function addProvinces() {
    if (!geoData || !map) return;

    const checkedCities = getCheckedCities();
    const checkedProvinces = new Set();
    if (typeof App !== 'undefined') {
      App.getAllFlowers().forEach(f => {
        if (checkedCities.includes(f.id)) checkedProvinces.add(f.province);
      });
    }

    geoLayer = L.geoJSON(geoData, {
      style: (feature) => {
        const name = feature.properties.name;
        if (!name) return { fillColor: 'transparent', fillOpacity: 0, stroke: false };
        const lit = isProvinceChecked(name, checkedProvinces);
        return {
          fillColor: lit ? colors.sakura : colors.dim,
          fillOpacity: lit ? 0.68 : 0.34,
          color: lit ? colors.bloom : colors.ink,
          opacity: lit ? 0.95 : 0.24,
          weight: lit ? 2.2 : 1.25,
        };
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.name;
        if (!name) return;

        // hover 高亮
        layer.on('mouseover', function () {
          this.setStyle({ weight: 3, fillOpacity: 0.6 });
          this.bringToFront();
        });
        layer.on('mouseout', function () {
          geoLayer.resetStyle(this);
        });

        // 点击打开详情
        layer.on('click', () => {
          if (typeof App !== 'undefined') {
            const flowers = App.getAllFlowers();
            const match = flowers.find(f => name.includes(f.province) || f.province.includes(name));
            if (match) {
              DetailModule.show(match);
              MarkersModule.highlight(match.id);
            }
          }
        });
      }
    }).addTo(map);

    // 适配地图边界
    map.fitBounds(geoLayer.getBounds(), { padding: [30, 30] });
  }

  /**
   * 从 localStorage 获取已打卡城市 ID 列表
   * @returns {string[]} 已打卡的城市 ID 数组
   */
  function getCheckedCities() {
    return Utils.getCheckedCities();
  }

  /**
   * 判断省份是否已打卡
   * @param {string} geoName - GeoJSON 中的省份名称
   * @param {Set<string>} checkedProvinces - 已打卡省份集合
   * @returns {boolean}
   */
  function isProvinceChecked(geoName, checkedProvinces) {
    for (const p of checkedProvinces) {
      if (geoName.includes(p) || p.includes(geoName)) return true;
    }
    return false;
  }

  /**
   * 绑定自定义地图控件（放大、缩小、重置、适应屏幕）
   */
  function bindControls() {
    document.getElementById('btn-zoom-in').addEventListener('click', () => {
      map.zoomIn();
    });
    document.getElementById('btn-zoom-out').addEventListener('click', () => {
      map.zoomOut();
    });
    document.getElementById('btn-zoom-reset').addEventListener('click', () => {
      map.setView([35, 105], 4);
    });

    const fitBtn = document.getElementById('btn-zoom-fit');
    if (fitBtn) {
      fitBtn.addEventListener('click', () => {
        if (geoLayer) map.fitBounds(geoLayer.getBounds(), { padding: [30, 30] });
      });
    }
  }

  /**
   * 经纬度 → Leaflet 像素坐标
   */
  function lngLatToPixel(lng, lat) {
    if (!map) return { left: '0px', top: '0px' };
    const point = map.latLngToContainerPoint([lat, lng]);
    return { left: `${point.x}px`, top: `${point.y}px` };
  }

  function getState() {
    return { scale: map ? map.getZoom() : 4 };
  }

  function fitToScreen() {
    if (geoLayer) map.fitBounds(geoLayer.getBounds(), { padding: [30, 30] });
  }

  return { init, lngLatToPixel, getState, fitToScreen, getMap: () => map };

})();
