<div align="center">

<img src="logo.svg" width="120" alt="DevTools logo" />

# 🔧 DevTools 开发者在线工具箱

**132+ 款开发者工具，浏览器里即开即用。无需登录、没有后端、数据不出本地。**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.4-42b883.svg)
![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)
![Tools](https://img.shields.io/badge/tools-132-3b82f6.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

</div>

一款快速、纯前端的 **132** 款在线工具合集：格式化、转换、编解码、测试与调试，全部由 Vue 3 + Vite 驱动。灵感来自 [devtools.cn](https://www.devtools.cn)，作为纯静态 SPA：打开页面、粘贴数据、立即得到结果。

## ✨ 特性亮点

- 🚀 **零后端** — 100% 前端实现，不上传、不注册，数据始终留在浏览器。
- ⚡ **按需加载** — 每个工具都是懒加载路由，应用秒开。
- 🔍 **全局搜索** — 按 `Ctrl + K` 检索全部工具，一键直达。
- ⭐ **收藏夹** — 钉住最常用的工具，本地持久化。
- 🌓 **智能主题** — 按时间段自动切换浅色/深色，也可手动切换。
- 📱 **响应式** — 桌面端与移动端均可使用。

## 🧰 工具分类

| 分类 | 说明 | 数量 |
| --- | --- | --- |
| 📄 JSON 工具 | 格式化/校验/对比/树形查看/互转/排序/表格/CSV-Excel | 9 |
| 🔐 编码 / 加密 | Base64、哈希、AES/DES、RSA、JWT、URL、Unicode、摩斯、密码 | 10 |
| 💻 代码格式化 | SQL / HTML / JS / CSS / XML 美化与压缩 | 3 |
| 🔄 常用转换 | 时间戳、进制、命名风格、颜色、二维码、拼音、人民币等 | 25 |
| 🎨 前端 / UI 工具 | 布局辅助、图片工具、单位换算、预处理器、网页工具 | 11 |
| 🗄️ 后端 / 数据库 | SQL 相关工具、转换与生成器 | 5 |
| 🌐 网络工具 | IP、域名、HTTP/状态码、SSL、WebSocket 等 | 8 |
| 📚 开发速查文档 | 常用 API 与语法速查 | 7 |
| 🛠️ 常用开发辅助 | 文本统计、去重、对比、脱敏、Token 计数等 | 13 |
| 📡 物联网 / 嵌入式 | 设备与嵌入式相关工具 | 2 |
| 🔌 开放平台与调试 | 微信 / 淘宝 / 支付宝 等平台调试 | 19 |
| 📖 开发文档与资源 | 精选文档与资源链接 | 20 |

## 🖼️ 预览

![DevTools 首页](screenshots/home.png)

![JSON 格式化](screenshots/json-format.png)

## 🚀 快速开始

```bash
# 克隆
git clone https://github.com/why19970628/devtools.git && cd devtools

# 安装依赖
npm install

# 开发服务器 (http://localhost:5173)
npm run dev

# 生产构建 (dist/)
npm run build

# 预览生产构建
npm run preview
```

> 需要 Node.js ≥ 18。

## 🧱 技术栈

- [Vue 3](https://vuejs.org/) — Composition API
- [Vue Router 4](https://router.vuejs.org/) — 每个工具一个懒加载路由
- [Vite 5](https://vitejs.dev/) — 开发服务器与构建

## 📁 项目结构

```text
src/
├── assets/            # 全局样式与主题变量
├── components/        # 顶栏、侧边栏、导航、搜索弹窗、工具卡片等
├── composables/       # useTheme（自动深浅色）
├── utils/             # 工具注册表、收藏夹（localStorage）
├── views/             # 130+ 个工具页（一文件一工具）
└── main.js
```

## 🤝 参与贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md)。欢迎提交 PR —— 新增工具只需添加一个懒加载视图，并在 `src/utils/tools.js` 里登记即可。

## 📄 许可证

[MIT](LICENSE) © 2026 DevTools Contributors