# DevTools 项目代理指南

本文件是 `devtools` 仓库（GitHub: why19970628/devtools）的局部规范。进入本项目前先读本文件与 `README.md`。

## 项目概述

- 纯前端开发者工具箱，Vue 3 + Vite + vue-router，共 132 款工具、12 个分类。
- 设计目标：UI/交互对齐 [devtools.cn](https://www.devtools.cn)（工具页铺满内容区、输入输出框占满剩余高度、示例数据预填、Ctrl+K 搜索、深浅主题、收藏夹）。
- 100% 客户端运行：无后端、无上传、无环境变量、无密钥。

## 常用命令

- `npm run dev` — 开发服务器（默认 http://localhost:5173）
- `npm run build` — 生产构建，产物在 `dist/`
- `npm run preview` — 预览构建产物
- 注意：构建时会有预存在的 CSS minify 警告 `Unexpected ".1xx"…".5xx"`（HttpStatus 相关页面 scoped 选择器），非本次改动引入，可忽略。

## 新增工具流程

1. 新建 `src/views/<Name>.vue`：
   - 根元素用 `class="tool-page"`；复用全局样式（`src/assets/main.css`：`.page-header`、`.action-bar`、`.io-panel`、`.io-box`、`.io-textarea`、`.btn` 等）。
   - 页面**不要设置** `max-width` 居中（工具页需铺满内容区）。
   - 输入框**必须预填示例数据**，参考各工具现有实现。
2. 在 `src/utils/tools.js` 的 `tools` 数组登记：`{ id, name, category, path, desc, icon }`。
3. 在 `src/router/index.js` 添加懒加载路由。

## 代码约定

- 组合式 API + `<script setup>`，无 TypeScript，不引入新依赖；优先用浏览器原生能力与 `src/utils` 现有工具。
- 主题：`src/composables/useTheme.js`（auto 按时段 + 手动切换，localStorage `devtools_theme`）。
- 收藏：`src/utils/favorites.js`（localStorage）。全局分类状态：`src/utils/nav.js`。
- 功能组件在 `src/components/`，布局由 `src/App.vue` 组织（顶栏、侧栏、横向导航只在首页显示、页脚、搜索弹窗等）。
- 保持最小改动：能改共享 CSS/组件一处生效的，不逐个页面改。

## 验证

- 每次改动后运行 `npm run build` 确认构建通过。
- 页面渲染/尺寸验证用 headless Chrome（`--dump-dom` 或本地 remote-debugging + CDP），测量工具可用 `/var/folders/gv/533ns5f53j15dfzpt_50nn5c0000gn/T/opencode/dtc/` 下的临时脚本。
- 参考实现：`src/views/JsonFormat.vue`（示例数据 + onMounted 自动格式化）、`src/views/Base64.vue`。

## 文档位置

- 项目自身文档：仓库根目录 `README.md`（英文默认）、`README_zh-CN.md`、`CONTRIBUTING.md`、`SECURITY.md`。
- 工作区共享文档统一在 `code/docs/`（见工作区根 `AGENTS.md`）。
- 变更结构、接口、配置、数据流或安全规则时，同步更新对应文档。
- 文档中不记录密钥、token 等凭证。

## Git 与发布

- 默认分支 `main`；CI 见 `.github/workflows/ci.yml`（push/PR 自动 `npm ci && npm run build`）。
- 提交信息参考仓库现有风格；未经用户明确要求不擅自 push。