const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const apiRoutes = require('../routes/api.js');

let server;
let baseUrl;

before(async () => {
  const app = express();
  app.use('/api', apiRoutes);
  server = app.listen(0);
  const port = server.address().port;
  baseUrl = `http://127.0.0.1:${port}`;
});

after(() => {
  server.close();
});

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`${baseUrl}${path}`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    }).on('error', reject);
  });
}

describe('API: GET /api/flowers', () => {
  it('应返回所有花卉数据', async () => {
    const res = await get('/api/flowers');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.strictEqual(res.body.count, res.body.data.length);
  });

  it('每条花卉应包含 id, city, name 字段', async () => {
    const res = await get('/api/flowers');
    res.body.data.forEach(flower => {
      assert.ok('id' in flower);
      assert.ok('city' in flower);
      assert.ok('name' in flower);
    });
  });
});

describe('API: GET /api/flowers/:id', () => {
  it('应返回指定 id 的花卉', async () => {
    const res = await get('/api/flowers/hangzhou');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.city, '杭州');
    assert.strictEqual(res.body.data.name, '桂花');
  });

  it('不存在的 id 应返回 404', async () => {
    const res = await get('/api/flowers/notexist');
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.body.success, false);
  });
});

describe('API: GET /api/flowers/season/:season', () => {
  it('应按季节筛选花卉', async () => {
    const res = await get('/api/flowers/season/spring');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.season, 'spring');
    res.body.data.forEach(f => {
      assert.strictEqual(f.season, 'spring');
    });
  });

  it('无效季节应返回 400', async () => {
    const res = await get('/api/flowers/season/invalid');
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.success, false);
  });
});

describe('API: GET /api/cities', () => {
  it('应返回城市坐标数据', async () => {
    const res = await get('/api/cities');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.strictEqual(res.body.count, 18);
  });
});

describe('API: GET /api/stats', () => {
  it('应返回统计数据', async () => {
    const res = await get('/api/stats');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok('totalCities' in res.body.data);
    assert.ok('checkedCities' in res.body.data);
    assert.ok('currentFlowerTypes' in res.body.data);
    assert.ok('cities' in res.body.data);
    assert.ok('flowers' in res.body.data);
  });
});

describe('API: GET /api/geo', () => {
  it('应返回 GeoJSON 数据', async () => {
    const res = await get('/api/geo');
    assert.strictEqual(res.status, 200);
    assert.ok('type' in res.body);
    assert.ok('features' in res.body);
  });
});
