# 第5章：Agent核心原理

## 一、Agent 概述

### 1.1 什么是 Agent？

**Agent（智能体）** 是一种能够自主感知环境、做出决策并执行行动的 AI 系统。

```
┌─────────────────────────────────────────────────────────────┐
│                      Agent 核心特征                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │   感知      │    │   决策      │    │   行动      │    │
│  │  (Perceive) │ ──►│  (Decide)   │ ──►│   (Act)     │    │
│  └─────────────┘    └─────────────┘    └─────────────┘    │
│         ▲                                    │             │
│         │                                    │             │
│         └────────────────────────────────────┘             │
│                      反馈循环                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Agent vs 传统 AI

| 对比项 | 传统 AI | Agent |
|-------|---------|-------|
| 交互方式 | 单轮问答 | 多轮交互 |
| 任务处理 | 直接回答 | 规划+执行 |
| 工具使用 | 无 | 可调用工具 |
| 自主性 | 被动响应 | 主动规划执行 |
| 错误处理 | 直接报错 | 自动重试/调整 |

---

## 二、ReAct 模式

### 2.1 ReAct 原理

**ReAct = Reasoning + Acting**

```
┌─────────────────────────────────────────────────────────────┐
│                      ReAct 循环                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     ┌──────────┐                                            │
│     │  用户请求  │                                           │
│     └────┬─────┘                                            │
│          │                                                  │
│          ▼                                                  │
│     ┌──────────┐                                            │
│     │  Thought │ ◄─── 思考：我该怎么做？                      │
│     │  (思考)   │                                           │
│     └────┬─────┘                                            │
│          │                                                  │
│          ▼                                                  │
│     ┌──────────┐                                            │
│     │  Action  │ ◄─── 行动：调用工具                          │
│     │  (行动)   │                                           │
│     └────┬─────┘                                            │
│          │                                                  │
│          ▼                                                  │
│     ┌──────────┐                                            │
│     │Observation│ ◄─── 观察：工具返回结果                     │
│     │  (观察)   │                                           │
│     └────┬─────┘                                            │
│          │                                                  │
│          ▼                                                  │
│     ┌──────────┐                                            │
│     │  完成了吗？│                                           │
│     └────┬─────┘                                            │
│          │                                                  │
│     ┌────┴────┐                                             │
│     │         │                                             │
│    否        是                                             │
│     │         │                                             │
│     ▼         ▼                                             │
│  返回Thought  返回结果                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 ReAct 示例

```
用户：帮我搜索 Python 教程并整理成文档

Thought: 用户需要搜索 Python 教程并整理成文档。
         我需要先搜索，然后整理内容，最后保存文件。

Action: search("Python 教程")

Observation: 搜索结果：
         1. Python 官方教程 - https://docs.python.org/zh-cn/3/tutorial/
         2. 菜鸟教程 - https://www.runoob.com/python3/
         ...

Thought: 搜索到了多个教程，我需要访问第一个链接获取内容。

Action: browser_navigate("https://docs.python.org/zh-cn/3/tutorial/")

Observation: 页面内容：Python 官方教程...

Thought: 获取到了内容，现在需要整理成 Markdown 格式并保存。

Action: write_file("python_tutorial.md", "# Python 教程\n...")

Observation: 文件保存成功

Thought: 任务完成，我已经搜索并整理了 Python 教程。

Answer: 我已经帮你搜索并整理了 Python 教程，保存在 python_tutorial.md 文件中。
```

---

## 三、双 Agent 协作架构

### 3.1 架构设计

本项目采用 **Planner + Executor** 双 Agent 协作架构：

```
┌─────────────────────────────────────────────────────────────┐
│                    双 Agent 协作架构                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ┌─────────────┐                          │
│                    │ 用户请求     │                          │
│                    └──────┬──────┘                          │
│                           │                                 │
│                           ▼                                 │
│              ┌────────────────────────┐                     │
│              │     PlannerAgent       │                     │
│              │       (规划者)          │                     │
│              │                        │                     │
│              │  • 分析用户需求         │                     │
│              │  • 拆解为子任务         │                     │
│              │  • 生成执行计划         │                     │
│              │  • 动态调整计划         │                     │
│              └────────────┬───────────┘                     │
│                           │                                 │
│                           ▼ Plan                            │
│              ┌────────────────────────┐                     │
│              │      ReActAgent        │                     │
│              │       (执行者)          │                     │
│              │                        │                     │
│              │  • 执行具体子任务       │                     │
│              │  • 调用工具            │                     │
│              │  • 返回执行结果         │                     │
│              │  • 汇总最终答案         │                     │
│              └────────────┬───────────┘                     │
│                           │                                 │
│                           ▼                                 │
│                    ┌─────────────┐                          │
│                    │   返回结果   │                          │
│                    └─────────────┘                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 职责分工

| Agent | 职责 | 特点 |
|-------|------|------|
| **PlannerAgent** | 规划、监控、调整 | 不调用工具，只做决策 |
| **ReActAgent** | 执行、调用工具、汇总 | 可调用所有工具 |

### 3.3 协作流程

```
┌─────────────────────────────────────────────────────────────┐
│                     协作流程图                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 规划阶段                                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ PlannerAgent.create_plan(message)                   │   │
│  │                                                      │   │
│  │ 输入: 用户消息                                        │   │
│  │ 输出: Plan { steps: [Step1, Step2, Step3...] }      │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  2. 执行阶段                                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ for step in plan.steps:                             │   │
│  │     ReActAgent.execute_step(plan, step, message)    │   │
│  │                                                      │   │
│  │     执行结果: step.result                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  3. 更新阶段                                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ PlannerAgent.update_plan(plan, step)                │   │
│  │                                                      │   │
│  │ 根据执行结果动态调整后续计划                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  4. 汇总阶段                                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ReActAgent.summarize()                              │   │
│  │                                                      │   │
│  │ 汇总所有子步骤结果，生成最终回复                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 四、BaseAgent 基类设计

### 4.1 核心属性

```python
class BaseAgent(ABC):
    name: str = ""                    # Agent 名称
    _system_prompt: str = ""          # 系统提示词
    _format: Optional[str] = None     # 响应格式（json_object/text）
    _retry_interval: float = 1.0      # 重试间隔
    _tool_choice: Optional[str] = None # 工具选择策略
    
    def __init__(
        self,
        uow_factory: Callable[[], IUnitOfWork],
        session_id: str,
        agent_config: AgentConfig,
        llm: LLM,
        json_parser: JSONParser,
        tools: List[BaseTool],
    ):
        self._uow_factory = uow_factory
        self._session_id = session_id
        self._agent_config = agent_config
        self._llm = llm
        self._memory: Optional[Memory] = None
        self._json_parser = json_parser
        self._tools = tools
```

### 4.2 核心方法

```python
class BaseAgent(ABC):
    
    async def invoke(self, query: str) -> AsyncGenerator[BaseEvent, None]:
        """
        Agent 主入口方法
        
        流程：
        1. 调用 LLM 获取响应
        2. 检查是否有工具调用
        3. 如果有，执行工具并获取结果
        4. 将结果反馈给 LLM
        5. 循环直到 LLM 不再调用工具
        6. 返回最终结果
        """
        
    async def _invoke_llm(self, messages: List[Dict]) -> Dict:
        """
        调用 LLM
        
        包含：
        - 消息添加到记忆
        - 重试机制
        - 空回复处理
        """
        
    async def _invoke_tool(self, tool: BaseTool, name: str, args: Dict) -> ToolResult:
        """
        调用工具
        
        包含：
        - 重试机制
        - 错误处理
        """
        
    async def _add_to_memory(self, messages: List[Dict]):
        """
        添加消息到记忆
        
        包含：
        - 系统提示词初始化
        - 持久化存储
        """
```

### 4.3 执行流程图

```
┌─────────────────────────────────────────────────────────────┐
│                    invoke() 执行流程                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  输入: query (用户消息)                                      │
│       format (响应格式)                                      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. 调用 _invoke_llm() 获取 LLM 响应                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 2. 检查响应中是否有 tool_calls                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│              ┌────────────┴────────────┐                    │
│              │                         │                    │
│           有工具调用                 无工具调用               │
│              │                         │                    │
│              ▼                         │                    │
│  ┌───────────────────┐                │                    │
│  │ 3. 遍历 tool_calls │                │                    │
│  │                    │                │                    │
│  │ for tool_call in   │                │                    │
│  │   tool_calls:      │                │                    │
│  │                    │                │                    │
│  │   yield ToolEvent  │ ◄── 发送调用中事件                  │
│  │   (CALLING)        │                                     │
│  │                    │                                     │
│  │   result = await   │                                     │
│  │   _invoke_tool()   │                                     │
│  │                    │                                     │
│  │   yield ToolEvent  │ ◄── 发送调用完成事件                 │
│  │   (CALLED)         │                                     │
│  └──────────┬────────┘                                     │
│             │                                               │
│             ▼                                               │
│  ┌───────────────────┐                                     │
│  │ 4. 将工具结果添加   │                                     │
│  │    到消息列表       │                                     │
│  └──────────┬────────┘                                     │
│             │                                               │
│             ▼                                               │
│  ┌───────────────────┐                                     │
│  │ 5. 再次调用 LLM    │ ◄── 返回步骤 2                       │
│  └───────────────────┘                                     │
│                                                             │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 6. LLM 返回文本响应                                   │   │
│  │    yield MessageEvent(message)                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  输出: AsyncGenerator[BaseEvent]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 五、PlannerAgent 设计

### 5.1 核心特点

```python
class PlannerAgent(BaseAgent):
    name: str = "planner"
    _system_prompt: str = SYSTEM_PROMPT + PLANNER_SYSTEM_PROMPT
    _format: str = "json_object"    # 强制 JSON 输出
    _tool_choice: str = "none"      # 不调用工具
```

**关键设计**：
- `_format = "json_object"`：强制 LLM 输出 JSON 格式
- `_tool_choice = "none"`：规划 Agent 不调用工具，只做决策

### 5.2 核心方法

```python
class PlannerAgent(BaseAgent):
    
    async def create_plan(self, message: Message) -> AsyncGenerator[BaseEvent, None]:
        """
        创建执行计划
        
        输入: 用户消息
        输出: PlanEvent (包含 Plan)
        """
        query = CREATE_PLAN_PROMPT.format(
            message=message.message,
            attachments="\n".join(message.attachments),
        )
        
        async for event in self.invoke(query):
            if isinstance(event, MessageEvent):
                parsed_obj = await self._json_parser.invoke(event.message)
                plan = Plan.model_validate(parsed_obj)
                yield PlanEvent(plan=plan, status=PlanEventStatus.CREATED)
            else:
                yield event
    
    async def update_plan(self, plan: Plan, step: Step) -> AsyncGenerator[BaseEvent, None]:
        """
        更新执行计划
        
        输入: 原计划 + 已完成的步骤
        输出: PlanEvent (包含更新后的 Plan)
        """
        query = UPDATE_PLAN_PROMPT.format(
            plan=plan.model_dump_json(),
            step=step.model_dump_json(),
        )
        
        async for event in self.invoke(query):
            if isinstance(event, MessageEvent):
                parsed_obj = await self._json_parser.invoke(event.message)
                updated_plan = Plan.model_validate(parsed_obj)
                # 合并历史步骤和新增步骤
                yield PlanEvent(plan=plan, status=PlanEventStatus.UPDATED)
            else:
                yield event
```

### 5.3 Plan 结构

```python
class Plan(BaseModel):
    id: str                           # 计划 ID
    title: str                        # 任务标题
    goal: str                         # 任务目标
    language: str                     # 工作语言
    steps: List[Step]                 # 步骤列表
    message: str                      # AI 初始消息
    status: ExecutionStatus           # 执行状态
    
    def get_next_step(self) -> Optional[Step]:
        """获取下一个待执行的步骤"""
        return next((step for step in self.steps if not step.done), None)

class Step(BaseModel):
    id: str                           # 步骤 ID
    description: str                  # 步骤描述
    status: ExecutionStatus           # 执行状态
    result: Optional[str]             # 执行结果
    error: Optional[str]              # 错误信息
    success: bool                     # 是否成功
    attachments: List[str]            # 附件列表
```

---

## 六、ReActAgent 设计

### 6.1 核心特点

```python
class ReActAgent(BaseAgent):
    name: str = "react"
    _system_prompt: str = SYSTEM_PROMPT + REACT_SYSTEM_PROMPT
    _format: str = "json_object"      # JSON 输出
    # 注意：不设置 _tool_choice，允许调用工具
```

**关键设计**：
- 可以调用所有工具
- 输出 JSON 格式的结构化结果

### 6.2 核心方法

```python
class ReActAgent(BaseAgent):
    
    async def execute_step(self, plan: Plan, step: Step, message: Message) -> AsyncGenerator[BaseEvent, None]:
        """
        执行单个步骤
        
        输入: 计划 + 步骤 + 用户消息
        输出: StepEvent + ToolEvent + MessageEvent
        """
        query = EXECUTION_PROMPT.format(
            message=message.message,
            attachments="\n".join(message.attachments),
            language=plan.language,
            step=step.description,
        )
        
        step.status = ExecutionStatus.RUNNING
        yield StepEvent(step=step, status=StepEventStatus.STARTED)
        
        async for event in self.invoke(query):
            if isinstance(event, ToolEvent):
                # 处理 message_ask_user 特殊情况
                if event.function_name == "message_ask_user":
                    if event.status == ToolEventStatus.CALLING:
                        yield MessageEvent(message=event.function_args.get("text"))
                    elif event.status == ToolEventStatus.CALLED:
                        yield WaitEvent()
                        return
                yield event
            elif isinstance(event, MessageEvent):
                # 步骤执行完成
                step.status = ExecutionStatus.COMPLETED
                parsed_obj = await self._json_parser.invoke(event.message)
                new_step = Step.model_validate(parsed_obj)
                step.success = new_step.success
                step.result = new_step.result
                step.attachments = new_step.attachments
                yield StepEvent(step=step, status=StepEventStatus.COMPLETED)
            else:
                yield event
    
    async def summarize(self) -> AsyncGenerator[BaseEvent, None]:
        """
        汇总所有步骤结果
        
        输出: 最终的 MessageEvent
        """
        async for event in self.invoke(SUMMARIZE_PROMPT):
            if isinstance(event, MessageEvent):
                parsed_obj = await self._json_parser.invoke(event.message)
                message = Message.model_validate(parsed_obj)
                yield MessageEvent(
                    role="assistant",
                    message=message.message,
                    attachments=[File(filepath=fp) for fp in message.attachments],
                )
            else:
                yield event
```

---

## 七、记忆管理

### 7.1 记忆结构

```python
class Memory(BaseModel):
    messages: List[Dict[str, Any]] = []
    
    def add_message(self, message: Dict[str, Any]):
        """添加单条消息"""
        self.messages.append(message)
    
    def add_messages(self, messages: List[Dict[str, Any]]):
        """添加多条消息"""
        self.messages.extend(messages)
    
    def get_messages(self) -> List[Dict[str, Any]]:
        """获取所有消息"""
        return self.messages
    
    def get_last_message(self) -> Optional[Dict[str, Any]]:
        """获取最后一条消息"""
        return self.messages[-1] if len(self.messages) > 0 else None
    
    def roll_back(self):
        """回滚最后一条消息"""
        self.messages = self.messages[:-1]
    
    def compact(self):
        """压缩记忆"""
        for message in self.messages:
            # 压缩浏览器工具的大体积结果
            if message.get("function_name") in ["browser_view", "browser_navigate"]:
                message["content"] = "(removed)"
            # 移除思考过程
            if "reasoning_content" in message:
                del message["reasoning_content"]
```

### 7.2 记忆流程

```
┌─────────────────────────────────────────────────────────────┐
│                      记忆管理流程                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 初始化                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ messages = [                                         │   │
│  │   {"role": "system", "content": "系统提示词..."}      │   │
│  │ ]                                                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  2. 用户消息                                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ messages.append({                                    │   │
│  │   "role": "user",                                    │   │
│  │   "content": "帮我搜索 Python 教程"                   │   │
│  │ })                                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  3. AI 响应（带工具调用）                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ messages.append({                                    │   │
│  │   "role": "assistant",                               │   │
│  │   "content": null,                                   │   │
│  │   "tool_calls": [{                                   │   │
│  │     "id": "call_xxx",                                │   │
│  │     "function": {                                    │   │
│  │       "name": "search",                              │   │
│  │       "arguments": '{"query": "Python 教程"}'        │   │
│  │     }                                                │   │
│  │   }]                                                 │   │
│  │ })                                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  4. 工具结果                                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ messages.append({                                    │   │
│  │   "role": "tool",                                    │   │
│  │   "tool_call_id": "call_xxx",                        │   │
│  │   "content": "搜索结果..."                            │   │
│  │ })                                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  5. AI 最终回复                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ messages.append({                                    │   │
│  │   "role": "assistant",                               │   │
│  │   "content": "我找到了以下 Python 教程..."            │   │
│  │ })                                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 记忆压缩

```python
def compact(self):
    """
    记忆压缩策略：
    
    1. 浏览器工具结果（体积大）
       browser_view, browser_navigate → "(removed)"
    
    2. 思考过程（DeepSeek 的 reasoning_content）
       reasoning_content → 删除
    
    目的：减少 token 消耗，降低成本
    """
    for message in self.messages:
        if message.get("role") == "tool":
            if message.get("function_name") in ["browser_view", "browser_navigate"]:
                message["content"] = "(removed)"
        
        if "reasoning_content" in message:
            del message["reasoning_content"]
```

---

## 八、错误处理与重试

### 8.1 LLM 调用重试

```python
async def _invoke_llm(self, messages: List[Dict]) -> Dict:
    error = "调用语言模型发生错误"
    
    for _ in range(self._agent_config.max_retries):
        try:
            message = await self._llm.invoke(...)
            
            # 处理空回复
            if not message.get("content") and not message.get("tool_calls"):
                await self._add_to_memory([
                    {"role": "assistant", "content": ""},
                    {"role": "user", "content": "AI无响应，请继续。"}
                ])
                await asyncio.sleep(self._retry_interval)
                continue
            
            return message
            
        except Exception as e:
            error = str(e)
            await asyncio.sleep(self._retry_interval)
    
    raise RuntimeError(f"达到最大重试次数: {error}")
```

### 8.2 工具调用重试

```python
async def _invoke_tool(self, tool: BaseTool, name: str, args: Dict) -> ToolResult:
    err = ""
    
    for _ in range(self._agent_config.max_retries):
        try:
            return await tool.invoke(name, **args)
        except Exception as e:
            err = str(e)
            await asyncio.sleep(self._retry_interval)
    
    # 重试失败，返回错误结果让 LLM 处理
    return ToolResult(success=False, message=err)
```

### 8.3 迭代次数限制

```python
async def invoke(self, query: str) -> AsyncGenerator[BaseEvent, None]:
    message = await self._invoke_llm([{"role": "user", "content": query}])
    
    for _ in range(self._agent_config.max_iterations):
        if not message.get("tool_calls"):
            break
        
        # ... 执行工具调用
        
        message = await self._invoke_llm(tool_messages)
    else:
        # 超过最大迭代次数
        yield ErrorEvent(error=f"超过最大迭代次数: {self._agent_config.max_iterations}")
    
    yield MessageEvent(message=message["content"])
```

---

## 九、总结

### 9.1 核心设计要点

| 设计要点 | 说明 |
|---------|------|
| **职责分离** | Planner 负责规划，ReAct 负责执行 |
| **ReAct 模式** | 思考→行动→观察→循环 |
| **事件驱动** | 所有状态变化通过事件通知 |
| **记忆管理** | 支持压缩、回滚、持久化 |
| **容错设计** | 多层重试、优雅降级 |

### 9.2 关键代码位置

| 模块 | 文件路径 |
|-----|---------|
| Agent 基类 | `api/app/domain/services/agents/base.py` |
| PlannerAgent | `api/app/domain/services/agents/planner.py` |
| ReActAgent | `api/app/domain/services/agents/react.py` |
| 工作流 | `api/app/domain/services/flows/planner_react.py` |
| 记忆模型 | `api/app/domain/models/memory.py` |
| 事件模型 | `api/app/domain/models/event.py` |

---

## 十、下一步

- 🛠️ 学习工具系统：[第6章 工具系统](./06-工具系统.md)
- 🔌 学习 MCP 协议：[第7章 MCP协议](./07-MCP协议.md)

---

**上一章**：[架构设计](./04-架构设计.md) | **下一章**：[工具系统](./06-工具系统.md)
