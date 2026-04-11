# OpenClaw 环境搭建笔记

## 一、部署方式概览

| 部署方式               | 推荐度 | 适用场景              | 特点                      |
| ---------------------- | ------ | --------------------- | ------------------------- |
| **Mac 本地部署**       | ⭐⭐⭐⭐⭐  | 有 Mac 电脑           | 体验最好，功能最全        |
| **云端一键部署**       | ⭐⭐⭐⭐⭐  | 无 Mac/需 24 小时运行 | 成本低，稳定可靠          |
| **Windows 本地部署**   | ⭐⭐⭐    | Windows 用户          | WSL2 推荐，原生支持有限   |
| **Linux 本地部署**     | ⭐⭐⭐    | 开发者                | 配置灵活                  |
| **Cloudflare Workers** | ⭐⭐     | 进阶用户              | 全球 CDN 加速，Serverless |

**推荐组合**：
- 🍎 **有 Mac** → Mac 本地部署 + 飞书配置
- ☁️ **无 Mac/需 24 小时运行** → 云端一键部署 + 飞书配置

---

## 二、Mac 本地部署（强烈推荐）

### 系统要求
- **CPU**：M 系列芯片或 Intel i5 以上
- **内存**：8GB+（推荐 16GB）
- **系统**：macOS 12 Monterey+
- **前置软件**：Node.js 22.0.0+（自动安装）

### 安装步骤

#### 1. 打开终端
`Command + 空格` → 输入 `Terminal` → 回车

#### 2. 安装 OpenClaw
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```
预计时间：2-5 分钟

#### 3. 验证安装
```bash
openclaw --version  # 应显示版本号如 2026.3.2
```

#### 4. 初始化配置
```bash
openclaw onboard --install-daemon
```

**配置向导流程**：
1. **接受风险提示** → 选择 `Yes`
2. **启动模式** → 推荐 `QuickStart`
3. **选择 AI 模型**：
   - **Kimi**：长文本专家，200 万字上下文
   - **DeepSeek**：性价比之王
   - **智谱 GLM**：中文理解好
4. **输入 API Key**（详见 API 配置指南）
5. **聊天工具** → 可选飞书/Telegram/None
6. **Gateway 端口** → 默认 `18789`
7. **选择 Skills** → 空格选择，可跳过
8. **启用 Hooks** → 推荐启用内容引导、日志、会话记录

#### 5. 验证 Gateway 状态
```bash
openclaw channels status  # 应显示 Gateway reachable
```

### 日常使用命令
```bash
openclaw gateway start    # 启动 Gateway
openclaw gateway enable   # 开机自启（systemd）
openclaw gateway stop     # 停止服务
```

**Web UI 地址**：`http://127.0.0.1:18789/chat`

---

## 三、Windows 本地部署

### 方式一：WSL2 + Ubuntu（强烈推荐）

#### 1. 启用 WSL2（管理员 PowerShell）
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
wsl --set-default-version 2
```
**重启电脑**

#### 2. 安装 Ubuntu
Microsoft Store 搜索「Ubuntu 22.04 LTS」→ 安装 → 设置用户名密码

#### 3. 更新系统并安装依赖
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git wget build-essential
```

#### 4. 安装 Node.js 22+
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v  # 验证版本 ≥22.x
```

#### 5. 安装 OpenClaw
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

#### 6. 配置 Windows 访问 WSL2
创建启动脚本 `start-openclaw.bat`：
```batch
@echo off
echo Starting OpenClaw Gateway in WSL2...
wsl -d Ubuntu-22.04 -u root service openclaw start
timeout /t 3
start http://localhost:18789
```

### 方式二：PowerShell 原生部署

#### 1. 安装 Node.js 22+
官网下载：https://nodejs.org/zh-cn

#### 2. 管理员身份安装
```powershell
npm install -g openclaw@latest
# 或汉化版
npm install -g @qingchencloud/openclaw-zh@latest
```

#### 3. 解决权限问题
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 4. 初始化配置
```powershell
openclaw onboard --install-daemon
```

---

## 四、云端一键部署

### 方案对比

| 方案                  | 价格              | 带宽 | 推荐场景     |
| --------------------- | ----------------- | ---- | ------------ |
| **腾讯云 Lighthouse** | 20元/月，99元/年  | 20M  | QQ、企微用户 |
| **火山引擎**          | 9.9元/月，58元/年 | 5M   | 飞书用户     |
| **百度智能云**        | 0.01元/月（首月） | -    | 低成本试用   |

### 腾讯云 Lighthouse 部署（推荐）

#### 1. 购买服务器
- 访问：https://cloud.tencent.com/act/pro/lighthouse-moltbot
- 配置：2核2G，20M 带宽
- 地域：推荐**硅谷**（访问 AI 模型更稳定）
- 价格：20元/月 或 99元/年

#### 2. 获取服务器信息
- 点击头像 →「站内信」
- 记录：公网 IP、用户名（`lighthouse`）、初始密码

#### 3. 连接服务器
**方式一：SSH 客户端（推荐）**
- 下载 Xterminal/Termius/FinalShell
- 新建连接：地址=公网 IP，端口=22，用户名=`lighthouse`

**方式二：网页终端**
- 腾讯云控制台 → 点击实例卡片 →「登录」

#### 4. 验证安装
```bash
openclaw --version  # 预装成功会显示版本
```

#### 5. 配置大模型
1. 控制台 → 服务器卡片 →「应用管理」
2. 选择模型（推荐 **Kimi k2.5**）
3. 获取 API Key：
   - 访问 https://platform.moonshot.cn/
   - 注册 →「API 管理」→「创建 API Key」
4. 粘贴 API Key → 保存

#### 6. 测试连接
- 访问：`http://你的服务器IP:18789/?token=xxx`
- 发送测试消息，验证 AI 回复

### 免费白嫖方案（CodeBuddy 活动）
1. 注册 CodeBuddy（国际版/国内版）
2. 点击「实战礼」→「立刻领奖」→ 获 1 个月免费
3. 累计活跃 7 日可再延长 2 个月
4. 腾讯云控制台 →「重装系统」→ 选择「OpenClaw」模板

### 腾讯龙虾产品矩阵（2026 新增）

| 产品           | 类型       | 平台    | 状态   | 定位                           |
| -------------- | ---------- | ------- | ------ | ------------------------------ |
| **Lighthouse** | 云服务器   | 全平台  | ✅ 稳定 | 部署 OpenClaw 后端             |
| **QClaw**      | 桌面客户端 | macOS   | ✅ 公测 | 腾讯官方桌面客户端，开箱即用   |
| **WorkBuddy**  | 桌面 Agent | Win/Mac | ✅ 公测 | 多 IM 接入（微信、QQ、飞书等） |
| **ClawBot**    | 微信插件   | 全平台  | ✅ 公测 | 官方微信接入方案               |

**使用建议**：
- **macOS 用户**：优先试用 QClaw（2026-03-20 全量公测）
- **多 IM 需求**：选择 WorkBuddy
- **微信深度用户**：搭配 ClawBot

---

## 五、国内一键安装（推荐国内用户）

### 特点
- ⚡ 国内镜像源，下载速度快
- 🇨🇳 完整中文界面
- 📦 自动配置所有依赖
- 💰 默认配置国产模型（Kimi/DeepSeek/GLM）

### 安装命令

**macOS/Linux**：
```bash
curl -fsSL https://clawd.org.cn/install.sh | bash
```

**Windows（PowerShell 管理员）**：
```powershell
iwr -useb https://clawd.org.cn/install.ps1 | iex
```

**WSL2 用户**：
```bash
wsl --install  # 重启后
curl -fsSL https://clawd.org.cn/install.sh | bash
```

### 运行配置向导
```bash
openclaw-cn onboard --install-daemon
```

**配置流程**：
1. **网关模式** → 本地网关（推荐）
2. **认证配置** → API 密钥（推荐 Anthropic）或 OAuth
3. **AI 提供商** → Kimi/DeepSeek/GLM-4（国产）或 Claude/GPT
4. **聊天平台** → WhatsApp（QR 码）/Telegram/Discord/飞书/企微/钉钉
5. **安装后台服务** → 推荐启用（开机自启）
6. **网关令牌** → 自动生成，用于 Web UI 认证

### 常用命令
```bash
openclaw-cn status           # 查看状态
openclaw-cn health           # 健康检查
openclaw-cn gateway status   # 检查网关状态
openclaw-cn gateway restart  # 重启网关
```

### 配对安全（私信审批）
```bash
openclaw-cn pairing list whatsapp      # 查看待审批配对
openclaw-cn pairing approve whatsapp <code>  # 批准配对
```

---

## 六、Cloudflare Workers 部署（进阶）

### 特点
- 🌍 全球边缘网络加速
- 💰 5美元/月起步
- 🔒 内置 Zero Trust 安全认证
- 📦 Serverless 无需维护

### 部署步骤

#### 1. 一键部署
访问：https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/moltworker

**配置变量**：
- `MOLTBOT_GATEWAY_TOKEN`：务必修改并保存，用于管理后台登录

#### 2. 配置 Access（Zero Trust）
1. Zero Trust → Access → Applications → 添加 Self-hosted
2. 设置域名（默认 `moltbot-sandbox`）
3. 获取 `CF_ACCESS_AUD`（应用受众）和 `CF_ACCESS_TEAM_DOMAIN`

#### 3. 配置 R2 对象存储
获取并配置：
- `CF_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`

#### 4. 注入变量并重新部署
Workers → Settings → Variables and Secrets → 填入所有变量 → Deploy

---

## 七、配置文件位置

```
~/.openclaw/openclaw.json                    # 主配置文件
~/.openclaw/agents/<agentId>/agent/auth-profiles.json  # 认证配置
~/.openclaw/credentials/oauth.json           # OAuth 凭据（旧版）
~/.openclaw/logs/gateway.log                 # 日志文件
```

---

## 八、常见问题速查

| 问题                   | 解决方案                                                     |
| ---------------------- | ------------------------------------------------------------ |
| Mac 安装权限不足       | `curl -fsSL https://openclaw.ai/install.sh \| sudo bash`     |
| Windows 安装失败       | 使用 WSL2，原生 Windows 支持有限                             |
| Node.js 版本过低       | `nvm install 22 && nvm use 22`                               |
| sharp 模块加载失败     | `npm cache clean --force && npm install -g openclaw@latest --force` |
| 健康检查显示 "no auth" | 重新运行 `openclaw onboard` 配置认证                         |
| WhatsApp/Telegram 问题 | 使用 Node 运行网关，不要用 Bun                               |

---

## 九、下一步

安装完成后：
1. **配置 AI 模型** → 见 API 配置指南
2. **连接聊天平台** → 见第 9 章：多平台集成（飞书/企微/钉钉/QQ/Telegram）
3. **安装 Skills** → 见第 8 章：Skills 扩展
4. **开始使用** → 见第 3 章：快速上手