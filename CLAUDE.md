# 秦基博官方网站 - Claude Code 开发配置

## 项目概述
为日本歌手秦基博打造现代化官网，基于 Next.js 15 App Router，包含 3D 效果、音频播放、动画等高级功能。

## 技术栈
- **Next.js 15+** with App Router
- **React 18+** & **TypeScript**
- **Tailwind CSS** & **Framer Motion**
- **Three.js** & **React Three Fiber** (3D效果)
- **Zustand** & **TanStack Query** (状态管理)
- **Biome** & **Husky** (开发工具)

## 开发命令
```bash
# 安装依赖
npm install

# 开发服务器
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 类型检查
npm run type-check

# 代码格式化
npm run format
```

## 项目结构
```
app/                    # Next.js App Router
├── (main)/            # 主要路由组
│   ├── page.tsx       # 首页 (3D粒子背景)
│   ├── about/         # 关于页面
│   ├── music/         # 音乐作品 (音频播放器)
│   ├── videos/        # MV画廊
│   ├── concerts/      # 演唱会 (视差滚动)
│   ├── news/          # 新闻动态
│   └── contact/       # 联系方式
├── api/               # API路由
├── globals.css       # 全局样式
└── layout.tsx        # 根布局

components/            # React组件
├── ui/               # 基础UI组件
├── music/            # 音乐相关组件
├── animation/        # 动画组件
└── three/            # 3D组件

lib/                  # 工具函数
├── utils.ts         # 通用工具
├── api.ts           # API客户端
└── animations.ts    # 动画配置

types/               # TypeScript类型定义
data/                # 静态数据
public/              # 静态资源
```

## 核心功能
- **首页**: 动态粒子背景、3D场景、Framer Motion动画
- **音乐作品**: 3D陈列、音频可视化、交互式播放器
- **MV画廊**: 沉浸式网格、视频预览效果
- **演唱会**: 视差滚动、交互式地图
- **新闻动态**: 动态卡片、时间轴布局
- **响应式设计**: 移动端优化、断点配置

## 开发规范
- 使用 TypeScript 严格类型检查
- 组件 PascalCase 命名，文件 kebab-case 命名
- 遵循 ESLint + Biome 代码规范
- 使用 Prettier 格式化代码
- Git 提交信息规范: `feat:`, `fix:`, `docs:` 等

## 性能优化
- 图片优化: Next.js Image 组件 + WebP/AVIF
- 代码分割: 动态导入重型组件
- 缓存策略: ISR (Incremental Static Regeneration)
- 3D组件优化: React Three Fiber 性能调优

## 部署
- **平台**: Vercel
- **域名**: 待配置
- **CDN**: Vercel Edge Network
- **监控**: Vercel Analytics

## 环境变量
```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
```

## 安全考虑
- API 路由速率限制
- 输入验证和清理
- 环境变量管理
- CSP (Content Security Policy) 配置
- 基于这个设计目标开始开发页面，第一步实现多语言，我希望实现日语和中文两版，先实现这个功能