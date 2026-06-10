/**
 * 花间集 - Express 服务端
 * 提供 REST API 和静态文件服务
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
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
