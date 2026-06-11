/**
 * 花间集 - 3D 地球花海视图（CesiumJS 版）
 * 使用 CesiumJS 渲染真实 3D 地球，花卉标记从城市位置生长
 */

const GlobeModule = (function () {

  let viewer = null;
  let isVisible = false;
  let flowers = [];
  let entities = [];

  /**
   * 初始化 3D 地球模块
   * @param {Array} flowerData - 花卉数据数组
   */
  function init(flowerData) {
    flowers = flowerData;
  }

  /**
   * 显示 3D 地球视图
   * 首次调用时初始化 CesiumJS viewer
   */
  function show() {
    isVisible = true;
    const container = document.getElementById('globe-container');
    if (container) container.style.display = 'block';

    if (!viewer && container) {
      // 设置 Cesium Ion token（使用默认 token）
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NDQsImlhdCI6MTcwMTc2MzI2NH0.5cEoQV0sGnXiLfFS4WVfH-kh4KtGQhPXaPhHhiiPgHs';

      // 创建 Cesium viewer
      viewer = new Cesium.Viewer(container, {
        // 地球设置
        globe: true,
        terrain: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        vrButton: false,
        selectionIndicator: false,
        infoBox: false,
        // 使用默认蓝色大理石纹理
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: '//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          maximumLevel: 18,
        }),
      });

      // 设置地球外观
      viewer.scene.globe.enableLighting = true;
      viewer.scene.globe.showGroundAtmosphere = true;
      viewer.scene.fog.enabled = true;
      viewer.scene.fog.density = 0.0002;
      viewer.scene.fog.screenSpaceErrorFactor = 2;

      // 设置相机视角 — 从太空看中国
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(105, 35, 15000000),
        orientation: {
          heading: 0,
          pitch: -90,
          roll: 0,
        },
        duration: 0,
      });

      // 添加花卉标记点
      addFlowerMarkers();

      // 设置大气效果
      viewer.scene.skyAtmosphere.show = true;

      // 设置光照
      viewer.scene.globe.enableLighting = true;
      viewer.shadows = false;
    }
  }

  /**
   * 在 3D 地球上添加花卉标记点
   * 使用 Canvas 生成圆形图标 + emoji
   */
  function addFlowerMarkers() {
    if (!viewer || !flowers.length) return;

    flowers.forEach(flower => {
      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(flower.lng, flower.lat, 0),
        billboard: {
          image: createFlowerIcon(flower),
          width: 32,
          height: 32,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scaleByDistance: new Cesium.NearFarScalar(1e5, 1.2, 1e7, 0.4),
        },
        label: {
          text: `${flower.emoji} ${flower.city}`,
          font: '13px "Noto Serif SC", serif',
          fillColor: Cesium.Color.fromCssColorString('#5A6670'),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -36),
          scaleByDistance: new Cesium.NearFarScalar(1e5, 1.2, 1e7, 0.4),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        description: `
          <div style="font-family:'Noto Serif SC',serif;padding:8px;">
            <h3 style="margin:0 0 8px;color:#5A6670;">${flower.emoji} ${flower.city} · ${flower.name}</h3>
            <p style="margin:0;color:#777;font-size:13px;">${flower.desc}</p>
            <p style="margin:8px 0 0;color:#aaa;font-size:12px;">📍 ${flower.place}</p>
          </div>
        `,
      });

      // 点击标记 → 打开详情卡片
      entity.click = () => {
        if (typeof DetailModule !== 'undefined') {
          DetailModule.show(flower);
        }
      };

      entities.push(entity);
    });
  }

  /**
   * 生成花卉标记的 Canvas 图标
   * @param {Object} flower - 花卉数据对象
   * @returns {string} Canvas data URL
   */
  function createFlowerIcon(flower) {
    // 创建一个 Canvas 图标
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // 圆形背景
    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, Math.PI * 2);
    ctx.fillStyle = flower.color + '40';
    ctx.fill();
    ctx.strokeStyle = flower.color + '80';
    ctx.lineWidth = 2;
    ctx.stroke();

    // emoji
    ctx.font = '32px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(flower.emoji, 32, 32);

    return canvas.toDataURL();
  }

  /**
   * 隐藏 3D 地球视图
   */
  function hide() {
    isVisible = false;
    const container = document.getElementById('globe-container');
    if (container) container.style.display = 'none';
  }

  /**
   * 销毁 CesiumJS viewer 释放资源
   */
  function destroy() {
    if (viewer) {
      viewer.destroy();
      viewer = null;
    }
    entities = [];
  }

  return {
    init,
    show,
    hide,
    destroy
  };

})();
