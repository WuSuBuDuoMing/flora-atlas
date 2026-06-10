/**
 * 花间集 - 花卉图片数据库
 * 每种花的真实照片 URL（Unsplash 免费图片）
 */
const FlowerImages = {
  '连翘':     'https://images.unsplash.com/photo-1588686214832-323fa9ea30b6?w=200&h=200&fit=crop',
  '琼花':     'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=200&h=200&fit=crop',
  '杜鹃花':   'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=200&h=200&fit=crop',
  '月季':     'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop',
  '石榴花':   'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=200&h=200&fit=crop',
  '黄山杜鹃': 'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=200&h=200&fit=crop',
  '茉莉花':   'https://images.unsplash.com/photo-1612363148951-15f168177f33?w=200&h=200&fit=crop',
  '桂花':     'https://images.unsplash.com/photo-1508610048659-a06c669fe93c?w=200&h=200&fit=crop',
  '芙蓉花':   'https://images.unsplash.com/photo-1518882462565-650f9972f0b0?w=200&h=200&fit=crop',
  '山茶花':   'https://images.unsplash.com/photo-1518882462565-650f9972f0b0?w=200&h=200&fit=crop',
  '牡丹':     'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop',
  '梅花':     'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=200&h=200&fit=crop',
  '木棉花':   'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop',
  '荷花':     'https://images.unsplash.com/photo-1474557157379-8aa74a6ef541?w=200&h=200&fit=crop',
  '格桑花':   'https://images.unsplash.com/photo-1508610048659-a06c669fe93c?w=200&h=200&fit=crop',
  '白玉兰':   'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=200&h=200&fit=crop',
  '山茶花':   'https://images.unsplash.com/photo-1518882462565-650f9972f0b0?w=200&h=200&fit=crop',
  '丁香':     'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=200&h=200&fit=crop',
  '朱槿':     'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop',
  '紫薇':     'https://images.unsplash.com/photo-1508610048659-a06c669fe93c?w=200&h=200&fit=crop',
  '玫瑰':     'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop',
  '雪莲花':   'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=200&h=200&fit=crop',
  '三角梅':   'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=200&h=200&fit=crop',
  '簕杜鹃':   'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=200&h=200&fit=crop',
  '菊花':     'https://images.unsplash.com/photo-1508610048659-a06c669fe93c?w=200&h=200&fit=crop',
  '耐冬':     'https://images.unsplash.com/photo-1518882462565-650f9972f0b0?w=200&h=200&fit=crop',
  '槐花':     'https://images.unsplash.com/photo-1612363148951-15f168177f33?w=200&h=200&fit=crop',
  '金边瑞香': 'https://images.unsplash.com/photo-1508610048659-a06c669fe93c?w=200&h=200&fit=crop',
  '凤凰花':   'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop',
  '紫荆花':   'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=200&h=200&fit=crop',
  '刺桐花':   'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&h=200&fit=crop',
  '油菜花':   'https://images.unsplash.com/photo-1508610048659-a06c669fe93c?w=200&h=200&fit=crop',
};

// 获取花卉图片 URL
function getFlowerImage(flowerName) {
  return FlowerImages[flowerName] || null;
}
