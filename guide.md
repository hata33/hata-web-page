# 🎵 秦基博官方网站 - Next.js 开发指南

# 🎵 秦基博官方网站 - Next.js 15 开发指南

## 📋 项目概述

为日本歌手秦基博打造一个现代化、炫酷的官方网站，采用最新的 **Next.js 15 App Router** 架构技术栈，实现高性能、SEO友好的单页应用。

## 🎯 核心功能板块

| 板块 | 功能描述 | 技术特色 |
|------|----------|----------|
| **首页** | 艺术家形象展示 | 动态粒子背景、3D场景 |
| **音乐作品** | 专辑与单曲展示 | 3D陈列、音频可视化 |
| **MV画廊** | 视频作品集 | 沉浸式网格、预览效果 |
| **演唱会** | 巡演信息 | 视差滚动、交互式地图 |
| **新闻动态** | 最新资讯 | 动态卡片、时间轴 |
| **关于我们** | 艺术家介绍 | 交互式时间轴 |

## 🚀 技术架构

### 核心框架
- **Next.js 15+** - React 全栈框架，支持 App Router、SSR、SSG
- **React 18+** - 现代化 React 组件开发
- **TypeScript** - 类型安全的 JavaScript

### 样式方案
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Framer Motion** - React 动画库
- **styled-components** - CSS-in-JS 解决方案

### 3D与动效
- **Three.js** - 3D 图形库
- **React Three Fiber** - Three.js React 封装
- **GSAP** - 高性能动画库

### 状态管理
- **Zustand** - 轻量级状态管理
- **React Query** - 数据获取和缓存
- **SWR** - 数据获取 Hook

### 开发工具
- **biome** - 代码质量和格式化
- **Husky** - Git hooks
- **Vercel** - 部署平台

## 🚀 项目初始化

### 1. 创建 Next.js 项目

```bash
npx create-next-app@latest hata-web --typescript --tailwind --app --experimental-https
cd hata-web
```

### 2. 安装依赖

```bash
# 动画和3D
npm install framer-motion three @react-three/fiber @react-three/drei gsap

# 状态管理和数据
npm install zustand @tanstack/react-query swr

# UI组件库（可选）
npm install @radix-ui/react-slot lucide-react

# 开发工具
npm install -D eslint prettier husky lint-staged
```

### 3. 项目结构

```
hata-web/
├── app/                    # Next.js App Router
│   ├── (main)/            # 主要路由组
│   │   ├── page.tsx       # 首页
│   │   ├── about/         # 关于页面
│   │   ├── music/         # 音乐作品
│   │   ├── videos/        # MV画廊
│   │   ├── concerts/      # 演唱会
│   │   ├── news/          # 新闻动态
│   │   └── contact/       # 联系方式
│   ├── api/               # API路由
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 根布局
│   └── not-found.tsx     # 404页面
├── components/            # React组件
│   ├── ui/               # 基础UI组件
│   ├── music/            # 音乐相关组件
│   ├── animation/        # 动画组件
│   └── three/            # 3D组件
├── lib/                  # 工具函数
│   ├── utils.ts         # 通用工具
│   ├── api.ts           # API客户端
│   └── animations.ts    # 动画配置
├── types/               # TypeScript类型定义
├── data/                # 静态数据
├── public/              # 静态资源
├── next.config.js       # Next.js配置
├── tailwind.config.js   # Tailwind配置
└── tsconfig.json        # TypeScript配置
```

## 📁 核心功能实现

### 1. App Router 路由设置

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '秦基博 公式サイト',
  description: 'シンガーソングライター秦基博の公式ウェブサイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### 2. 导航组件

```typescript
// components/ui/Navigation.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/about', label: 'プロフィール' },
    { href: '/music', label: '音楽作品' },
    { href: '/videos', label: 'MV' },
    { href: '/concerts', label: 'ライブ' },
    { href: '/news', label: 'ニュース' },
    { href: '/contact', label: 'お問い合わせ' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            秦基博
          </Link>

          {/* 桌面导航 */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* 移动端菜单 */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
```

### 3. Hero 页面组件

```typescript
// app/(main)/page.tsx
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import { ParticleBackground } from '@/components/three/ParticleBackground'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* 3D背景 */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <ParticleBackground />
          <Environment preset="sunset" />
        </Canvas>
      </div>

      {/* 内容 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-white"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            秦基博
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            心に響く音楽の世界へ
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold"
          >
            音楽を聴く
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
```

### 4. 3D粒子背景组件

```typescript
// components/three/ParticleBackground.tsx
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const ParticleBackground = () => {
  const meshRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      colors[i3] = Math.random()
      colors[i3 + 1] = Math.random()
      colors[i3 + 2] = Math.random()
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particles.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={particles.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  )
}
```

### 5. 音乐作品页面

```typescript
// app/music/page.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MusicCard } from '@/components/music/MusicCard'
import { MusicPlayer } from '@/components/music/MusicPlayer'

export default function MusicPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)

  const albums = [
    {
      id: '1',
      title: 'コペルニクス',
      year: '2024',
      cover: '/albums/copernicus.jpg',
      tracks: [
        { title: 'コペルニクス', duration: '4:32' },
        { title: '青い光', duration: '3:45' },
        { title: '風の道', duration: '5:12' },
      ]
    },
    // 更多专辑...
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        音楽作品
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedAlbum(album.id)}
              className="cursor-pointer"
            >
              <MusicCard album={album} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedAlbum && (
        <MusicPlayer
          album={albums.find(a => a.id === selectedAlbum)!}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </div>
  )
}
```

### 6. 音乐播放器组件

```typescript
// components/music/MusicPlayer.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MusicPlayerProps {
  album: {
    id: string
    title: string
    year: string
    cover: string
    tracks: Array<{ title: string; duration: string }>
  }
  onClose: () => void
}

export const MusicPlayer = ({ album, onClose }: MusicPlayerProps) => {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-6">
            <img
              src={album.cover}
              alt={album.title}
              className="w-48 h-48 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{album.title}</h2>
              <p className="text-gray-600 mb-6">{album.year}</p>

              <div className="space-y-2">
                {album.tracks.map((track, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 ${
                      currentTrack === index ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => setCurrentTrack(index)}
                  >
                    <span>{track.title}</span>
                    <span className="text-gray-500">{track.duration}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-blue-600 text-white p-3 rounded-full"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <audio ref={audioRef} src={`/music/${album.id}/track${currentTrack + 1}.mp3`} />
      </motion.div>
    </AnimatePresence>
  )
}
```

## 🎨 样式配置

### Tailwind CSS 配置

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

module.exports = config
```

### 全局样式

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
  }
}

@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
  }

  .glass-effect {
    @apply backdrop-blur-md bg-white/10 border border-white/20;
  }
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

## 🔧 开发工具配置

### ESLint 配置

```javascript
// .eslintrc.js
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/no-unescaped-entities': 'off',
  },
}

module.exports = config
```

### Prettier 配置

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### Git Hooks 配置

```json
// package.json
{
  "scripts": {
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

## 🚀 部署配置

### Next.js 配置

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'three'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: 'raw-loader',
    })
    return config
  },
}

module.exports = nextConfig
```

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel login
vercel --prod
```

## 📈 性能优化

### 1. 图片优化

```typescript
// components/optimized/Image.tsx
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`duration-700 ease-in-out ${
          isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
```

### 2. 代码分割

```typescript
// 使用动态导入
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // 只在客户端渲染
})
```

### 3. 缓存策略

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { path } = await request.json()

  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }

  return Response.json({ revalidated: false, now: Date.now() })
}
```

## 🔍 SEO 优化

### 1. 动态 Metadata

```typescript
// app/music/[id]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const album = await getAlbum(params.id)

  if (!album) {
    return {
      title: 'アルバムが見つかりません',
    }
  }

  return {
    title: `${album.title} - 秦基博`,
    description: `秦基博のアルバム「${album.title}」の詳細ページです。`,
    openGraph: {
      title: `${album.title} - 秦基博`,
      description: `秦基博のアルバム「${album.title}」の詳細ページです。`,
      images: [album.cover],
    },
  }
}
```

### 2. 结构化数据

```typescript
// components/StructuredData.tsx
interface StructuredDataProps {
  type: 'MusicAlbum' | 'MusicGroup' | 'Person'
  data: any
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

## 🧪 测试策略

### 1. 单元测试

```typescript
// __tests__/components/MusicCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MusicCard } from '@/components/music/MusicCard'

describe('MusicCard', () => {
  const mockAlbum = {
    id: '1',
    title: 'テストアルバム',
    year: '2024',
    cover: '/test.jpg',
  }

  it('アルバム情報が正しく表示される', () => {
    render(<MusicCard album={mockAlbum} />)

    expect(screen.getByText('テストアルバム')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('クリック時にonClickが呼ばれる', () => {
    const handleClick = jest.fn()
    render(<MusicCard album={mockAlbum} onClick={handleClick} />)

    fireEvent.click(screen.getByText('テストアルバム'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 2. E2E 测试

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('音楽ページにアクセスできる', async ({ page }) => {
  await page.goto('/music')
  await expect(page).toHaveTitle(/音楽作品 - 秦基博/)

  const albumCards = page.locator('.music-card')
  await expect(albumCards.first()).toBeVisible()

  await albumCards.first().click()
  await expect(page.locator('.music-player')).toBeVisible()
})
```

## 📱 响应式设计

### 断点配置

```typescript
// lib/breakpoints.ts
'use client'

import { useState, useEffect } from 'react'

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}
```

## 🔒 安全性考虑

### 1. 环境变量管理

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
```

### 2. API 路由安全

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { validateEmail } from '@/lib/validation'

export async function POST(request: NextRequest) {
  // 速率限制
  const { success } = await rateLimit(request.ip)
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const { name, email, message } = await request.json()

    // 验证输入
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // 处理联系表单
    // ...

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## 📝 开发规范

### 1. 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 规则
- 组件使用 PascalCase 命名
- 文件使用 kebab-case 命名
- Hook 名称以 `use` 开头

### 2. Git 工作流

```bash
# 功能分支
git checkout -b feature/music-player

# 提交规范
git commit -m "feat: add music player component"
git commit -m "fix: resolve audio playback issue"
git commit -m "docs: update README"

# Pull Request 模板
## 变更内容
- 添加了音乐播放器组件
- 实现了音频播放控制
- 优化了用户体验

## 测试
- [x] 单元测试通过
- [x] E2E 测试通过
- [x] 性能测试通过
```

## 🎯 下一步计划

### Phase 1: 基础架构
- [x] 项目初始化
- [x] 路由设置
- [x] 基础组件
- [ ] 数据模型设计

### Phase 2: 核心功能
- [ ] 首页 Hero 区域
- [ ] 音乐作品展示
- [ ] MV 画廊
- [ ] 演唱会信息

### Phase 3: 高级功能
- [ ] 3D 效果实现
- [ ] 音频可视化
- [ ] 用户交互优化
- [ ] 性能优化

### Phase 4: 部署和维护
- [ ] 生产环境部署
- [ ] 监控和分析
- [ ] SEO 优化
- [ ] 内容管理

---

这个开发指南提供了完整的 Next.js 项目架构和实现方案，涵盖了从项目初始化到部署的各个环节。根据具体需求，可以进一步调整和扩展各个模块。 