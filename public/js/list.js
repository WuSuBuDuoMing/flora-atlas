/**
 * 花间集 - 花卉列表面板模块
 * 底部可展开/收起的花卉列表
 */

const ListModule = (function () {

  let panel, handle, grid, arrow;
  let isExpanded = false;
  let listItems = []; // { element, data }



  /**
   * 初始化列表面板
   * @param {Array} flowers - 花卉数据数组
   */
  function init(flowers) {
    panel = document.getElementById('list-panel');
    handle = document.getElementById('list-handle');
    grid = document.getElementById('list-grid');
    arrow = document.getElementById('list-arrow');

    // 渲染列表
    renderList(flowers);

    // 绑定展开/收起
    handle.addEventListener('click', toggle);

    // 滑动手势支持
    bindSwipe();
  }

  /**
   * 渲染花卉列表
   */
  function renderList(flowers) {
    grid.innerHTML = '';
    listItems = [];

    flowers.forEach(flower => {
      const item = document.createElement('div');
      item.className = 'list-item';
      item.dataset.id = flower.id;
      item.dataset.season = flower.season;

      // 花期月份标签（最多显示 3 个）
      const monthTags = flower.months.slice(0, 3)
        .map(m => `<span class="list-item__month-tag">${Utils.MONTH_NAMES[m - 1]}</span>`)
        .join('');
      const moreTag = flower.months.length > 3
        ? `<span class="list-item__month-tag">+${flower.months.length - 3}</span>`
        : '';

      item.innerHTML = `
        <span class="list-item__emoji">${flower.emoji}</span>
        <div class="list-item__info">
          <div class="list-item__name">${flower.name}</div>
          <div class="list-item__city">${flower.city} · ${flower.province}</div>
        </div>
        <div class="list-item__months">
          ${monthTags}${moreTag}
        </div>
      `;

      // 点击列表项 → 打开详情卡片 + 高亮地图标记
      item.addEventListener('click', () => {
        DetailModule.show(flower);
        MarkersModule.highlight(flower.id);
      });

      grid.appendChild(item);
      listItems.push({ element: item, data: flower });
    });
  }

  /**
   * 切换展开/收起
   */
  function toggle() {
    isExpanded = !isExpanded;

    if (isExpanded) {
      panel.classList.add('expanded');
      document.getElementById('season-filter').classList.add('panel-open');
      // 展开时滚动到顶部
      const content = document.getElementById('list-content');
      if (content) content.scrollTop = 0;
    } else {
      panel.classList.remove('expanded');
      document.getElementById('season-filter').classList.remove('panel-open');
    }
  }

  /**
   * 按季节过滤列表
   * @param {string} season - 'all' | 'spring' | 'summer' | 'autumn' | 'winter'
   */
  function filterBySeason(season) {
    listItems.forEach(({ element, data }) => {
      if (season === 'all' || data.season === season) {
        element.classList.remove('dimmed');
      } else {
        element.classList.add('dimmed');
      }
    });
  }

  /**
   * 绑定触摸滑动手势
   * 上滑展开、下滑收起
   */
  function bindSwipe() {
    let touchStartY = 0;
    let touchMoved = false;

    handle.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }, { passive: true });

    handle.addEventListener('touchmove', (e) => {
      touchMoved = true;
    }, { passive: true });

    handle.addEventListener('touchend', (e) => {
      if (!touchMoved) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      // 上滑超过 30px → 展开
      if (diff > 30 && !isExpanded) {
        toggle();
      }
      // 下滑超过 30px → 收起
      else if (diff < -30 && isExpanded) {
        toggle();
      }
    });
  }

  return {
    init,
    filterBySeason,
    toggle
  };

})();
