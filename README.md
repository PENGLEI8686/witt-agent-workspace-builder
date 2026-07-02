# Witt Agent Workspace Builder / Witt-AgentOS 搭建器

[中文](#中文) | [English](#english)

## 中文

Witt-AgentOS 搭建器是一款用于把本地工作文件夹变成“AI 项目工作区”的 Skill。你指定一个电脑上的工作目录，它会扫描目录结构和关键文档，推断你的业务上下文，然后生成一套可被 AI Agent 直接读取和长期维护的项目工作区。

它生成的不是空骨架，而是一套带内容的 AgentOS 结构：AI 岗位说明书 `AGENTS.md`、分类知识库 `context/`、技能库 `skills/`、记忆模板 `memory/`，并把已有产出物整理到 `output/`。任何支持文件读写的 AI Agent 打开这个文件夹后，都能快速理解“自己是谁、该怎么工作、什么不能碰”。

新版支持**增量更新**和**工作区自进化维护建议**：业务有变化时，说“增量更新项目”，它会重新扫描源目录、对比文件变化、生成变更报告，并在你确认后同步；日常使用中，它也会检测知识缺口、规范漂移、Skill 候选和重要决策，提醒你维护工作区。

### 它解决什么问题

- 每次开启新 AI 对话都要重新介绍业务背景
- Instructions、参考文件、记忆和提示词散落在不同 AI 平台里
- 工作文件很多，但没有被整理成 Agent 能理解的上下文系统
- 想把长期积累的 AI 工作资产迁移到自己电脑上
- 想建立跨工具复用、可持续维护的本地 AgentOS 工作区
- 业务和文件持续变化，但不想每次从头搭建 AI 工作区

### 核心能力

- **自动扫描业务目录**：读取目录结构，抽样关键文档，推断行业、角色、核心工作和已有资产。
- **确认式采集信息**：先给出业务画像，让用户确认或纠正，而不是从零问一堆开放问题。
- **一键生成工作区**：创建 `AGENTS.md`、`CLAUDE.md`、`context/`、`skills/`、`memory/`、`output/`。
- **已有文件归位**：知识文档放入 `context/`，工作成果放入 `output/`，已有 Skill 放入 `skills/`。
- **补齐缺失模板**：识别业务中应有但缺失的知识文件，生成可填充的 Markdown 模板。
- **建议新增 Skills**：结合本地工作流和行业最佳实践，给出可标准化的 Skill 方向，并生成初稿框架。
- **增量更新项目**：重新扫描源目录，识别新增、修改、删除文件，生成 diff 报告，用户确认后批量同步。
- **工作区维护协议**：在日常协作中检测重复纠正、知识缺口、规范漂移、重要决策和 Skill 候选，只建议不擅改。

### 典型使用场景

**业务资产散落在 AI 平台里**

把 Instructions、参考文件、AI 记忆和提示词迁移成自己电脑上的 Markdown + 文件夹结构，摆脱平台私有格式。

**工作文件很多但没有结构化**

让 AI 扫描工作目录，自动生成业务画像、AGENTS.md、知识库、技能库和记忆模板。

**项目已经搭好但业务在变化**

说“增量更新项目”，让它对比新旧文件、生成变更报告，并在确认后更新索引和结构。

**希望工作区越用越准**

日常协作中，AI 会把重复纠正、重要决策、知识过时、Skill 候选整理成维护建议清单。

### 适合谁

- 长期用 AI 做品牌运营、内容创作、项目管理、客户咨询的人
- 在不同 AI 平台里积累了大量 Instructions、参考文件和记忆，想迁移到本地的人
- 希望同一套业务标准能被多个 AI Agent 复用的人
- 想把“上下文工程”“Agentic OS”真正落地到项目文件夹的人

### 安装

推荐使用 npx 一键安装：

```bash
npx github:PENGLEI8686/witt-agent-workspace-builder
```

安装完成后，重启 Codex，或在 Codex app 中使用 `Force Reload Skills`。

如果已经安装过旧版本，可以覆盖安装：

```bash
npx github:PENGLEI8686/witt-agent-workspace-builder -- --force
```

如果不想使用 npx，也可以直接 clone 到 skills 目录：

```bash
mkdir -p ~/.agents/skills
git clone https://github.com/PENGLEI8686/witt-agent-workspace-builder.git ~/.agents/skills/witt-agent-workspace-builder
```

### 使用示例

```text
使用 $witt-agent-workspace-builder，帮我把这个工作文件夹搭建成 AgentOS 项目工作区。
```

```text
使用 $witt-agent-workspace-builder，扫描我的项目目录，生成 AGENTS.md、知识库、技能库和记忆模板。
```

```text
使用 $witt-agent-workspace-builder，帮我对这个已有 AgentOS 工作区做增量更新。
```

### 注意

本 Skill 需要 AI 助手具备文件系统读写能力。联网能力是可选增强：有联网时可以补充行业最佳实践建议；没有联网时也可以基于本地文件完成工作区搭建和增量更新。原始工作文件夹只会被扫描和复制，不会被移动或改写。

## English

Witt Agent Workspace Builder is a Skill for turning an existing local work folder into a reusable AI agent workspace. You point it at a project directory; it scans the folder structure and key documents, infers your business context, and generates a structured workspace that AI agents can read and maintain over time.

The output is not an empty scaffold. It creates a filled-in AgentOS-style structure: `AGENTS.md` for role and collaboration rules, `context/` for categorized knowledge, `skills/` for reusable workflows, `memory/` for long-term decisions and lessons, and `output/` for existing deliverables.

This version also supports **incremental updates** and **workspace maintenance suggestions**. When your business changes, ask it to update the project: it rescans the source folder, compares file changes, generates a diff report, and syncs after confirmation. During daily work, it can also detect knowledge gaps, rule drift, repeated corrections, Skill candidates, and important decisions.

### What It Solves

- Repeating the same business background every time you start a new AI session
- Instructions, references, memories, and prompts scattered across different AI platforms
- Lots of work documents, but no structure that an agent can reliably use
- The need to migrate AI work assets back to local files you control
- A desire to reuse one working standard across multiple AI tools
- The need to keep an AI workspace updated as files and business context evolve

### Features

- **Project folder scanning**: inspect directory structure, sample key files, and infer industry, role, core workflows, and existing assets.
- **Confirmation-first context gathering**: show an initial business profile and let the user correct it before generating files.
- **Workspace generation**: create `AGENTS.md`, `CLAUDE.md`, `context/`, `skills/`, `memory/`, and `output/`.
- **File organization**: copy knowledge files into `context/`, deliverables into `output/`, and existing Skills into `skills/`.
- **Missing-template generation**: create Markdown templates for important knowledge files that should exist but are missing.
- **Skill recommendations**: suggest standardizable workflows and create starter `SKILL.md` drafts for them.
- **Incremental workspace sync**: rescan the source folder, detect added/modified/deleted files, create a diff report, and sync after user confirmation.
- **Workspace maintenance protocol**: suggest updates when it notices repeated corrections, knowledge gaps, outdated context, important decisions, or new Skill candidates.

### Who It Is For

- People using AI for long-running work such as brand operations, content creation, project management, consulting, or research
- Users who have accumulated AI instructions, references, and memory in proprietary platforms and want local ownership
- Teams or solo operators who want one reusable working standard across AI agents
- Anyone trying to turn context engineering or Agentic OS ideas into an actual project folder

### Installation

Recommended one-line install:

```bash
npx github:PENGLEI8686/witt-agent-workspace-builder
```

After installation, restart Codex or use `Force Reload Skills` in the Codex app.

To overwrite an existing installation:

```bash
npx github:PENGLEI8686/witt-agent-workspace-builder -- --force
```

You can also clone the repository directly:

```bash
mkdir -p ~/.agents/skills
git clone https://github.com/PENGLEI8686/witt-agent-workspace-builder.git ~/.agents/skills/witt-agent-workspace-builder
```

### Example Prompts

```text
Use $witt-agent-workspace-builder to turn this work folder into an AgentOS project workspace.
```

```text
Use $witt-agent-workspace-builder to scan my project directory and generate AGENTS.md, a context library, a skills library, and memory templates.
```

```text
Use $witt-agent-workspace-builder to incrementally update this existing AgentOS workspace.
```

### Note

This Skill requires filesystem read/write access. Web access is an optional enhancement for industry workflow research; without web access, it can still build or update a workspace from local files. The original work folder is scanned and copied from, not moved or overwritten.
