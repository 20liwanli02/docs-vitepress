# 第7章：MCP协议

## 一、MCP 概述

### 1.1 什么是 MCP？

**MCP（Model Context Protocol）** 是 Anthropic 提出的模型上下文协议，用于标准化 AI 模型与外部工具/数据源的交互。

```
┌─────────────────────────────────────────────────────────────┐
│                      MCP 架构                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     ┌─────────────┐                    ┌─────────────┐     │
│     │   Client    │                    │   Server    │     │
│     │  (AI 应用)   │ ◄────────────────► │  (工具提供者) │     │
│     └─────────────┘                    └─────────────┘     │
│            │                                  │            │
│            │         MCP 协议                 │            │
│            │    ┌──────────────────┐         │            │
│            └───►│  Tools           │◄────────┘            │
│                 │  Resources       │                      │
│                 │  Prompts         │                      │
│                 └──────────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 MCP 核心概念

| 概念 | 说明 |
|-----|------|
| **Client** | AI 应用端，发起请求 |
| **Server** | 工具提供者，响应请求 |
| **Tool** | 可调用的工具函数 |
| **Resource** | 可访问的资源（文件、数据等） |
| **Prompt** | 预定义的提示词模板 |

### 1.3 传输协议

| 协议 | 说明 | 适用场景 |
|-----|------|---------|
| **stdio** | 标准输入输出 | 本地进程通信 |
| **SSE** | Server-Sent Events | HTTP 长连接 |
| **Streamable HTTP** | 流式 HTTP | HTTP 通信 |

---

## 二、MCP 在项目中的应用

### 2.1 MCP 配置

```yaml
# api/config.yaml

mcpServers:
  # 示例：文件系统 MCP
  mcp_filesystem:
    enabled: true
    transport: stdio
    command: npx
    args:
      - "-y"
      - "@modelcontextprotocol/server-filesystem"
      - "/path/to/allowed/directory"
  
  # 示例：GitHub MCP
  mcp_github:
    enabled: true
    transport: stdio
    command: npx
    args:
      - "-y"
      - "@modelcontextprotocol/server-github"
    env:
      GITHUB_TOKEN: "your_github_token"
  
  # 示例：自定义 HTTP MCP
  mcp_custom:
    enabled: true
    transport: sse
    url: http://localhost:3001/sse
    headers:
      Authorization: "Bearer token"
```

### 2.2 MCPClientManager 实现

```python
# api/app/domain/services/tools/mcp.py

class MCPClientManager:
    """MCP 客户端管理器"""
    
    def __init__(self, mcp_config: MCPConfig):
        self._mcp_config = mcp_config
        self._exit_stack = AsyncExitStack()      # 异步上下文管理
        self._clients: Dict[str, ClientSession] = {}  # 客户端会话缓存
        self._tools: Dict[str, List[Tool]] = {}       # 工具列表缓存
        self._initialized = False
    
    async def initialize(self):
        """初始化所有 MCP 服务器连接"""
        if self._initialized:
            return
        
        await self._connect_mcp_servers()
        self._initialized = True
    
    async def _connect_mcp_servers(self):
        """连接所有配置的 MCP 服务器"""
        for server_name, server_config in self._mcp_config.mcpServers.items():
            try:
                await self._connect_mcp_server(server_name, server_config)
            except Exception as e:
                logger.error(f"连接 MCP 服务器 [{server_name}] 失败: {e}")
    
    async def _connect_mcp_server(self, server_name: str, config: MCPServerConfig):
        """连接单个 MCP 服务器"""
        transport = config.transport
        
        if transport == MCPTransport.STDIO:
            await self._connect_stdio_server(server_name, config)
        elif transport == MCPTransport.SSE:
            await self._connect_sse_server(server_name, config)
        elif transport == MCPTransport.STREAMABLE_HTTP:
            await self._connect_streamable_http_server(server_name, config)
```

### 2.3 连接不同传输协议

```python
class MCPClientManager:
    
    async def _connect_stdio_server(self, name: str, config: MCPServerConfig):
        """连接 stdio 传输的 MCP 服务器"""
        server_params = StdioServerParameters(
            command=config.command,
            args=config.args,
            env={**os.environ, **config.env},
        )
        
        # 创建 stdio 传输
        stdio_transport = await self._exit_stack.enter_async_context(
            stdio_client(server_params)
        )
        read_stream, write_stream = stdio_transport
        
        # 创建客户端会话
        session = await self._exit_stack.enter_async_context(
            ClientSession(read_stream, write_stream)
        )
        
        # 初始化会话
        await session.initialize()
        
        # 缓存会话和工具
        self._clients[name] = session
        await self._cache_mcp_server_tools(name, session)
    
    async def _connect_sse_server(self, name: str, config: MCPServerConfig):
        """连接 SSE 传输的 MCP 服务器"""
        sse_transport = await self._exit_stack.enter_async_context(
            sse_client(url=config.url, headers=config.headers)
        )
        read_stream, write_stream = sse_transport
        
        session = await self._exit_stack.enter_async_context(
            ClientSession(read_stream, write_stream)
        )
        await session.initialize()
        
        self._clients[name] = session
        await self._cache_mcp_server_tools(name, session)
    
    async def _connect_streamable_http_server(self, name: str, config: MCPServerConfig):
        """连接 Streamable HTTP 传输的 MCP 服务器"""
        http_transport = await self._exit_stack.enter_async_context(
            streamablehttp_client(url=config.url, headers=config.headers)
        )
        
        if len(http_transport) == 3:
            read_stream, write_stream, _ = http_transport
        else:
            read_stream, write_stream = http_transport
        
        session = await self._exit_stack.enter_async_context(
            ClientSession(read_stream, write_stream)
        )
        await session.initialize()
        
        self._clients[name] = session
        await self._cache_mcp_server_tools(name, session)
```

### 2.4 工具调用

```python
class MCPClientManager:
    
    async def get_all_tools(self) -> List[Dict[str, Any]]:
        """获取所有 MCP 工具的 Schema"""
        all_tools = []
        
        for server_name, tools in self._tools.items():
            for tool in tools:
                # 添加前缀避免命名冲突
                tool_name = f"mcp_{server_name}_{tool.name}"
                
                tool_schema = {
                    "type": "function",
                    "function": {
                        "name": tool_name,
                        "description": f"[{server_name}] {tool.description}",
                        "parameters": tool.inputSchema,
                    }
                }
                all_tools.append(tool_schema)
        
        return all_tools
    
    async def invoke(self, tool_name: str, arguments: Dict[str, Any]) -> ToolResult:
        """调用 MCP 工具"""
        # 解析服务器名和工具名
        original_server_name = None
        original_tool_name = None
        
        for server_name in self._mcp_config.mcpServers.keys():
            expected_prefix = f"mcp_{server_name}"
            if tool_name.startswith(f"{expected_prefix}_"):
                original_server_name = server_name
                original_tool_name = tool_name[len(expected_prefix) + 1:]
                break
        
        if not original_server_name or not original_tool_name:
            return ToolResult(success=False, message=f"未找到工具: {tool_name}")
        
        # 获取会话
        session = self._clients.get(original_server_name)
        if not session:
            return ToolResult(success=False, message=f"MCP 服务器未连接: {original_server_name}")
        
        # 调用工具
        result = await session.call_tool(original_tool_name, arguments)
        
        # 处理结果
        content = []
        if hasattr(result, "content") and result.content:
            for item in result.content:
                if hasattr(item, "text"):
                    content.append(item.text)
                else:
                    content.append(str(item))
        
        return ToolResult(
            success=True,
            data="\n".join(content) if content else "工具执行成功"
        )
```

---

## 三、MCPTool 封装

### 3.1 MCPTool 类

```python
class MCPTool(BaseTool):
    """MCP 工具包"""
    
    name: str = "mcp"
    
    def __init__(self):
        super().__init__()
        self._initialized = False
        self._tools = []
        self._manager: MCPClientManager = None
    
    async def initialize(self, mcp_config: MCPConfig):
        """初始化 MCP 工具包"""
        if not self._initialized:
            self._manager = MCPClientManager(mcp_config)
            await self._manager.initialize()
            self._tools = await self._manager.get_all_tools()
            self._initialized = True
    
    def get_tools(self) -> List[Dict[str, Any]]:
        """获取工具列表"""
        return self._tools
    
    def has_tool(self, tool_name: str) -> bool:
        """判断工具是否存在"""
        for tool in self._tools:
            if tool["function"]["name"] == tool_name:
                return True
        return False
    
    async def invoke(self, tool_name: str, **kwargs) -> ToolResult:
        """调用工具"""
        return await self._manager.invoke(tool_name, kwargs)
    
    async def cleanup(self):
        """清理资源"""
        if self._manager:
            await self._manager.cleanup()
```

### 3.2 在 Flow 中使用

```python
class PlannerReActFlow(BaseFlow):
    
    def __init__(self, ..., mcp_config: MCPConfig):
        # 初始化 MCP 工具
        mcp_tool = MCPTool()
        await mcp_tool.initialize(mcp_config)
        
        # 添加到工具列表
        tools = [
            FileTool(sandbox=sandbox),
            ShellTool(sandbox=sandbox),
            BrowserTool(browser=browser),
            SearchTool(search_engine=search_engine),
            MessageTool(),
            mcp_tool,  # MCP 工具
            a2a_tool,
        ]
```

---

## 四、常用 MCP 服务器

### 4.1 文件系统 MCP

```yaml
mcpServers:
  mcp_filesystem:
    enabled: true
    transport: stdio
    command: npx
    args:
      - "-y"
      - "@modelcontextprotocol/server-filesystem"
      - "/path/to/directory"
```

**提供的工具**：
- `read_file` - 读取文件
- `write_file` - 写入文件
- `list_directory` - 列出目录
- `create_directory` - 创建目录
- `move_file` - 移动文件
- `search_files` - 搜索文件

### 4.2 GitHub MCP

```yaml
mcpServers:
  mcp_github:
    enabled: true
    transport: stdio
    command: npx
    args:
      - "-y"
      - "@modelcontextprotocol/server-github"
    env:
      GITHUB_TOKEN: "ghp_xxxx"
```

**提供的工具**：
- `create_issue` - 创建 Issue
- `create_pull_request` - 创建 PR
- `search_repositories` - 搜索仓库
- `get_file_contents` - 获取文件内容
- `push_files` - 推送文件

### 4.3 PostgreSQL MCP

```yaml
mcpServers:
  mcp_postgres:
    enabled: true
    transport: stdio
    command: uvx
    args:
      - "mcp-server-postgres"
      - "postgresql://user:pass@localhost/db"
```

**提供的工具**：
- `query` - 执行 SQL 查询
- `list_tables` - 列出表
- `describe_table` - 描述表结构

---

## 五、开发自定义 MCP 服务器

### 5.1 Python 实现

```python
# mcp_server.py

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

server = Server("my-mcp-server")

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="hello",
            description="返回问候语",
            inputSchema={
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "名字"
                    }
                },
                "required": ["name"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "hello":
        return [
            TextContent(
                type="text",
                text=f"Hello, {arguments['name']}!"
            )
        ]
    raise ValueError(f"未知工具: {name}")

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

### 5.2 配置使用

```yaml
mcpServers:
  my_custom:
    enabled: true
    transport: stdio
    command: python
    args:
      - "mcp_server.py"
```

---

## 六、MCP 最佳实践

### 6.1 配置建议

| 建议 | 说明 |
|-----|------|
| 按需启用 | 只启用需要的 MCP 服务器 |
| 环境变量 | 敏感信息使用环境变量 |
| 错误处理 | 配置错误时跳过而非崩溃 |
| 资源清理 | 使用完毕后清理资源 |

### 6.2 性能优化

```python
class MCPClientManager:
    
    async def _cache_mcp_server_tools(self, name: str, session: ClientSession):
        """缓存工具列表，避免重复获取"""
        try:
            tools_response = await session.list_tools()
            self._tools[name] = tools_response.tools
        except Exception as e:
            logger.error(f"获取工具列表失败: {e}")
            self._tools[name] = []
```

---

## 七、总结

### 7.1 MCP 优势

| 优势 | 说明 |
|-----|------|
| **标准化** | 统一的工具协议 |
| **生态丰富** | 大量现成的 MCP 服务器 |
| **易于扩展** | 可开发自定义服务器 |
| **安全可控** | 权限和访问控制 |

### 7.2 关键代码位置

| 模块 | 文件路径 |
|-----|---------|
| MCP 工具 | `api/app/domain/services/tools/mcp.py` |
| MCP 配置 | `api/app/config.yaml` |

---

## 八、下一步

- 🤝 学习 A2A 协议：[第8章 A2A协议](./08-A2A协议.md)

---

**上一章**：[工具系统](./06-工具系统.md) | **下一章**：[A2A协议](./08-A2A协议.md)
