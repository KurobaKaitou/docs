---
title: "Windows 通过 ZIP 包安装 MySQL 服务"
description: "以 MySQL 8.4 为例，完整走一遍 Windows 上通过 ZIP 包安装 MySQL 服务的全流程。"
summary: ""
date: "2026-05-27T15:00:22+08:00"
lastmod: "2026-05-27T15:00:22+08:00"
draft: false
weight: 50
categories:
  - "数据库"
tags:
  - "MySQL"
  - "Windows"
  - "数据库"
  - "教程"
contributors: []
pinned: false
homepage: false
---

## 前言

在 Windows 上安装 MySQL，官方提供了两种方式：**MSI 安装包** 和 **ZIP 压缩包**。MSI 虽然图形化操作简单，但安装过程不够透明，卸载残留多，且不方便管理多个版本。ZIP 包安装则更加灵活——解压即用、便于版本切换、完全掌握目录结构。本文将以 **MySQL 8.4** 为例，带你完整走一遍 ZIP 包安装的全流程。

## 一、下载 MySQL

访问 [MySQL 官方下载页](https://dev.mysql.com/downloads/mysql/)，选择 **Windows (x86, 64-bit), ZIP Archive** 版本下载。

{{< callout context="tip" title="选择版本" >}}
建议选择 **MySQL 8.0** 或 **MySQL 8.4 LTS** 版本。8.0 是目前最广泛的稳定版，8.4 是较新的 LTS 长期支持版。如果用于生产环境，优先选择 LTS 版本。
{{< /callout >}}

下载完成后得到一个 `.zip` 文件，文件名类似 `mysql-8.4.0-winx64.zip`。

## 二、解压与目录结构

将 ZIP 包解压到目标安装目录，例如 `D:\dev\mysql-8.4.0`。

解压后的目录结构大致如下：

```bash
D:\dev\mysql-8.4.0\
├── bin\              # 可执行文件（mysqld, mysql, mysqladmin 等）
├── docs\             # 文档
├── include\          # 头文件
├── lib\              # 库文件
├── share\            # 错误信息、字符集等共享文件
└── README            # 说明文件
```

{{< callout context="note" title="关于解压路径" >}}
MySQL 对路径中的中文字符和空格很敏感。请确保解压路径**不包含中文和空格**，否则后续可能出现莫名其妙的问题。
{{< /callout >}}

为了方便管理，可以在 MySQL 根目录下创建 `data` 文件夹用于存放数据库文件，以及 `my.ini` 配置文件。也可以让后续的初始化命令自动生成 `data` 目录。

## 三、创建配置文件 my.ini

MySQL 默认会按照顺序查找配置文件，ZIP 包安装需要手动创建。在 MySQL 根目录下新建 `my.ini` 文件，写入以下基础配置：

```ini
[client]
# 客户端默认连接端口
port=3306
default-character-set=utf8mb4

[mysql]
# mysql 命令行工具的默认字符集
default-character-set=utf8mb4

[mysqld]
# MySQL 服务端口
port=3306

# 安装目录（根据实际路径修改）
basedir=D:/dev/mysql-8.4.0

# 数据存放目录
datadir=D:/dev/mysql-8.4.0/data

# 允许最大连接数
max_connections=200

# 默认字符集
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci

# 默认存储引擎
default-storage-engine=INNODB

# 跳过 DNS 反向解析，加快连接速度
skip-name-resolve

# 默认身份验证插件（MySQL 8.0 默认使用 caching_sha2_password）
# 如果需要兼容旧版客户端，可改为 mysql_native_password
# default_authentication_plugin=caching_sha2_password
```

{{< callout context="caution" title="路径注意事项" >}}
`basedir` 和 `datadir` 的路径分隔符请使用正斜杠 `/` 或双反斜杠 `\\`，**不要**使用单反斜杠 `\`，否则会被识别为转义字符导致配置失效。
{{< /callout >}}

几个关键配置项说明：

| 配置项 | 作用 |
| -------- | ------ |
| `basedir` | MySQL 安装根目录 |
| `datadir` | 数据库文件存放目录 |
| `port` | 服务监听端口，默认 3306 |
| `skip-name-resolve` | 禁用 DNS 反向解析，可显著提升连接速度 |
| `character-set-server` | 服务器默认字符集，推荐 `utf8mb4` |

更多的配置项可以根据实际硬件环境按需添加，如 `innodb_buffer_pool_size`、`tmp_table_size` 等性能相关参数。

## 四、初始化数据目录

配置文件准备好后，以**管理员身份**打开 PowerShell 或 CMD，进入 MySQL 的 `bin` 目录：

```powershell
cd D:\dev\mysql-8.4.0\bin
```

执行初始化命令：

```powershell
.\mysqld --initialize --console
```

{{< callout context="danger" title="务必以管理员身份运行" >}}
初始化命令必须在**管理员权限**下执行，否则可能因权限不足导致初始化失败。在 Windows 搜索框中输入 `PowerShell`，右键选择"以管理员身份运行"即可。
{{< /callout >}}

参数说明：

- `--initialize`：初始化数据目录，创建系统表，**生成一个临时的 root 密码**
- `--console`：将日志输出到控制台，方便查看临时密码

执行成功后，控制台会输出类似以下的内容：

```bash
[Server] A temporary password is generated for root@localhost: xxxxxxxx
```

**请立即复制保存这个临时密码**，后续登录需要用到。如果忘记保存，可以删除 `data` 目录重新初始化。

初始化完成后，MySQL 根目录下会多出一个 `data` 文件夹，里面存放了 `mysql`、`performance_schema`、`sys` 等系统数据库。

## 五、安装 Windows 服务

初始化完成后，将 MySQL 注册为 Windows 系统服务，这样 MySQL 可以开机自启，也方便通过 `net` 命令管理。

仍在**管理员** PowerShell 中执行：

```powershell
.\mysqld --install MySQL
```

如果看到 `Service successfully installed.` 的提示，说明服务注册成功。

`MySQL` 是服务名称，可以自定义，例如 `MySQL84`。服务名称在后面启动、停止、删除服务时都会用到。

{{< callout context="note" title="服务已存在怎么办？" >}}
如果之前安装过 MySQL，再次安装时可能提示服务已存在。可以先删除旧服务再重新安装：

```powershell
.\mysqld --remove MySQL
```

然后再执行安装命令即可。
{{< /callout >}}

## 六、启动 MySQL 服务

服务安装后，可以通过以下两种方式启动：

**方式一：使用 net 命令**

```powershell
net start MySQL
```

**方式二：使用 MySQL 自带的命令**

```powershell
.\mysqld --console
```

方式二会保持前台运行，适合调试。正常使用建议用方式一。

启动后验证服务是否正常运行：

```powershell
.\mysqladmin -u root -p ping
```

输入临时密码后，如果返回 `mysqld is alive`，说明服务运行正常。

## 七、登录并修改 root 密码

服务启动后，使用临时密码登录 MySQL：

```powershell
.\mysql -u root -p
```

输入刚才保存的临时密码（粘贴时可能不可见，这是正常现象），成功进入 MySQL 命令行交互界面。

进入后第一件事就是修改 root 密码：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的新密码';
```

密码策略默认要求包含大小写字母、数字和特殊字符，长度至少 8 位。如果希望使用简单密码，可以先查看并调整密码策略：

```sql
-- 查看当前密码策略
SHOW VARIABLES LIKE 'validate_password%';

-- 降低密码强度要求
SET GLOBAL validate_password.policy = LOW;
SET GLOBAL validate_password.length = 6;

-- 然后修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
```

{{< callout context="caution" title="生产环境安全提醒" >}}
降低密码强度仅建议在本地开发环境使用。生产环境务必保持高强度密码，并考虑创建专用的应用账户而非直接使用 root。
{{< /callout >}}

### 创建远程登录用户（可选）

默认情况下 root 只能从本机（`localhost`）登录。如果需要远程连接，可以新建一个用户或修改 root 的 host：

```sql
-- 创建新用户并允许任意 IP 连接
CREATE USER 'myuser'@'%' IDENTIFIED BY '密码';
GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

`%` 表示允许任意 IP 连接。也可以指定具体 IP，如 `'192.168.1.%'`。

## 八、配置环境变量（推荐）

将 MySQL 的 `bin` 目录添加到系统环境变量中，这样可以在任意路径下直接使用 `mysql`、`mysqldump` 等命令。

1. 右键 **此电脑** → **属性** → **高级系统设置** → **环境变量**
2. 在 **系统变量** 中找到 `Path` 变量，点击编辑
3. 新建一行，添加 MySQL 的 `bin` 目录路径，例如 `D:\dev\mysql-8.4.0\bin`
4. 确定保存

配置完成后，重新打开 PowerShell，直接输入 `mysql -V` 查看版本信息，验证配置是否生效：

```powershell
mysql -V
```

如果正确显示 MySQL 版本号，说明环境变量配置成功。

## 九、管理 MySQL 服务

日常维护常用的命令汇总：

| 操作 | 命令 |
| ------ | ------ |
| 启动服务 | `net start MySQL` |
| 停止服务 | `net stop MySQL` |
| 重启服务 | `net stop MySQL && net start MySQL` |
| 查看服务状态 | `sc query MySQL` |
| 删除服务 | `.\mysqld --remove MySQL` |
| 登录 MySQL | `mysql -u root -p` |

## 十、常见问题与排错

### 1. 初始化时提示 "缺少 MSVCR120.dll" 或类似错误

MySQL 依赖 Visual C++ 运行时库。下载安装 [Microsoft Visual C++ Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) 即可解决。

### 2. 服务启动失败，查看错误日志

错误日志位于 `data` 目录下，文件名通常是 `计算机名.err`。打开查看最后的几行错误信息，是定位问题的最直接手段。

也可以通过命令查看：

```powershell
.\mysqld --console
```

前台运行会将错误信息直接打印到控制台。

### 3. 端口 3306 被占用

检查端口占用情况：

```powershell
netstat -ano | findstr :3306
```

找到占用进程的 PID，在任务管理器中结束该进程，或者在 `my.ini` 中修改 `port` 为其他端口（如 3307）。

### 4. 忘记临时密码

删除 `data` 目录下的所有文件（注意不是删除 `data` 目录本身），然后重新执行初始化命令：

```powershell
.\mysqld --initialize --console
```

会生成一个新的临时密码。

### 5. 中文乱码

确保以下三处都设置为 `utf8mb4`：

- `my.ini` 中的 `character-set-server=utf8mb4`
- 连接时指定字符集：`mysql -u root -p --default-character-set=utf8mb4`
- 创建数据库时指定：`CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

## 十一、总结

通过 ZIP 包安装 MySQL 虽然步骤稍多，但胜在灵活可控：目录结构一目了然，配置文件完全掌握在自己手中，切换版本只需要修改环境变量。这套方法也适用于在 Windows Server 上部署生产环境。

最后的两点建议：

- **保留安装包**：把 ZIP 包存档好，未来重新安装或迁移时直接复用
- **做好备份**：定期备份 `data` 目录下的业务数据库，尤其是 `ibdata1` 和对应的 `.ibd` 文件

以上就是 Windows 通过 ZIP 包安装 MySQL 的完整流程。如果你在安装过程中遇到问题，欢迎在评论区留言讨论。
