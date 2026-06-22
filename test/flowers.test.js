const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const flowers = require('../data/flowers.json');
const cities = require('../data/cities.json');

describe('花卉数据 (flowers.json)', () => {
  it('应包含 54 条花卉记录', () => {
    assert.strictEqual(flowers.length, 54);
  });

  it('每条记录应包含所有必需字段', () => {
    const requiredFields = ['id', 'city', 'province', 'name', 'emoji', 'months', 'season', 'color', 'bg', 'desc', 'place', 'lat', 'lng', 'scientific', 'alias', 'bestMonth', 'rarity', 'habitat', 'bestTime'];
    flowers.forEach((flower, i) => {
      requiredFields.forEach(field => {
        assert.ok(field in flower, `flowers[${i}] 缺少字段 "${field}"`);
      });
    });
  });

  it('所有 id 应唯一', () => {
    const ids = flowers.map(f => f.id);
    const unique = new Set(ids);
    assert.strictEqual(unique.size, ids.length);
  });

  it('所有季节值应合法', () => {
    const validSeasons = ['spring', 'summer', 'autumn', 'winter'];
    flowers.forEach(flower => {
      assert.ok(validSeasons.includes(flower.season), `${flower.id} 季节无效: ${flower.season}`);
    });
  });

  it('月份数组应非空且值在 1-12 范围内', () => {
    flowers.forEach(flower => {
      assert.ok(flower.months.length > 0, `${flower.id} 月份为空`);
      flower.months.forEach(m => {
        assert.ok(m >= 1 && m <= 12, `${flower.id} 月份越界: ${m}`);
      });
    });
  });

  it('经纬度应在中国范围内', () => {
    flowers.forEach(flower => {
      assert.ok(flower.lat >= 18 && flower.lat <= 54, `${flower.id} lat 越界: ${flower.lat}`);
      assert.ok(flower.lng >= 73 && flower.lng <= 135, `${flower.id} lng 越界: ${flower.lng}`);
    });
  });

  it('color 和 bg 应为有效的十六进制颜色值', () => {
    const hexPattern = /^#[0-9a-fA-F]{6}$/;
    flowers.forEach(flower => {
      assert.ok(hexPattern.test(flower.color), `${flower.id}.color 无效: ${flower.color}`);
      assert.ok(hexPattern.test(flower.bg), `${flower.id}.bg 无效: ${flower.bg}`);
    });
  });

  it('每个季节都应有花卉覆盖', () => {
    const seasons = new Set(flowers.map(f => f.season));
    assert.ok(seasons.has('spring'));
    assert.ok(seasons.has('summer'));
    assert.ok(seasons.has('autumn'));
    assert.ok(seasons.has('winter'));
  });

  it('所有稀有度值应合法', () => {
    const validRarities = ['common', 'uncommon', 'rare'];
    flowers.forEach(flower => {
      assert.ok(validRarities.includes(flower.rarity), `${flower.id} 稀有度无效: ${flower.rarity}`);
    });
  });

  it('bestMonth 应在 1-12 范围内', () => {
    flowers.forEach(flower => {
      assert.ok(flower.bestMonth >= 1 && flower.bestMonth <= 12, `${flower.id} bestMonth 越界: ${flower.bestMonth}`);
    });
  });

  it('habitat 和 bestTime 应为非空字符串', () => {
    flowers.forEach(flower => {
      assert.ok(typeof flower.habitat === 'string' && flower.habitat.length > 0, `${flower.id} habitat 为空`);
      assert.ok(typeof flower.bestTime === 'string' && flower.bestTime.length > 0, `${flower.id} bestTime 为空`);
    });
  });
});

describe('城市坐标数据 (cities.json)', () => {
  it('应包含 18 个城市坐标', () => {
    assert.strictEqual(cities.length, 18);
  });

  it('每条记录应包含 city, province, lat, lng 字段', () => {
    cities.forEach((city, i) => {
      assert.ok('city' in city, `cities[${i}] 缺少 city`);
      assert.ok('province' in city, `cities[${i}] 缺少 province`);
      assert.ok('lat' in city, `cities[${i}] 缺少 lat`);
      assert.ok('lng' in city, `cities[${i}] 缺少 lng`);
    });
  });

  it('所有城市坐标应与花卉数据匹配', () => {
    const flowerCityMap = new Map(flowers.map(f => [f.city, f]));
    cities.forEach(city => {
      const flower = flowerCityMap.get(city.city);
      if (flower) {
        assert.strictEqual(flower.lat, city.lat, `${city.city} lat 不匹配`);
        assert.strictEqual(flower.lng, city.lng, `${city.city} lng 不匹配`);
      }
    });
  });
});

describe('花卉图标数据', () => {
  it('花卉名称应与图标数据库一致', () => {
    const iconPath = path.resolve(__dirname, '../public/js/flower-icons.js');
    const iconSource = fs.readFileSync(iconPath, 'utf8');

    const flowerNames = new Set(flowers.map(f => f.name));
    flowerNames.forEach(name => {
      assert.ok(iconSource.includes(`'${name}'`), `图标数据库缺少 "${name}" 的定义`);
    });
  });
});
