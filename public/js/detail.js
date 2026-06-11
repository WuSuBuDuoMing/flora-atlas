/**
 * 花间集 - 详情卡片模块
 * 点击花卉标记后弹出的详情卡片
 */

const DetailModule = (function () {

  let overlay, card;
  let closeBtn;
  let checkinBtn;



  // DOM 元素引用
  const els = {};

  let currentFlower = null;

  /**
   * 初始化详情卡片
   */
  function init() {
    overlay = document.getElementById('detail-overlay');
    card = document.getElementById('detail-card');
    closeBtn = document.getElementById('detail-close');

    // 缓存内容元素
    els.emoji = document.getElementById('detail-emoji');
    els.city = document.getElementById('detail-city');
    els.province = document.getElementById('detail-province');
    els.flowerName = document.getElementById('detail-flower-name');
    els.badge = document.getElementById('detail-badge');
    els.desc = document.getElementById('detail-desc');
    els.place = document.getElementById('detail-place');
    els.months = document.getElementById('detail-months');
    els.season = document.getElementById('detail-season');

    // 关闭事件
    closeBtn.addEventListener('click', hide);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) hide();
    });

    // 打卡按钮
    checkinBtn = document.getElementById('checkin-btn');
    if (checkinBtn) {
      checkinBtn.addEventListener('click', () => {
        if (!currentFlower) return;
        const checked = Utils.getCheckedCities();
        if (!checked.includes(currentFlower.id)) {
          checked.push(currentFlower.id);
          localStorage.setItem('huajianji-checked', JSON.stringify(checked));
        }
        checkinBtn.classList.add('checkin-btn--checked');
        checkinBtn.querySelector('.checkin-btn__text').textContent = '✓ 已打卡';
        checkinBtn.querySelector('.checkin-btn__icon').textContent = '🎉';
        // 打卡后刷新地图高亮
        if (typeof MapModule !== 'undefined') {
          MapModule.renderSVG && MapModule.renderSVG();
        }
      });
    }

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hide();
    });
  }

  /**
   * 显示详情卡片
   * @param {Object} flower - 花卉数据
   */
  function show(flower) {
    currentFlower = flower;

    // 填充数据
    els.emoji.textContent = flower.emoji;
    els.city.textContent = flower.city;
    els.province.textContent = flower.province;
    els.flowerName.textContent = flower.name;
    els.desc.textContent = flower.desc;
    els.place.textContent = flower.place;

    els.season.textContent = Utils.SEASON_MAP[flower.season] || flower.season;

    els.months.innerHTML = flower.months
      .map(m => `<span class="detail-card__month-tag">${Utils.MONTH_NAMES[m - 1]}</span>`)
      .join('');

    // 设置主题色
    card.style.borderTop = `3px solid ${flower.color}`;

    // 更新打卡按钮状态
    if (checkinBtn) {
      const isChecked = Utils.getCheckedCities().includes(flower.id);
      if (isChecked) {
        checkinBtn.classList.add('checkin-btn--checked');
        checkinBtn.querySelector('.checkin-btn__text').textContent = '✓ 已打卡';
        checkinBtn.querySelector('.checkin-btn__icon').textContent = '🎉';
      } else {
        checkinBtn.classList.remove('checkin-btn--checked');
        checkinBtn.querySelector('.checkin-btn__text').textContent = '打卡此城市';
        checkinBtn.querySelector('.checkin-btn__icon').textContent = '📍';
      }
    }

    // 显示浮层
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  /**
   * 隐藏详情卡片
   */
  function hide() {
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  return {
    init,
    show,
    hide
  };

})();
