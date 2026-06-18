/**
 * @fileoverview 花间集 - Express 服务端入口
 * 提供 REST API 接口和静态文件托管服务
 *
 * @module server
 * @requires express
 * @requires cors
 * @requires path
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

/** @type {import('express').Express} Express 应用实例 */
const app = express();

/** @type {number} 服务监听端口，默认 3003 */
const PORT = process.env.PORT || 3003;

// ---- 中间件 ----
app.use(cors());
app.use(express.json());

// 静态文件服务（前端资源）
app.use(express.static(path.join(__dirname, 'public')));

// API 路由
app.use('/api', apiRoutes);

// 所有非 API 请求返回前端入口页
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---- 启动服务 ----
app.listen(PORT, () => {
  console.log(`🌸 花间集服务已启动: http://localhost:${PORT}`);
  console.log(`📡 API 地址: http://localhost:${PORT}/api`);
});
