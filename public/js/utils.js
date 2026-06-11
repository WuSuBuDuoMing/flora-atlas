/**
 * 花间集 - 共享工具函数
 * 提供跨模块复用的常量和辅助方法
 */

const Utils = (function () {

  /** @type {string[]} 中文月份名称（一月到十二月） */
  const MONTH_NAMES = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  /** @type {Object<string, string>} 季节英文 → 中文显示映射 */
  const SEASON_MAP = {
    spring: '🌸 春季',
    summer: '☀️ 夏季',
    autumn: '🍂 秋季',
    winter: '❄️ 冬季'
  };

  /**
   * 从 localStorage 读取已打卡城市 ID 列表
   * @returns {string[]} 已打卡的城市 ID 数组
   */
  function getCheckedCities() {
    try { return JSON.parse(localStorage.getItem('huajianji-checked') || '[]'); }
    catch { return []; }
  }

  return { MONTH_NAMES, SEASON_MAP, getCheckedCities };

})();
