# Hanabi 的博客

基于 [Hugo](https://gohugo.io/) + [Doks](https://getdoks.org/) 主题的个人博客：技术文档、博客文章、全文搜索、深色模式，界面已全面中文化。

## 环境要求

- Hugo **extended** ≥ 0.165（`brew install hugo`）
- Node.js ≥ 24（仓库已带 `.nvmrc`，装了 nvm 的直接 `nvm use` 即可）
- Go（首次用 Hugo Module 拉依赖时需要，`brew install go`）

## 日常使用

```bash
nvm use            # 切到 Node 24（CSS 构建管线需要，必须先执行）
npm install        # 仅首次
npm run dev        # 本地开发 → http://localhost:1313
npm run build      # 产出静态文件到 public/
npm run preview    # 本地预览构建产物
```

> Doks 的样式通过 npm 包（@thulite/doks-core）+ PostCSS 编译，构建时 PATH 里必须有 Node ≥ 20，否则会报 `bad option: --permission`。

## 写博客

```bash
hugo new content blog/my-new-post.md   # 用 archetype 生成草稿
```

或直接复制 `content/blog/` 下的现有文章修改。front matter 关键字段：

```yaml
---
title: "文章标题"
description: "一句话摘要（会显示在列表和搜索里）"
date: 2026-08-31T12:00:00+08:00
draft: true            # 发布时改为 false
tags: ["Hugo"]
categories: ["建站"]
---
```

**图片**：推荐把图片和文章放成同名目录（page bundle），如 `content/blog/my-new-post/index.md` + `content/blog/my-new-post/pic.png`，正文里 `![说明](pic.png)`，主题会自动压缩转 webp。也可把图片放 `assets/` 后用绝对路径引用；`static/` 下的图片只能用 `<img src="...">` 方式引用（markdown 语法会构建失败）。

**常用短代码**（替代原来 LoveIt 的 admonition）：

```text
{{< callout context="tip" title="提示标题" >}} 内容 {{< /callout >}}   # context: note / tip / caution / danger / light
{{< details "点开看详情" >}} 内容 {{< /details >}}
{{< tabs "id" >}} {{< tab "Java" >}} ... {{< /tab >}} {{< /tabs >}}
{{< link-card href="/blog/xxx/" title="标题" description="描述" >}}
```

## 写文档

文档都在 `content/docs/`，侧边栏按目录结构自动生成，顺序由 front matter 的 `weight` 控制（小的在前）：

```text
content/docs/
├── _index.md              # 文档首页
├── frontend/              # 前端
│   ├── typescript/        # TypeScript（章节，含多篇文章）
│   └── promise.md         # 单篇文档直接放 md
├── backend/               # 后端
│   ├── netty/             # Netty 系列
│   └── docker.md
├── interview.md           # 面试题
└── bookmarks.md           # 书签
```

## 站点配置速查

| 想改什么 | 改哪里 |
|---|---|
| 站点标题/描述 | `config/_default/hugo.toml` 和 `config/_default/params.toml` |
| 导航菜单 / 右上角图标 | `config/_default/menus/menus.zh.toml` |
| 关于页 | `content/about.md` |
| 首页文案 | `content/_index.md`（正文）+ `layouts/home.html`（版块） |
| 界面中文文案 | `i18n/zh.toml` |
| 编辑跳转的仓库地址 | `params.toml` 里的 `docsRepo` |

## 部署

- **Netlify**：仓库根目录已带 `netlify.toml`（Hugo 0.165），连上仓库即可自动部署。
- **GitHub Pages**：`npm run build` 后发布 `public/` 目录；需要的话可以再加一个 GitHub Actions 工作流。
- 关联远端仓库：

```bash
git remote add origin git@github.com:KurobaKaitou/blog.git
git push -u origin main
```

## 迁移说明

内容来自两个旧项目（已全部转换为本站的 Hugo 格式）：

- [docs](https://github.com/KurobaKaitou/docs)（VuePress）→ `content/docs/`：TypeScript、Promise、Netty、Docker、面试题、书签，配图在 `static/img/`
- [moment](https://github.com/KurobaKaitou/moment)（Hugo + LoveIt）→ `content/blog/`：两篇博文；其 admonition 提示块已转为 Doks 的 callout
