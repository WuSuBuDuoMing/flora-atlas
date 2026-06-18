/**
 * 花间集 - 花卉图标数据库
 * 每种花的独特 emoji 图标和主题色调（hue）
 * 用于地图标记、详情卡片、列表的视觉呈现
 *
 * @module FlowerIcons
 * @type {Object<string, {emoji: string, hue: string}>}
 */
const FlowerIcons = {
  '连翘':     { emoji: '🌼', hue: '#f0c040' },
  '琼花':     { emoji: '🤍', hue: '#f5f5f5' },
  '杜鹃花':   { emoji: '🌺', hue: '#e05080' },
  '月季':     { emoji: '🌹', hue: '#e84060' },
  '石榴花':   { emoji: '🔥', hue: '#e04030' },
  '黄山杜鹃': { emoji: '🌸', hue: '#d060a0' },
  '茉莉花':   { emoji: '🤍', hue: '#f8f8f8' },
  '桂花':     { emoji: '🏵️', hue: '#d4a030' },
  '芙蓉花':   { emoji: '🌺', hue: '#d060a0' },
  '山茶花':   { emoji: '🌹', hue: '#d03050' },
  '牡丹':     { emoji: '🌺', hue: '#d04080' },
  '梅花':     { emoji: '🌸', hue: '#e880a0' },
  '木棉花':   { emoji: '🔴', hue: '#e03020' },
  '荷花':     { emoji: '🪷', hue: '#f0a0c0' },
  '格桑花':   { emoji: '🌸', hue: '#e070a0' },
  '白玉兰':   { emoji: '🤍', hue: '#f0f0f0' },
  '丁香':     { emoji: '💜', hue: '#9b59b6' },
  '朱槿':     { emoji: '🌺', hue: '#e03050' },
  '紫薇':     { emoji: '🌸', hue: '#d060a0' },
  '玫瑰':     { emoji: '🌹', hue: '#e04060' },
  '雪莲花':   { emoji: '🤍', hue: '#e8e8f0' },
  '三角梅':   { emoji: '🌺', hue: '#d03080' },
  '簕杜鹃':   { emoji: '🌺', hue: '#d03080' },
  '菊花':     { emoji: '🌼', hue: '#d4a030' },
  '耐冬':     { emoji: '🌺', hue: '#e03050' },
  '槐花':     { emoji: '🤍', hue: '#f0f0e8' },
  '金边瑞香': { emoji: '🌸', hue: '#d060a0' },
  '凤凰花':   { emoji: '🌺', hue: '#e04030' },
  '紫荆花':   { emoji: '🌸', hue: '#d060a0' },
  '刺桐花':   { emoji: '🌺', hue: '#e03020' },
  '油菜花':   { emoji: '🌼', hue: '#f0d040' },
};

/**
 * 获取指定花卉名称的图标和颜色
 * @param {string} flowerName - 中文花卉名称
 * @returns {{emoji: string, hue: string}} 图标 emoji 和主题色调
 */
function getFlowerIcon(flowerName) {
  return FlowerIcons[flowerName] || { emoji: '🌸', hue: '#e070a0' };
}
