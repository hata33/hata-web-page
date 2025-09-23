# 文档驱动开发系统 v2.0

## 📋 系统概述

基于 v1.0 的经验总结，设计一个**简洁实用**的文档驱动开发系统，专注于核心功能，避免过度复杂化。

## 🗂️ 目录结构

```
prd/
├── todo/                   # 待执行任务
│   ├── 20250923-feature-ui-language-switcher.md
│   ├── 20250923-fix-scroll-display.md
│   └── 20250925-change-auth-flow.md
├── done/                   # 已完成任务（执行记录）
│   ├── 20250923-feature-ui-language-switcher.md
│   └── 20250923-fix-scroll-display.md
└── requirements/          # 整理后的需求文档（知识库）
    ├── ui/
    │   ├── language-switcher.md
    │   └── responsive-design.md
    ├── features/
    │   ├── multi-language-support.md
    │   └── audio-player.md
    └── architecture/
        ├── state-management.md
        └── performance-optimization.md
```

## 📝 文件命名规范

### 任务文件命名
- **格式**: `YYYYMMDD-[type]-[brief-description].md`
- **类型**: `feat`（新功能）、`fix`（Bug修复）、`change`（需求调整）
- **示例**:
  - `20250923-feat-ui-language-switcher.md`
  - `20250923-fix-scroll-display.md`
  - `20250925-change-auth-flow.md`

### 需求文档命名
- **格式**: `[module-name]-[feature-name].md`
- **按模块分类**: `ui/`、`features/`、`architecture/`
- **示例**: `ui/language-switcher.md`

## 🎯 三级状态流程

### 1. todo/ - 待执行任务
**状态**: 任务创建后，等待执行
**文件格式**:
```markdown
# [type] 简单描述

## 问题/需求描述
（清楚描述要解决的问题或要实现的功能）

## 解决方案/实现思路
（具体的解决方案或实现方法）

## 验收标准
（明确的完成标准和验收条件）

## 执行记录
（AI执行时追加记录）
- YYYY-MM-DD HH:MM: 开始执行
- YYYY-MM-DD HH:MM: 完成开发
- YYYY-MM-DD HH:MM: 测试通过
```

### 2. done/ - 已完成任务
**状态**: 任务完成后，从 todo/ 移动到 done/
**文件内容**: 包含完整的执行记录
**保留时间**: 暂时不考虑清理问题，专注于核心流程

### 3. requirements/ - 需求文档
**状态**: 从 done/ 中的重要任务整理成标准需求文档
**文件格式**:
```markdown
# [功能名称]

## 功能描述
（功能的基本描述和作用）

## 技术实现
（技术实现细节、关键代码位置、使用方法）

## 注意事项
（使用时需要注意的事项和常见问题）

## 相关问题
（相关的Bug修复记录和功能调整）

## 变更历史
（功能的变更历史记录）
```

## 🔄 完整工作流

### 开发新功能流程
1. **创建任务**: 在 `todo/` 创建 `YYYYMMDD-feature-xxx.md`
2. **AI执行**: AI读取任务文件，执行开发并追加执行记录
3. **完成移动**: 执行完成后，文件移动到 `done/`
4. **整理文档**: 重要任务整理到 `requirements/` 相应模块

### Bug修复流程
1. **创建任务**: 在 `todo/` 创建 `YYYYMMDD-fix-xxx.md`
2. **AI修复**: AI分析问题，修复并记录过程
3. **完成移动**: 修复完成后，文件移动到 `done/`
4. **经验总结**: 重要Bug整理到 `requirements/` 相关模块

### 需求调整流程
1. **创建任务**: 在 `todo/` 创建 `YYYYMMDD-change-xxx.md`
2. **AI调整**: AI分析调整需求，修改相关代码
3. **完成移动**: 调整完成后，文件移动到 `done/`
4. **文档更新**: 更新 `requirements/` 中相关需求文档

## 🤖 AI执行规则

### 任务识别
1. **扫描目录**: 定期扫描 `prd/todo/` 目录
2. **按日期排序**: 根据文件名中的日期排序，优先处理最新任务
3. **读取任务**: 解析任务文件，提取问题和解决方案
4. **执行开发**: 根据任务描述执行相应开发
5. **记录执行**: 在文件中追加执行记录
6. **移动完成**: 完成后将文件移动到 `prd/done/`

### 执行记录格式
```markdown
## 执行记录
- YYYY-MM-DD HH:MM: 开始执行
- YYYY-MM-DD HH:MM: 分析问题/需求
- YYYY-MM-DD HH:MM: 实施解决方案
- YYYY-MM-DD HH:MM: 测试验证
- YYYY-MM-DD HH:MM: 完成任务
```

## 📊 系统优势

### ✅ 极简设计
- **三层状态**: todo → done → requirements
- **日期排序**: 文件名包含日期，自然排序
- **模块化管理**: requirements 按功能模块分类

### ✅ 实用导向
- **执行与知识分离**: 临时执行记录 vs 永久需求文档
- **渐进式文档化**: 从简单任务逐步完善为标准需求
- **便于检索复用**: requirements 作为知识库

### ✅ 低维护成本
- **简洁的文件结构**: 三个主要目录，易于理解
- **标准化的命名**: 统一的文件命名规范
- **自动化执行**: AI 自动识别和执行任务

## 🚀 快速开始

1. **创建目录结构**: 按照上述结构创建三个主要目录
2. **创建第一个任务**: 在 `todo/` 创建任务文件
3. **等待AI执行**: AI 会自动识别并执行任务
4. **查看结果**: 执行完成后在 `done/` 查看执行记录
5. **整理文档**: 将重要任务整理到 `requirements/`

---

**版本**: v2.0
**更新日期**: 2025-09-23
**核心理念**: 简洁实用，避免过度复杂化
**适用项目**: 秦基博官方网站