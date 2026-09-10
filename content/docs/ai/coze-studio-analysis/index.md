---
title: "从零实现 Coze Studio：项目分析与阶段拆解"
description: "分析 Coze Studio 的架构、技术栈与 55 张核心表，把「从零实现一个 AI Agent 开发平台」拆成 12 个可落地的阶段，每个阶段附表结构依赖图。"
date: 2026-08-30T20:00:00+08:00
lastmod: 2026-09-10T17:00:00+08:00
draft: false
weight: 15
toc: true
params:
  seo:
    title: ""
    description: ""
    canonical: ""
    robots: ""
---

最近在做一个「从零实现 [Coze Studio](https://github.com/coze-dev/coze-studio)」的项目。不是抄代码，而是**把它的领域模型、表结构和模块边界吃透之后，自己再实现一遍**——这是吃透一个优秀开源项目最扎实的路径。

这篇文章是这个系列的总纲：先把原项目分析清楚（架构、技术栈、55 张表），再把整个实现拆成**准备阶段 + 11 个实施阶段**。每个阶段开始前，都先用 Mermaid 把该阶段涉及的表结构和依赖关系画出来，先分析、再动手。

> **2026-09-10 更新**：本文按 minicoze 当前的实际技术方案梳理了阶段 0～2，保留对原版的完整分析作为对照。与原版的差异——PostgreSQL 单库替代 MySQL+Milvus+ES、provider-first 模型接入、模型域两层表结构、软删实现等——均在文中逐条标注。

> 路径约定：下文所有路径均相对于仓库根目录，分析基于当前[开源版本](https://github.com/coze-dev/coze-studio)，表结构以 `docker/volumes/mysql/schema.sql` 为准（共 55 张表）。

## 第 0 阶段（准备）：项目全景与开发环境

动手写第一行代码之前，先把地图看全。这个阶段不产出功能，产出的是**对全局的判断**。

### 0.1 仓库全景

Coze Studio 是字节开源的一站式 AI Agent 开发平台（可视化编排智能体 / 应用 / 工作流）。仓库顶层结构：

```text
coze-studio/
├── backend/          # Go 后端（主体）
│   ├── api/          #   HTTP 层：handler / router / middleware / model
│   ├── application/  #   应用服务层（按模块编排领域对象）
│   ├── domain/       #   领域层：17 个领域模块（核心）
│   ├── crossdomain/  #   跨领域依赖的接口定义（16 个）
│   ├── infra/        #   基础设施：orm、rdb、cache、storage、embedding、es、eventbus...
│   ├── conf/         #   配置：模型元数据、提示词模板、插件产物...
│   └── types/ pkg/   #   公共类型与工具
├── frontend/         # React + TypeScript 前端（monorepo）
├── idl/              # Thrift IDL：API 契约的「唯一事实来源」
├── docker/           # 部署：docker-compose + atlas 数据库迁移 + 卷挂载
└── helm/             # K8s 部署
```

后端是标准的 **DDD 分层**，以 `domain/user` 为例，每个领域都是同一套骨架：

```text
domain/user/
├── entity/            # 实体定义（User、Space、Session）
├── service/           # 领域服务（业务逻辑）
├── repository/        # 仓储接口（面向接口编程）
└── internal/dal/      # 数据访问层（GORM Gen 生成的 model/query）
```

依赖方向严格单向：`api → application → domain → crossdomain/infra`，领域层不感知 HTTP 和存储细节。这里可以参考 [**开发规范**](https://github.com/coze-dev/coze-studio/wiki/7.-%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83#%E9%A1%B9%E7%9B%AE%E6%9E%B6%E6%9E%84)

### 0.2 技术栈清单

原版选型是企业级全家桶，minicoze 按「单库优先、按需引入」原则收敛（2026-09 实际状态）：

| <div style="width: 90px;">层次</div> | 原版选型                                                       | minicoze 选型                                            | 说明                                                                       |
| ------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| 语言/框架                             | Go ≥ 1.23 + [Hertz](https://github.com/cloudwego/hertz)        | Go 1.25 + Hertz + **hz 代码生成**                        | Thrift IDL → handler/model/router 一键生成，与原版同款工具链                |
| LLM 编排                              | [Eino](https://github.com/cloudwego/eino) + eino-ext           | 暂未引入（对话阶段评估）                                 | 模型列表拉取先用标准库 HTTP 实现                                            |
| 模型接入                              | eino-ext：ark/openai/claude/deepseek/gemini/qwen/ollama        | 自研 modelfetch：**openai 兼容 + ollama**                | `infra/modelfetch/impl/<protocol>` 注册表分发，新协议加目录 + 注册一行      |
| ORM                                   | GORM + Gen                                                     | 同（GORM + Gen，表先行）                                 | 手写 PG DDL → gen 反向生成 PO/类型安全查询                                  |
| 关系存储                              | MySQL（55 张表）                                               | **PostgreSQL 18**                                        | 单库同时覆盖关系、向量（pgvector）与全文（tsvector），砍掉两套中间件        |
| 缓存/会话                             | Redis                                                          | Redis 8.10（AOF）                                        | 会话、验证码、限流已在用                                                    |
| 向量检索                              | Milvus（可切 OceanBase）                                       | pgvector（同库，HNSW）                                   | 知识库阶段启用                                                              |
| 全文检索                              | Elasticsearch                                                  | PG tsvector + zhparser（知识库阶段）                     | 千级切片量 PG 足够                                                          |
| 对象存储                              | MinIO（S3）                                                    | 本地磁盘起步（`infra/storage` 接口）                     | 接口已预留，规模到了换 S3                                                   |
| 消息队列                              | NSQ（可切 RocketMQ/Kafka）                                     | 暂缓                                                     | 真实异步需求出现再引（goroutine + 数据库状态机过渡）                        |
| 配置/注册                             | etcd + 本地 conf + 环境变量                                    | envkey + docker/.env（组合根注入）                       | 深层包禁 `os.Getenv`；`MINICOZE_SECRET_KEY` 等敏感项走环境变量              |
| API 文档                              | —                                                              | swag 注释 + swagger UI                                   | hz 不生成文档，handler 手写 swag 注解后 `swag init` 生成                     |
| 前端                                  | React + TypeScript + Rush monorepo                             | **Vite + React + antd 单应用**                           | MSW mock 离线开发，`VITE_ENABLE_MOCK` 一键切真后端；页面壳已含工作流画布等  |

### 0.3 基础设施与部署

原版 compose 一键拉起全部依赖；minicoze 的 compose 只有**两个服务**，其余按阶段引入：

| 服务                             | minicoze 中的职责                                             |
| -------------------------------- | -------------------------------------------------------------- |
| postgres（pgvector 镜像）        | 业务主库 + 向量 + 全文（后续）；`docker/init/*.sql` 首次建表   |
| redis                            | 会话、验证码限流、分布式 ID 号段（AOF 持久化）                 |
| minio / milvus / es / nsq / etcd | 按阶段引入：对象 / 向量 / 全文 / 事件 / 配置                   |

### 0.4 配置体系

原版把很多「功能」先做成 `conf/` 里的配置（模型种子、提示词模板、插件产物）。minicoze 目前只继承了「环境变量 + 组合根注入」这一层：`docker/.env` 存连接串与 `MINICOZE_SECRET_KEY`（供应商 API Key 的 AES-GCM 加密口令），经 `application.Init` 注入依赖图；`conf/` 式的种子配置暂不需要——模型接入改成了「供应商管理 + 同步」交互（见阶段 2）。提示词模板、插件产物等配置等对应阶段再引入。
| 环境变量                     | 数据库/中间件地址、模型密钥                    | `docker/.env`（compose 引用），OpenAI/方舟 API Key 在此配置                                            |

### 0.5 全量表清单（55 张）

按领域模块分组（这是后续所有阶段的地基，建议对照着读）。minicoze 当前的模型域与用户/空间域表结构如下，其余按阶段推进：

| <div style="width: 100px;">模块</div> | 数据表                                                                                                                                                                                                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 用户/空间                             | `user`、`space`、`space_user`（`api_key` 暂缓，PAT 阶段引入）                                                                                                                                                                       |
| 模型                                  | minicoze 两张：`model_provider`、`model_instance`（原版 `model_meta`/`model_entity` 为废弃死表不迁移，见阶段 2）                                                                                                                     |
| 会话/执行                             | `conversation`、`message`、`run_record`                                                                                                                                                                                             |
| 智能体                                | `single_agent_draft`、`single_agent_version`、`single_agent_publish`、`agent_tool_draft`、`agent_tool_version`、`prompt_resource`、`shortcut_command`、`chat_flow_role_config`                                                      |
| 插件                                  | `plugin`、`plugin_draft`、`plugin_version`、`tool`、`tool_draft`、`tool_version`、`plugin_oauth_auth`                                                                                                                               |
| 知识库                                | `knowledge`、`knowledge_document`、`knowledge_document_slice`、`knowledge_document_review`                                                                                                                                          |
| 数据库表                              | `draft_database_info`、`online_database_info`、`agent_to_database`                                                                                                                                                                  |
| 工作流                                | `workflow_meta`、`workflow_draft`、`workflow_version`、`workflow_snapshot`、`workflow_reference`、`workflow_execution`、`node_execution`                                                                                            |
| 应用/发布                             | `app_draft`、`app_release_record`、`app_connector_release_ref`、`app_static_conversation_draft/online`、`app_dynamic_conversation_draft/online`、`app_conversation_template_draft/online`、`template`、`connector_workflow_version` |
| 记忆/变量                             | `variables_meta`、`variable_instance`                                                                                                                                                                                               |
| 基础                                  | `files`、`kv_entries`、`data_copy_task`                                                                                                                                                                                             |

建表流程差异：原版一份 `schema.sql` 全量初始化；minicoze 每个领域一份 `docker/init/NN-<domain>.sql`（首次建库由 postgres 入口脚本按序自动执行），表结构先手写 DDL、再用 gorm gen 反向生成代码。

### 0.6 贯穿全局的五个设计模式

读表之前先记住这五个反复出现的模式，后面每个阶段都在用：

1. **三态发布模型**：几乎所有资源都是 `xxx_draft`（草稿）→ `xxx_version`（版本快照）→ `xxx_publish`（发布记录）三张表。编辑永远改草稿，发布时冻结成版本，线上跑的是版本。这是整个系统的灵魂，阶段 4 会展开。
2. **JSON 弱引用聚合**：智能体对插件、知识库、工作流的引用，存的是 JSON 数组（id + 配置快照），而不是强外键。换来的是跨模块解耦，代价是要自己做一致性校验。
3. **ID 生成（minicoze 演进为双轨制）**：原版全系统雪花 ID。minicoze 的实际策略是**表级自选**——user/space 沿用雪花（`infra/idgen`，已接入），model 域用 PG `IDENTITY` 自增（小表、单实例写入，`GENERATED BY DEFAULT` 保留了切换雪花的后门）。策略跟着写入规模走，不搞全库一刀切。
4. **毫秒时间戳 + 软删除**：`created_at/updated_at` 全部毫秒级 bigint，删除走 `deleted_at` 软删。踩坑记录：bigint 列 × gorm `DeletedAt`（时间语义）在 PG 下 `.Delete()` 会报 `SQLSTATE 22P02`（MySQL 隐式转换救了原版）——minicoze 约定：软删一律显式 `UPDATE deleted_at = <毫秒>`，禁用 `.Delete()`；查询过滤仍由 DeletedAt 字段自动附加。
5. **空间隔离**：所有资源都挂 `space_id`，空间即资源边界，权限检查（`domain/permission`）以空间为第一维度。

### 0.7 开发环境准备

minicoze 的实际环境（已跑通）：

```bash
# 1. 基础环境
Go >= 1.25、Node >= 20、Docker + Compose v2

# 2. 拉起基础设施：postgres(pgvector) + redis 两个服务
cd docker && docker compose up -d
# 首次建库：docker/init/01-extensions.sql（pgvector）+ 02-user/03-space/04-model
# 由 postgres 官方入口脚本按序自动执行

# 3. 配置：复制模板并至少设置 MINICOZE_SECRET_KEY（供应商 API Key 的加密口令）
cp docker/.env.example docker/.env

# 4. 启动后端（:8888，swagger 在 /swagger/*）
cd backend && go run .

# 5. 启动前端（Vite proxy /api -> 127.0.0.1:8888）
cd frontend && npm run dev
# .env.development: VITE_ENABLE_MOCK=false 直连后端；改 true 可脱离后端用 MSW 开发
```

工程骨架（实际落地，与原版裁剪对照）：

```text
minicoze/
├── frontend/       # Vite + React + antd 单应用（MSW mock 可切换）
├── backend/
│   ├── api/            # handler / router / model（hz 从 Thrift IDL 生成）+ middleware
│   ├── application/    # 用例层：user / modelmgr（DTO↔entity 翻译、脱敏出口）
│   ├── domain/         # user / modelmgr：entity + service + repository(接口) + internal/dal(gen)
│   ├── infra/          # orm(gen) / cache(redis) / idgen / modelfetch / secret
│   ├── types/ pkg/     # consts / errorx / envkey / ptr / conv / logs
│   └── docs/           # swag 生成的 API 文档
└── docker/         # compose(postgres+redis) + init/*.sql + .env(.example)
```

### 0.8 实现路线图

```mermaid
flowchart LR
    P0["阶段0 准备<br/>全景分析"] --> P1["阶段1 用户与空间"]
    P1 --> P2["阶段2 模型服务"]
    P2 --> P3["阶段3<br/>对话与会话"]
    P3 --> P4["阶段4<br/>智能体"]
    P4 --> P5["阶段5<br/>插件与工具"]
    P5 --> P6["阶段6<br/>知识库 RAG"]
    P6 --> P7["阶段7<br/>数据库表"]
    P7 --> P8["阶段8<br/>工作流"]
    P8 --> P9["阶段9<br/>应用与发布"]
    P9 --> P10["阶段10<br/>记忆与变量"]
    P10 --> P11["阶段11<br/>周边能力"]
```

依赖关系上有两点说明：阶段 4（智能体）在原版里是对插件/知识库/工作流的**JSON 弱引用**，所以它可以先做骨架、后接资源；阶段 6/7/8 之间相互独立，可以按兴趣调整顺序。

---

## 第 1 阶段：用户与空间

### 表结构分析

一切资源都挂在「空间」下，一切空间操作都由「人」发起。这个阶段四张表：

```mermaid
erDiagram
    user ||--o{ space : "拥有(owner_id)"
    user ||--o{ space_user : "加入"
    space ||--o{ space_user : "容纳成员"
    user ||--o{ api_key : "签发"

    user {
        bigint id PK "用户ID"
        varchar name "昵称"
        varchar unique_name "唯一用户名"
        varchar email "邮箱"
        varchar password "密码(加密)"
        varchar session_key "登录态"
        varchar icon_uri "头像"
        varchar locale "语言"
    }
    space {
        bigint id PK "空间ID"
        bigint owner_id FK "所有者"
        varchar name "空间名"
        varchar description "描述"
        varchar icon_uri "图标"
    }
    space_user {
        bigint id PK "记录ID"
        bigint space_id FK "空间"
        bigint user_id FK "成员"
        int role_type "1owner 2admin 3member"
    }
    api_key {
        bigint id PK "主键"
        varchar api_key "Key哈希"
        varchar name "名称"
        bigint user_id FK "属主"
        bigint expired_at "过期时间"
        tinyint ak_type "类型"
    }
```

### 要点解读

- **`user.session_key`**：Coze 用「会话密钥」而非纯 JWT——登录后生成随机 session_key 存表（配合 Redis 缓存），后续请求带 cookie/token 反查。自建时用 JWT 也行，但要保留登出能力的话，session 表/缓存更省事。
- **`space_user.role_type`**：空间内 RBAC 就三级：owner / admin / member。所有后续资源接口的鉴权第一问都是「这个 user 在这个 space 里是什么角色」。
- **`api_key`**：给 OpenAPI 用的个人密钥，库里只存哈希，`last_used_at` 顺便做审计。类型字段 `ak_type` 区分个人密钥与 PAT。
- ID 生成：从这里开始就用雪花 ID（参考 `infra/idgen`），别用自增，后面分库分表、数据迁移都靠它。

### minicoze 落地

- **认证走了原版同款的 session-cookie 路线**（放弃计划中的 JWT）：session_key 存 user 表 + Redis 会话中间件全局校验，登出、踢人会话都是天然能力。
- **密码哈希选了 Argon2id**（原版同款），对照移植了 verify 实现。
- **超出基础 CRUD 的部分**：改密、找回密码（Redis 验证码 + 限流）、头像更新、swagger 文档、错误码体系（errorx）。
- **前端同步落地**：Vite + React + antd 单应用（登录/注册/布局壳 + 各业务页面骨架），MSW mock 与真后端经 `VITE_ENABLE_MOCK` 一键切换。
- 差异记录：`api_key` 表未建（留给阶段 11/PAT）；用户/空间 ID 用 IDGen 雪花（模型域则用自增，见 0.6 双轨制）。

### 本阶段交付

注册/登录/登出（session-cookie）、Argon2id 密码哈希、账号信息/头像/改密/找回密码、空间 CRUD、空间成员管理（三级角色）、全局会话鉴权中间件、swagger 文档、前端登录注册全流程。这是所有后续阶段的验收基座——**任何一个新资源接口，都要能回答「操作者在哪个空间、什么角色」**。

---

## 第 2 阶段：模型服务

没有模型接入，后面全是空谈。这一阶段也是 minicoze 与原版**分叉最大**的地方：原版是「json 种子 + 三层模型表」，minicoze 重构为「供应商管理 + 同步拉取」的两层模型。

### 原版表结构分析

```mermaid
erDiagram
    model_meta ||--o{ model_entity : "协议元数据派生场景实体"
    model_entity ||--o{ model_instance : "实例化"

    model_meta {
        bigint id PK "元数据ID"
        varchar model_name "模型名"
        varchar protocol "协议(ark等)"
        json capability "能力声明"
        json conn_config "连接配置"
        int status "状态"
    }
    model_entity {
        bigint id PK "实体ID"
        bigint meta_id FK "所属元数据"
        varchar name "场景名"
        json default_params "默认参数"
        bigint scenario "使用场景"
        int status "状态"
    }
    model_instance {
        bigint id PK "实例ID"
        tinyint type "0LLM 1Embedding 2Rerank"
        json provider "供应商信息"
        json display_info "展示信息"
        json connection "连接信息"
        json capability "能力"
        json parameters "参数定义"
    }
```

原版要点：三层分「协议级元数据 / 场景级实体 / 运行级实例」，启动时读 `conf/model/model_meta.json` 把官方适配的模型清单灌入数据库，运行时按 protocol + connection 实例化对应的 Eino `ChatModel`。

### minicoze 落地表结构（两层模型）

分析原版时发现：`model_meta` / `model_entity` 是**废弃的 v1 设计**——gen 配置里已被注释、全库无幸存代码，现行方案只有 `model_instance`（供应商信息以 JSON 内嵌在每行）。minicoze 借这次从零实现做了重塑：**把内嵌的供应商拆成独立表，交互从「json 种子预置」改为「provider-first 同步拉取」**。

```mermaid
erDiagram
    model_provider ||--o{ model_instance : "provider_id"

    model_provider {
        bigint id PK "供应商ID(IDENTITY自增)"
        varchar name "显示名"
        varchar protocol "协议族: openai/ollama"
        varchar api_protocol "API面: completions/responses"
        varchar base_url "服务地址"
        varchar api_key "密文(AES-GCM)"
        int status "1启用 0停用"
    }
    model_instance {
        bigint id PK "模型ID(IDENTITY自增)"
        bigint provider_id FK "所属供应商"
        varchar name "API调用名(同步去重键)"
        varchar display_name "展示名"
        smallint type "0LLM 1Embedding 2Rerank"
        bigint context_window "上下文,0=未知"
        bigint max_output_tokens "最大输出,0=未知"
        jsonb capability "能力开关"
        jsonb parameters "参数元数据"
        smallint source "1同步 2手动"
        int status "1启用 0停用"
    }
```

### minicoze 要点解读

- **provider-first 取代 json 种子**：用户先接入供应商（protocol + base_url + api_key），点「同步」由后端调远端列表端点（openai 兼容 `GET /v1/models`、ollama `GET /api/tags`）拉取模型，按 `(provider_id, name)` 部分唯一索引**补缺入库、只补不覆盖**——手动调整的类型/能力不会被同步冲掉。消灭了原版「json 种子预置模型清单」的维护成本，也天然支持任意 openai 兼容服务（DeepSeek/硅基流动/vLLM/LM Studio）。
- **事实/旋钮分离**：`context_window`、`max_output_tokens` 是模型的「事实属性」（独立列，0=未知——列表端点拿不到，用户手填）；`temperature` 等是「旋钮」（`parameters` jsonb 存元数据：name/label/type/min/max/default），编辑弹窗只读展示，M2 智能体参数面板消费同一份元数据。
- **密钥安全链路**：api_key 在 DAL 写入路径 AES-GCM 加密、读出路径解密（entity/全程明文）；API 响应在 application 层脱敏为 `sk-1****xyz`。加密不出 DAL、脱敏只在 application、明文的唯一去向是发给 LLM 服务的请求头。
- **协议分发的注册表模式**：`infra/modelfetch/impl/<protocol>` 每协议一个实现（对齐原版 modelbuilder 的 map 分发），新协议 = 加目录 + 注册一行。与 Eino 的桥接留给对话阶段——模型实例 + 供应商连接信息组装后交给模型工厂，届时评估直接用 Eino 还是先自研薄接口。
- **status 用 1/0 且停用必须走专用方法**：gorm 对零值字段默认跳过 + 列有 `default:1`，借道通用 UPDATE 停用会被静默吞掉——启停一律走 `UpdateSimple` 显式赋值的专用 DAO 方法。

### 本阶段交付

**后端**：`model_provider` / `model_instance` 两表 + gen；供应商 CRUD/启停/级联软删；模型同步（modelfetch：openai 兼容 + ollama，补缺不覆盖 + 按名猜类型）；模型手动录入/编辑/启停/删除；11 个接口全部带 swagger 文档。

**前端**：模型服务页全流程——供应商卡片式管理（创建/编辑/启停/删除/同步）、模型编辑弹窗（能力开关 + 参数元数据只读卡片），经 Vite 代理直连后端。

**行为约定**：添加供应商 → 同步 → 编辑/启停/删除全流程；API key 加密落库、响应只出脱敏值；改连接配置不改代码即可切换模型。

**踩坑记录**：PG 索引名 schema 级唯一（索引名统一加表前缀）；bigint `deleted_at` × `gorm.DeletedAt` 在 PG 下 `.Delete()` 必炸（软删改显式 UPDATE 毫秒）；gorm 零值跳过 → 停用/清空字段必须走专用方法或 Select 白名单；`UpdateModel` 的 Select 白名单不含 Status/Parameters，防止启停状态被编辑表单覆写、参数元数据被清空。

---

## 第 3 阶段：对话与会话

从这一阶段开始出现「运行时」概念：会话承载消息，执行记录承载一次对话的全过程。

### 表结构分析

```mermaid
erDiagram
    conversation ||--o{ message : "承载消息"
    conversation ||--o{ run_record : "产生执行记录"
    run_record ||--o{ message : "本轮产生的消息"

    conversation {
        bigint id PK "会话ID"
        varchar name "会话名"
        bigint connector_id "发布渠道"
        bigint agent_id "智能体"
        bigint section_id "当前分节"
        bigint creator_id "创建者"
        tinyint status "1正常 2删除"
    }
    message {
        bigint id PK "消息ID"
        bigint conversation_id FK "所属会话"
        bigint run_id FK "所属执行"
        varchar role "user/assistant/system"
        varchar content_type "类型(text等)"
        mediumtext content "内容"
        text display_content "展示内容"
        text meta_info "引用标注等元信息"
        text reasoning_content "思考过程"
        tinyint status "1可用 2删除"
    }
    run_record {
        bigint id PK "执行ID"
        bigint conversation_id FK "会话"
        bigint section_id "分节"
        bigint agent_id "智能体"
        bigint user_id "用户"
        tinyint status "执行状态"
        text chat_request "请求快照"
        text usage "token用量"
    }
```

### 要点解读

- **`section_id`（分节）**：一个会话内部按「上下文窗口」切分节，每节内部连续对话。超长后滚动新分节，旧分节作为历史归档。表上没有独立 section 表，它是 `conversation` 与 `message` 上的逻辑字段——自建时先按「一个会话一个 section」实现，留出字段即可。
- **`message` 的字段设计很有讲究**：`content`（给模型的原文）、`display_content`（给用户看的渲染文本）、`model_content`（中间过程）、`reasoning_content`（思维链）、`meta_info`（引用了哪些知识切片/插件结果）。一层 UI 一层模型，别混存。
- **`run_record`**：一次对话执行的全记录——请求快照、状态机、失败原因、token 用量。它是计费、审计、排障的根。流式 SSE 里每个事件都挂在一个 run 上。
- 流式协议：Coze 走 SSE（`infra/sse` + hertz-contrib/sse），事件流大致是 `message → message tick → done`。自建时先做同步接口，再升级 SSE，接口设计要一开始就按「事件流」建模。

### 本阶段交付

会话 CRUD、发消息（同步 + SSE）、消息历史分页、run 状态查询。验收标准：拿阶段 2 的模型工厂，能对一个裸模型跑通多轮对话并把消息完整落库。

---

## 第 4 阶段：智能体（Agent）

项目的核心阶段。这里会第一次完整出现「三态发布模型」，后面所有可发布资源都是它的变体。

### 表结构分析

```mermaid
erDiagram
    single_agent_draft ||--o{ single_agent_version : "发布冻结为版本"
    single_agent_version ||--o{ single_agent_publish : "按渠道发布"
    single_agent_draft ||--o{ agent_tool_draft : "草稿引用工具"
    single_agent_version ||--o{ agent_tool_version : "版本固化工具"
    conversation }o--|| single_agent_version : "运行时绑定"

    single_agent_draft {
        bigint id PK "主键"
        bigint agent_id "智能体ID"
        bigint space_id "空间"
        varchar name "名称"
        text prompt "人设与回复逻辑"
        json model_info "模型配置"
        json plugin "插件配置(JSON)"
        json knowledge "知识库配置(JSON)"
        json workflow "工作流配置(JSON)"
        json database_config "数据库配置(JSON)"
        json onboarding_info "开场白"
        json suggest_reply "建议回复"
        bigint variables_meta_id "变量集"
    }
    single_agent_version {
        bigint id PK "主键"
        bigint agent_id "智能体"
        varchar version "版本号"
        bigint connector_id "发布渠道"
        text prompt "prompt快照"
        json model_info "模型快照"
        json plugin "插件快照"
        json knowledge "知识库快照"
        json workflow "工作流快照"
    }
    single_agent_publish {
        bigint id PK "主键"
        bigint agent_id "智能体"
        varchar version "版本"
        varchar connector_ids "渠道列表"
        text publish_info "发布信息"
        tinyint status "0在用 1删除 3禁用"
    }
    agent_tool_draft {
        bigint id PK "主键"
        bigint agent_id "智能体"
        bigint plugin_id "插件"
        bigint tool_id "工具"
        varchar tool_name "工具名"
        json operation "OpenAPI操作快照"
    }
    agent_tool_version {
        bigint id PK "主键"
        bigint agent_id "智能体"
        varchar agent_version "所属版本"
        bigint tool_id "工具"
        varchar tool_version "工具版本"
    }
```

### 要点解读

- **三态模型，吃透它**：
  - `draft`：唯一可编辑态。编排页读写它。
  - `version`：发布时把 draft 全量快照 + 分配版本号（时间戳序列）。不可变。
  - `publish`：某版本在某渠道（connector）上的发布记录。
  - 运行时（对话）只认 version，不认 draft。**调试走 draft 的临时运行，正式走 version**。
- **JSON 弱引用**：`plugin/knowledge/workflow/database_config` 存的是「资源 ID + 该资源的配置」。好处是智能体模块不依赖插件/知识库模块的表结构；代价是发布时要校验引用有效性、删除资源时要检查引用方。原版用 `crossdomain` 接口做这个校验。
- **`agent_tool_draft` 为什么单独建表**：工具引用需要存储 OpenAPI operation 快照和方法/子路径，方便运行时零回查调用；发布时复制进 `agent_tool_version` 与 agent 版本对齐。
- **运行时装配（Eino）**：对话请求进来 → 取 agent version → 反序列化各 JSON 配置 → 用阶段 2 的工厂实例化模型 → 组装 Eino 的 Agent（prompt、Tools、Retriever、Workflow 作为节点）→ 执行 → 消息落库（阶段 3）。这个装配函数是整个平台的心脏。
- `prompt_resource`（提示词库）和 `shortcut_command`（快捷指令）是这个阶段的伴生资源：前者是空间级的 prompt 片段库，后者是绑定到智能体的 `/命令` 快捷操作。

### 本阶段交付

智能体 CRUD、草稿编辑、发布（生成版本快照 + 发布记录）、基于 version 的对话运行时。验收标准：一个只配了 prompt + 模型的智能体，发布后能通过 API 正常对话。

---

## 第 5 阶段：插件与工具

插件 = 一个 OpenAPI 服务；工具 = 插件里的一个 operation。这也是一套三态模型，且比智能体的更完整。

### 表结构分析

```mermaid
erDiagram
    plugin_draft ||--|| plugin : "发布成为正式"
    plugin ||--o{ plugin_version : "多版本"
    plugin_draft ||--o{ tool_draft : "包含工具"
    plugin ||--o{ tool : "包含工具"
    plugin_version ||--o{ tool_version : "版本固化工具"
    plugin ||--o{ plugin_oauth_auth : "用户级授权"
    single_agent_draft }o--|| tool : "智能体引用(JSON)"

    plugin_draft {
        bigint id PK "插件ID"
        bigint space_id "空间"
        varchar server_url "服务地址"
        json manifest "插件清单"
        text openapi_doc "OpenAPI文档"
        int plugin_type "类型"
    }
    tool_draft {
        bigint id PK "工具ID"
        bigint plugin_id "所属插件"
        varchar sub_url "子路径"
        varchar method "HTTP方法"
        json operation "operation schema"
        tinyint debug_status "调试状态"
    }
    plugin_version {
        bigint id PK "主键"
        bigint plugin_id "插件"
        varchar version "版本号"
        json manifest "清单快照"
        text openapi_doc "文档快照"
    }
    tool_version {
        bigint id PK "主键"
        bigint tool_id "工具"
        bigint plugin_id "插件"
        varchar version "版本"
        json operation "快照"
    }
    plugin_oauth_auth {
        bigint id PK "主键"
        bigint user_id "用户"
        bigint plugin_id "插件"
        varchar access_token "访问令牌"
        varchar refresh_token "刷新令牌"
        bigint token_expired_at "过期时间"
    }
```

### 要点解读

- **OpenAPI 是契约**：插件创建时提交 manifest（元信息）+ OpenAPI 文档（kin-openapi 解析校验），每个 operation 解析成一个工具：`sub_url + method + operation schema`（参数、返回值、描述全在 schema 里）。LLM 选工具时读的就是这段 schema，写得清不清楚直接决定 Agent 会不会用。
- **三态在此处最严格**：`plugin_draft/tool_draft` 随便改（有 `debug_status` 调试标记）→ 调试通过 → 发布生成 `plugin`、`tool` 正式行 + `plugin_version/tool_version` 快照。智能体引用的是正式工具，发布智能体时把工具版本一并固化（阶段 4 的 `agent_tool_version`）。
- **执行链路**：运行时工具调用 = 按 operation 构造 HTTP 请求 → 注入鉴权（`plugin_oauth_auth` 里的用户级 token，支持授权码 OAuth 的刷新）→ 解析响应 → 回填给模型。错误处理和超时控制在这里做，别散在 Agent 层。
- 官方内置插件来自 `conf/plugin/pluginproduct/*.yaml`，启动时导入——自建时照此机制先送几个内置插件（如时间、天气）方便调试。

### 本阶段交付

插件创建/导入/调试/发布、工具列表与参数 schema 管理、工具运行时执行器、用户级 OAuth 授权。验收标准：智能体绑定一个 HTTP 工具后，对话中模型能自主发起真实调用并引用结果。

---

## 第 6 阶段：知识库（RAG）

四张 MySQL 表 + 两个外部检索引擎（Milvus 向量 / ES 全文），MySQL 只管「资产」，检索靠专用引擎。

### 表结构分析

```mermaid
erDiagram
    knowledge ||--o{ knowledge_document : "包含文档"
    knowledge_document ||--o{ knowledge_document_slice : "切出切片"
    knowledge_document ||--o{ knowledge_document_review : "预处理预览"

    knowledge {
        bigint id PK "知识库ID"
        bigint space_id "空间"
        bigint app_id "归属应用"
        tinyint format_type "0文本 1表格 2图片"
        varchar icon_uri "图标"
        int status "状态"
    }
    knowledge_document {
        bigint id PK "文档ID"
        bigint knowledge_id FK "所属库"
        varchar name "文档名"
        varchar file_extension "扩展名"
        int document_type "0文本 1表格 2图片"
        varchar uri "存储地址"
        bigint slice_count "切片数"
        json parse_rule "解析规则"
        json table_info "表格配置"
        int source_type "来源"
        int status "索引状态"
    }
    knowledge_document_slice {
        bigint id PK "切片ID"
        bigint document_id FK "所属文档"
        bigint knowledge_id "知识库"
        text content "切片内容"
        decimal sequence "序号"
        bigint hit "命中次数"
        int status "状态"
    }
    knowledge_document_review {
        bigint id PK "预览ID"
        bigint knowledge_id "知识库"
        varchar uri "文件地址"
        text chunk_resp_uri "预处理结果地址"
        tinyint status "0处理中 1完成 2失败"
    }
```

### 要点解读

- **异步流水线**：上传文档 → `knowledge_document_review` 预览（解析 + 预切片，状态机：处理中/完成/失败）→ 用户确认切分规则 → 正式入库：文档下载 → 解析（文本/表格/图片三套解析器，`infra/document`）→ 切片写入 `knowledge_document_slice` → 向量化写入 Milvus、关键词写入 ES 索引 → 文档状态置为可用。NSQ 事件总线驱动每一步。
- **`parse_rule` / `table_info`**：JSON 存每个文档的自定义切分配置（分隔符、chunk 大小、重叠）；表格知识库还要存列 schema，检索时走表格问答链路。
- **检索层抽象**：定义 `Retriever` 接口（Eino 有现成组件），实现「向量检索（Milvus）+ 全文检索（ES）+ 多路召回融合」；`infra/embedding` 用阶段 2 的 Embedding 模型实例。检索结果带 `slice_id`，回表拿原文并给引用标注（阶段 3 的 `meta_info`）。
- **自建过渡方案**：初期可以只做向量检索（Milvus 单 collection，按 knowledge_id 过滤），ES 后补；切片内容也可以先只存 MySQL，量大了再外置。

### 本阶段交付

知识库 CRUD、文档上传/解析/切片流水线、向量与全文双路检索、智能体绑定知识库后的引用式回答。验收标准：上传一篇文档，对话中提问能命中切片并给出引用标注。

---

## 第 7 阶段：数据库表（Agent Database）

这是容易被忽略的功能：让智能体挂一张结构化表，用自然语言查询/写入。它有自己的三态模型 + 动态物理表。

### 表结构分析

```mermaid
erDiagram
    draft_database_info ||--|| online_database_info : "发布对应线上"
    single_agent_draft }o--o{ draft_database_info : "绑定(JSON/关联表)"
    agent_to_database }o--|| draft_database_info : "引用"

    draft_database_info {
        bigint id PK "草稿ID"
        bigint space_id "空间"
        bigint app_id "归属应用"
        bigint related_online_id "线上表ID"
        varchar table_name "逻辑表名"
        varchar table_desc "表描述"
        text table_field "字段定义(JSON)"
        varchar physical_table_name "物理表名"
        tinyint rw_mode "读写模式"
        tinyint prompt_disabled "禁止prompt注入"
    }
    online_database_info {
        bigint id PK "线上ID"
        bigint space_id "空间"
        varchar table_name "逻辑表名"
        text table_field "字段定义"
        varchar physical_table_name "物理表名"
    }
    agent_to_database {
        bigint id PK "主键"
        bigint agent_id "智能体"
        bigint database_id "数据库表"
        bool is_draft "草稿态"
        bool prompt_disable "是否注入prompt"
    }
```

### 要点解读

- **元数据表 + 动态物理表**：`table_field` 存字段定义（名字/类型/描述/枚举），真正存数据的是按 `physical_table_name` **动态 CREATE TABLE** 出来的 MySQL 物理表。发布草稿时：校验 schema → 建物理表 → 写 `online_database_info`。
- **NL2SQL**：查询请求 → 把表结构 + 字段描述注入模板（`conf/prompt/nl2sql_template_jinja2.json`）→ 模型生成 SQL → `infra/sqlparser` 做语法与安全校验（只读模式拦写语句）→ 执行 → 结果回填给模型。`rw_mode` 的三档（受限读写/只读/完全读写）就是在这里生效的。
- **`agent_to_database`**：智能体与表的绑定关系单独建表（带 `is_draft`），因为运行时要把表结构注入 prompt，比 JSON 快照更需要一致性管理。
- 自建警示：动态建表 + 拼 SQL 是安全重灾区，SQL 校验器（白名单语句类型、表名限定、LIMIT 强制）必须先于功能上线。

### 本阶段交付

数据库表资源 CRUD + 发布、动态物理表管理、智能体绑定、NL2SQL 查询链路。验收标准：建一张「客户表」，对话中问「最近 5 条客户」能返回真实数据。

---

## 第 8 阶段：工作流

最复杂的单体模块：可视化编排 + 版本快照 + 执行引擎 + 执行追踪，四组概念七张表。

### 表结构分析

```mermaid
erDiagram
    workflow_meta ||--o{ workflow_draft : "一个草稿"
    workflow_meta ||--o{ workflow_version : "多版本"
    workflow_meta ||--o{ workflow_snapshot : "调试快照"
    workflow_meta ||--o{ workflow_reference : "被引用记录"
    workflow_version ||--o{ workflow_execution : "正式执行"
    workflow_execution ||--o{ node_execution : "节点级追踪"
    single_agent_version }o--|| workflow_meta : "智能体引用"

    workflow_meta {
        bigint id PK "工作流ID"
        bigint space_id "空间"
        varchar name "名称"
        varchar latest_version "最近版本"
        bigint app_id "归属应用"
        int mode "模式"
    }
    workflow_draft {
        bigint id FK "工作流ID"
        mediumtext canvas "画布schema"
        text input_params "输入定义"
        text output_params "输出定义"
        bool test_run_success "试运行通过"
        varchar commit_id "草稿提交号"
    }
    workflow_version {
        bigint id PK "主键"
        bigint workflow_id "工作流"
        varchar version "版本号"
        mediumtext canvas "画布快照"
        text input_params "输入快照"
        text output_params "输出快照"
        varchar commit_id "对应提交"
    }
    workflow_snapshot {
        bigint id PK "主键"
        bigint workflow_id "工作流"
        varchar commit_id "提交号"
        mediumtext canvas "画布快照"
    }
    workflow_reference {
        bigint id PK "主键"
        bigint workflow_id "被引用方"
        bigint referred_id "引用的资源"
        int refer_type "1子工作流 2工具"
        varchar referring_biz_type "引用方业务"
    }
    workflow_execution {
        bigint id PK "执行ID"
        bigint workflow_id "工作流"
        varchar version "版本(空为草稿)"
        int mode "1调试 2正式"
        varchar status "1运行 2成功 3失败"
        mediumtext input "实际输入"
        mediumtext output "实际输出"
        int input_tokens "输入token"
        bigint root_execution_id "根执行"
        bigint parent_node_id "父节点"
        varchar commit_id "草稿提交号"
    }
    node_execution {
        bigint id PK "节点执行ID"
        bigint execute_id FK "所属执行"
        varchar node_id "节点key"
        varchar node_type "节点类型"
        int status "状态"
        mediumtext input "输入"
        mediumtext output "输出"
        int composite_node_index "循环/批处理序号"
        varchar parent_node_id "父节点"
        varchar sub_execute_id "子流程执行"
    }
```

### 要点解读

- **meta / draft / version 与前文一致**，多出两个概念：
  - **`commit_id` + `workflow_snapshot`**：草稿每次保存/试运行生成 commit 快照（类似 git），执行记录反查 commit_id 就能精确复现当时画布——调试执行回放的关键。
  - **`workflow_reference`**：显式的引用关系表（子工作流/被当工具用），支撑引用检查与级联发布。
- **执行模型**：`workflow_execution`（一次运行）→ `node_execution`（每个节点一条）。`root_execution_id / parent_node_id / sub_execute_id` 三个字段支撑子工作流嵌套与循环节点（`composite_node_index` 记循环轮次）。
- **引擎选型**：原版基于 Eino 的 compose（Graph/Chain 编排）+ `infra/checkpoint`（可恢复执行，`resume_event_id` 支持中断恢复）。自建建议先实现线性 + 分支的 DAG 解释器，节点类型从 LLM / 代码 / HTTP / 知识检索四种起步，异步中断恢复放后期。
- **Chatflow**：`chat_flow_role_config` 是「对话流」的人设配置（开场白、建议回复、用户输入配置、语音配置），本质是对话型工作流的 Agent 皮——做完整流编排时顺手支持。

### 本阶段交付

画布 schema 定义与 CRUD、草稿 commit/试运行、发布版本、DAG 执行引擎 + 节点级追踪、子工作流引用。验收标准：编排「LLM → 知识检索 → LLM」三节点流，试运行、发布、对话中作为智能体的工作流能力被调用，全程执行轨迹可查。

---

## 第 9 阶段：应用与发布

应用（App）是资源的容器与面向渠道发布的单元。这个阶段表的「数量」上来了，但模式全部是前文的复用。

### 表结构分析

```mermaid
erDiagram
    app_draft ||--o{ app_release_record : "发布记录"
    app_release_record ||--o{ app_connector_release_ref : "按渠道的发布明细"
    app_draft ||--o{ app_dynamic_conversation_draft : "动态会话"
    app_release_record ||--o{ app_dynamic_conversation_online : "线上动态会话"
    app_release_record ||--o{ app_static_conversation_online : "线上静态会话"
    app_draft ||--o{ app_conversation_template_draft : "会话模板草稿"
    template }o--|| single_agent_publish : "模板指向已发布智能体"
    app_release_record }o--|| connector_workflow_version : "渠道工作流版本"

    app_draft {
        bigint id PK "应用ID"
        bigint space_id "空间"
        bigint owner_id "属主"
        varchar name "应用名"
        varchar icon_uri "图标"
        text description "描述"
    }
    app_release_record {
        bigint id PK "发布记录"
        bigint app_id "应用"
        varchar version "版本"
        json connector_ids "渠道列表"
        tinyint publish_status "发布状态"
        bigint publish_at "发布时间"
        text version_desc "版本说明"
    }
    app_connector_release_ref {
        bigint id PK "主键"
        bigint record_id FK "发布记录"
        bigint connector_id "渠道"
        json publish_config "渠道配置"
        tinyint publish_status "渠道内状态"
    }
    template {
        bigint id PK "模板ID"
        bigint agent_id "智能体(已发布)"
        bigint workflow_id "工作流"
        bigint space_id "空间"
        int heat "热度"
    }
```

### 要点解读

- **connector（渠道）**：发布的目标端（API 渠道、Chat SDK、Web 预览等）。一次应用发布 = 一条 `app_release_record` + 每个渠道一条 `app_connector_release_ref`（渠道级配置与状态）。阶段 3 的 `conversation.connector_id` 就是它。
- **会话模板/动态会话**：应用可以把一组预置会话「打包」——静态模板（`app_static_conversation_*` 挂模板）与动态会话（`app_dynamic_conversation_*` 挂运行会话），草稿/线上成对出现，发布时复制。这是「应用开箱自带示例对话」的底座。
- **`template`**：模板市场——把已发布的智能体/工作流收录为模板（带热度），用户「用模板创建」= 复制资源到自己的空间（顺理成章引出阶段 11 的 `data_copy_task`）。
- 发布是**跨模块事务**：冻结应用内所有资源版本（智能体、工作流各自的 version 表）→ 写发布记录 → 处理 `connector_workflow_version` 等关联。自建时建议用「先写发布记录、状态机推进、失败可重试」的最终一致方案，别硬上分布式事务。

### 本阶段交付

应用 CRUD、发布流水线（多渠道）、会话模板、模板收录与复制。验收标准：把一个带智能体 + 工作流的应用发布到 API 渠道，用阶段 3 的 OpenAPI 按应用维度发起对话。

---

## 第 10 阶段：记忆与变量

Agent 的「状态」分两层：结构化变量（可读写）与对话记忆（上下文管理）。

### 表结构分析

```mermaid
erDiagram
    variables_meta ||--o{ variable_instance : "定义实例化"

    variables_meta {
        bigint id PK "变量集ID"
        bigint space_id "空间"
        bigint app_id "归属应用"
        bigint agent_id "智能体"
        varchar description "描述"
        json keywords "变量关键词"
    }
    variable_instance {
        bigint id PK "实例ID"
        bigint variables_meta_id FK "变量集"
        bigint user_id "终端用户"
        bigint connector_id "渠道"
        varchar keyword "变量名"
        text value "变量值"
    }
```

### 要点解读

- **`variables_meta`**：变量集定义（挂在智能体或应用上），`keywords` 声明变量名与提取关键词。
- **`variable_instance`**：按「终端用户 × 渠道」维度存值——同一个变量，不同用户在不同渠道各有各的值。这是 Agent 记住「这个人」的机制。
- **对话记忆**：短期记忆 = 阶段 3 的会话/分节上下文窗口管理；长期记忆走知识库链路（自动把对话要点写入记忆库，用阶段 6 的检索召回）。原版 `domain/memory` 就是把两者编排起来。
- 自建建议：先只做变量表（实现简单、收益立竿见影——记住用户称呼/偏好），长期记忆等知识库稳定后再接。

### 本阶段交付

变量集定义、变量读写 API、对话运行时的变量注入与回写。

---

## 第 11 阶段：周边能力补全

最后收尾的独立模块，每个都不大，但完整感来自它们。

### 表结构分析

```mermaid
erDiagram
    user ||--o{ files : "上传"
    space ||--o{ data_copy_task : "跨空间复制"

    files {
        bigint id PK "文件ID"
        varchar name "文件名"
        bigint file_size "大小"
        varchar tos_uri "存储URI"
        varchar content_type "类型"
        tinyint status "0无效 1有效"
        varchar creator_id "上传者"
    }
    data_copy_task {
        bigint id PK "主键"
        varchar master_task_id "总任务ID"
        bigint origin_data_id "源资源"
        bigint target_data_id "目标资源"
        tinyint data_type "1知识库 2数据库"
        tinyint status "1创建 2运行 3成功 4失败"
        bigint origin_space_id "源空间"
        bigint target_space_id "目标空间"
    }
```

### 要点解读

- **`files` + MinIO**：统一上传中心。所有 icon_uri / 文档 uri 背后都是这条记录 + MinIO 对象（`infra/storage`，S3 协议，生产可换 TOS/OSS）。注意 `creator_id` 是 varchar——历史上兼容过多种 ID 形态，自建统一 bigint 即可。
- **`data_copy_task`**：模板复制/跨空间迁移的异步任务表（状态机：创建→运行→成功/失败），按资源类型逐条记录。配合阶段 9 的模板市场。
- **无表模块**：联网搜索（`domain/search`，接搜索服务的 API）、OpenAPI 鉴权（`api/middleware/openapi_auth.go`，校验阶段 1 的 api_key）、权限中心（`domain/permission`，空间角色 + 资源级判断）、passport 登录态。这些以代码为主，不需要新表。
- **kv_entries**：通用 KV 兜底表（namespace + key），小配置、状态标记的集散地，别滥用。

---

## 结语：实现顺序与验收清单

回顾整个拆解，依赖链是清晰的：

```mermaid
flowchart TD
    A["用户与空间"] --> B["模型服务"]
    B --> C["对话与会话"]
    C --> D["智能体骨架"]
    D --> E1["插件工具"]
    D --> E2["知识库"]
    D --> E3["数据库表"]
    E1 --> F["智能体完整运行时"]
    E2 --> F
    E3 --> F
    F --> G["工作流"]
    G --> H["应用与发布"]
    H --> I["记忆变量"]
    I --> J["周边收尾"]
```

给自建者的三条心法，也是我从这份源码里读出的最重要的经验：

1. **表结构先行**：每个阶段先把表和索引设计对齐原版，代码只是表结构的表达。原版 55 张表里几乎每张的索引都能看出它的核心查询路径。
2. **三态发布模型是骨架**：智能体、插件、工具、工作流、应用、数据库表——把 draft → version → publish 做成可复用的模式（甚至公共代码），后面每个模块都是填空。
3. **运行时只认版本**：对话永远跑 version 快照，调试才碰 draft。守住这条，编排类产品的稳定性就有底线。

各阶段都可以独立成篇展开（尤其工作流引擎和 RAG 流水线），后续我会挑实现中最有坑的部分继续写。

