---
title: "GitHub 上如何提交 Pull Request"
description: "从 Fork 到合并：用一个完整的示例带你走一遍提交 Pull Request 的全流程。"
summary: ""
date: "2026-05-27T15:00:22+08:00"
lastmod: "2026-05-27T15:00:22+08:00"
draft: false
weight: 50
categories:
  - "版本控制"
tags:
  - "GitHub"
  - "Git"
  - "开源"
  - "教程"
contributors: []
pinned: false
homepage: false
---

## 前言

Pull Request（简称 PR）是 GitHub 协作的核心功能。它允许你向别人的仓库提交代码修改，请求项目维护者合并你的变更。无论你是参与开源项目，还是在团队协作中走 Code Review 流程，提交 PR 都是一项基本功。

本文从零开始，用一个完整的示例带你走一遍提交 PR 的全流程。

## 前置准备

在开始之前，确保你已经：

1. 有一个 [GitHub](https://github.com) 账号
2. 本地安装了 Git（命令行输入 `git --version` 验证）
3. 配置了 Git 的用户名和邮箱：

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱@example.com"
```

## 第一步：Fork 目标仓库

假设你想参与贡献的仓库为 `https://github.com/gohugoio/hugo`。

打开该仓库页面，点击右上角的 **Fork** 按钮。

![Fork 按钮位置](/screen/fork-button.png)

{{< callout context="tip" title="Fork 的作用" >}}
Fork 会在你的 GitHub 账号下创建一份该仓库的独立副本。你拥有这个副本的读写权限，可以在上面任意修改而不影响原仓库。
{{< /callout >}}

点击后 GitHub 会询问 Fork 的归属（个人账号或组织），选择你的个人账号即可。几秒钟后，你就会被重定向到你账号下的仓库副本，URL 会变为：

```
https://github.com/你的用户名/某项目
```

## 第二步：克隆到本地

将 Fork 后的仓库克隆到本地：

```bash
git clone https://github.com/你的用户名/某项目.git
cd 某项目
```

{{< callout context="caution" title="关于 HTTPS 与 SSH" >}}
如果你配置了 SSH 密钥，建议使用 SSH 地址：

```bash
git clone git@github.com:你的用户名/某项目.git
```

SSH 方式推送代码时无需每次输入密码，比 HTTPS 更方便。
{{< /callout >}}

## 第三步：添加上游仓库（upstream）

克隆下来的仓库默认只关联了你自己的 Fork（origin）。你需要将原仓库添加为 upstream，以便同步它的最新变更：

```bash
git remote add upstream https://github.com/某用户/某项目.git
```

验证远程仓库配置：

```bash
git remote -v
```

输出应该类似：

```
origin    https://github.com/你的用户名/某项目.git (fetch)
origin    https://github.com/你的用户名/某项目.git (push)
upstream  https://github.com/某用户/某项目.git (fetch)
upstream  https://github.com/某用户/某项目.git (push)
```

## 第四步：创建功能分支

永远不要在 `main`（或 `master`）分支上直接修改。基于最新的上游代码创建一个新的功能分支：

```bash
# 确保本地 main 是最新的
git checkout main
git pull upstream main

# 创建并切换到功能分支
git checkout -b feature/你的功能描述
```

分支命名建议：

| 场景 | 分支名示例 |
|------|-----------|
| 修 Bug | `fix/login-error` |
| 新功能 | `feat/user-avatar` |
| 文档改进 | `docs/api-typo` |
| 重构 | `refactor/auth-module` |

## 第五步：编写代码并提交

在功能分支上进行你的修改。完成后，将修改提交到本地仓库：

```bash
# 查看变更
git status

# 添加文件到暂存区（可以用 . 添加所有，也可以指定具体文件）
git add .

# 提交变更
git commit -m "feat: 添加用户头像上传功能"
```

{{< callout context="note" title="Commit Message 规范" >}}
一个好的提交信息应该简明扼要地说明**做了什么**以及**为什么**。推荐使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<类型>: <简短描述>

<可选：详细描述>
```

常见类型：`feat`（新功能）、`fix`（修复）、`docs`（文档）、`refactor`（重构）、`test`（测试）、`chore`（杂务）。
{{< /callout >}}

## 第六步：推送到你的 Fork

将本地的功能分支推送到你的 GitHub 仓库（origin）：

```bash
git push origin feature/你的功能描述
```

如果你是第一次推送该分支，Git 可能会提示你设置上游分支，按提示的命令执行即可：

```bash
git push --set-upstream origin feature/你的功能描述
```

## 第七步：打开 Pull Request

推送成功后，打开你的 Fork 仓库页面（`https://github.com/你的用户名/某项目`），仓库上面会有一个 Contribute 的按钮, 点击它会自动检测到新推送的分支，并显示一个醒目的 Open pull request 按钮。

![Open pull request 按钮](/screen/open-pull-request-button.png)

点击该按钮后，你会进入 PR 创建页面。在这个页面中需要填写以下内容：

### PR 标题

简明扼要地概括你的变更内容，例如：

```
feat: 添加用户头像上传功能
```

### PR 描述

详细说明你的修改内容和动机。一个清晰的 PR 描述模板：

```markdown
## 变更内容

<!-- 简要说明你做了什么修改 -->

## 相关 Issue

<!-- 如果解决了某个 Issue，请在此引用，例如：Closes #123 -->

## 测试说明

<!-- 描述你是如何测试这些修改的 -->

## 截图（可选）

<!-- 如果是 UI 变更，附上前后对比截图 -->
```

### 其他选项

- **Reviewers**：指定评审人（仅在你对仓库有相应权限时可见）
- **Assignees**：将 PR 指派给自己或他人
- **Labels**：给 PR 打标签（如 `bug`、`enhancement`）

填写完成后，点击 **Create pull request** 按钮提交。

{{< callout context="tip" title="Draft PR（草稿 PR）" >}}
如果你的 PR 还在进行中，不希望被合并，可以点击 **Create pull request** 下拉菜单中的 **Create draft pull request**。草稿状态的 PR 不会被误合并，准备好后可以随时标记为"Ready for review"。
{{< /callout >}}

## 第八步：处理 Review 反馈

提交 PR 后，项目维护者或其他贡献者会对你的代码进行 Review。他们可能会提出修改意见。

如果有需要修改的地方，不需要关闭 PR 重新提交——直接在同一个功能分支上继续修改即可：

```bash
# 在本地功能分支上修改代码
# ... 修改文件 ...

git add .
git commit -m "fix: 根据 Review 修改用户头像上传逻辑"
git push origin feature/你的功能描述
```

推送后，PR 会自动更新，GitHub 会显示你的新提交。所有讨论都保留在同一个 PR 线程中。

{{< callout context="note" title="如何响应 Review 评论" >}}
在 GitHub PR 页面的评论区，你可以逐条回复 Review 意见。对于简单的修改建议，GitHub 支持直接在评论中点击 **Commit suggestion** 一键应用修改，无需手动操作。
{{< /callout >}}

## 第九步：同步上游变更

在等待 PR 合并的过程中，原仓库（upstream）可能已经有了新的提交。如果 PR 存在冲突，需要先同步上游代码并解决冲突：

```bash
# 同步上游 main 分支
git checkout main
git pull upstream main

# 回到功能分支，合并最新的 main
git checkout feature/你的功能描述
git merge main

# 如果有冲突，解决冲突后提交
git add .
git commit -m "chore: 解决与上游 main 的冲突"
git push origin feature/你的功能描述
```

## 第十步：PR 合并与清理

当 PR 被项目维护者合并后，你的使命就完成了。此时可以清理本地和远程的分支：

```bash
# 切换回 main 分支
git checkout main

# 拉取最新代码（包含你刚被合并的修改）
git pull upstream main

# 删除本地功能分支
git branch -d feature/你的功能描述

# 删除远程功能分支
git push origin --delete feature/你的功能描述
```

## 进阶技巧

### 保持提交历史整洁 —— 使用 rebase

在 PR Review 过程中，你可能会多次提交修正。如果不想在 PR 中留下过多"修正修正的修正"这类提交，可以在 Review 结束后使用 rebase 合并提交：

```bash
# 查看最近的提交记录
git log --oneline

# 交互式 rebase 最近 3 个提交
git rebase -i HEAD~3
```

在打开的编辑器中将次要提交前的 `pick` 改为 `squash`（或 `s`），保存退出后编辑新的提交信息。

{{< callout context="caution" title="何时不该 rebase" >}}
只有**还没有被其他人拉取**的本地提交才适合 rebase。如果分支已经被推送到远程且被协作者查看，rebase 会重写历史，导致混乱。这种情况下请使用 merge 代替。
{{< /callout >}}

### 更新 PR 分支的另一种方式 —— pull --rebase

```bash
git checkout feature/你的功能描述
git pull --rebase upstream main
git push --force-with-lease origin feature/你的功能描述
```

`--force-with-lease` 比 `--force` 更安全，它会在强制推送前检查远程分支是否被其他人更新过。

### 关联 Issue

如果你的 PR 是为了解决某个 Issue，可以在 PR 描述中使用关键词自动关联：

- `Closes #123`：PR 合并后自动关闭 Issue #123
- `Fixes #456`：同上
- `Related to #789`：仅关联，不关闭

## 完整流程速查

```bash
# 1. Fork 目标仓库（在 GitHub 网页上操作）

# 2. 克隆到本地
git clone https://github.com/你的用户名/某项目.git
cd 某项目

# 3. 添加上游仓库
git remote add upstream https://github.com/某用户/某项目.git

# 4. 创建功能分支
git checkout main
git pull upstream main
git checkout -b feature/你的功能描述

# 5. 编写代码，提交
git add .
git commit -m "feat: 你的变更描述"

# 6. 推送到你的 Fork
git push origin feature/你的功能描述

# 7. 在 GitHub 网页上创建 PR

# 8. 根据 Review 修改并推送
git add .
git commit -m "fix: 根据 Review 修改"
git push origin feature/你的功能描述

# 9. PR 合并后清理
git checkout main
git pull upstream main
git branch -d feature/你的功能描述
git push origin --delete feature/你的功能描述
```

## 总结

提交 PR 的核心流程可以概括为：**Fork → Clone → Branch → Commit → Push → PR → Review → Merge**。初看步骤不少，但走完一两次后就会变成肌肉记忆。

最后几点提醒：

- **先沟通，后编码**：在开始写代码之前，最好先在 Issue 中说明你想做什么，避免做了重复工或者方向不被接受
- **小的 PR 更容易被合并**：尽量让每个 PR 只做一件事，保持修改范围可控
- **保持礼貌**：Review 是就事论事的代码讨论，维护者花时间帮你 Review，请保持尊重和耐心

希望这篇教程能帮你顺利迈出开源贡献的第一步。
