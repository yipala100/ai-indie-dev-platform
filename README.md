# AI 独立开发者变现工具平台 MVP

> 专为AI时代独立开发者打造的「风口资讯→变现方案→需求验证」一站式轻量化工具平台

## 项目概述

帮助独立开发者解决「找不到方向、不会零成本验证需求」的核心痛点，提供从资讯浏览到方案生成再到需求验证的全链路闭环体验。

## 核心功能模块

| 模块 | 说明 |
|------|------|
| 📰 资讯列表 | 精选独立开发者变现向资讯，50条精准内容 |
| 🤖 方案生成器 | AI驱动的6模块结构化变现方案生成 |
| 🛠️ 需求验证工具箱 | 小红书笔记生成器 / 落地页生成器 / 需求验证SOP |

## 核心链路

```
浏览资讯 → 选择感兴趣的风口 → AI生成变现方案 → 使用工具箱验证需求
```

## 技术栈

| 层级 | 技术选型 |
|------|----------|
| 前端 | React 18 + React Router 6 + Vite |
| 后端 | Node.js + Express（API代理） |
| 数据 | 本地 JSON（无数据库） |
| AI接口 | 豆包 / OpenAI API |
| 部署 | Vercel |
| 协作 | Git 分支开发 |

## 快速开始

### 1. 克隆仓库

```bash
git clone <repo-url>
cd ai-indie-dev-platform
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入 AI API Key
```

### 4. 启动开发服务器

```bash
# 启动前端（Vite dev server）
npm run dev

# 启动后端（Express API 代理）
npm run server
```

### 5. 构建部署

```bash
npm run build
```

## 项目结构

```
ai-indie-dev-platform/
├── public/                  # 静态资源
├── server/                  # Express 后端（API代理）
│   ├── index.js
│   └── routes/
│       └── ai.js           # AI API 代理路由
├── src/
│   ├── assets/
│   │   └── data/
│   │       ├── info.json           # 资讯数据（50条）
│   │       └── backup/             # API故障兜底数据
│   │           ├── backup-plan.json
│   │           ├── backup-xiaohongshu.json
│   │           └── backup-landing.html
│   ├── components/          # 通用组件
│   ├── pages/               # 页面组件
│   │   ├── InfoList.jsx     # 资讯列表页
│   │   ├── InfoDetail.jsx   # 资讯详情页
│   │   ├── PlanGenerator.jsx# 方案生成器
│   │   └── Toolkit/         # 需求验证工具箱
│   │       ├── index.jsx
│   │       ├── XiaohongshuTool.jsx
│   │       └── LandingPageTool.jsx
│   ├── utils/               # 工具函数
│   │   └── api.js           # API 调用封装
│   ├── App.jsx              # 根组件 & 路由
│   ├── App.css
│   ├── index.css
│   └── main.jsx             # 入口文件
├── docs/                    # 项目文档
├── .env.example             # 环境变量模板
├── .gitignore
├── index.html               # Vite 入口 HTML
├── package.json
├── vite.config.js
└── README.md
```

## 团队分工

| 角色 | 成员 | 状态 | 核心职责 |
|------|------|------|----------|
| 产品经理 | 周佳钰 | 脱产 | 需求决策、进度管控、验收 |
| AI工程 & 前端开发 | 姚鑫 | 脱产 | API对接、核心开发、联调 |
| Prompt工程 & 内容质量 | 刘梦圆 | 非脱产 | Prompt优化、内容校验 |
| UI/UX设计 | 徐爱金 | 非脱产 | 页面设计、视觉统一 |
| 内容运营 & 文档 | 阿祖 | 脱产 | 资讯录入、PPT/脚本 |
| 测试 & 质量保障 | 伊帕拉 | 非脱产 | 测试、BUG收集、备份 |

## Git 分支规范

- `main` — 主分支，仅合并已验收通过的代码
- `dev` — 开发分支，日常开发合并到此
- `feature/xxx` — 功能分支，按模块创建
- `hotfix/xxx` — 紧急修复分支

## 开发周期

21天 / 7个3天周期，详见 `docs/` 目录下的项目文档。

## License

MIT
