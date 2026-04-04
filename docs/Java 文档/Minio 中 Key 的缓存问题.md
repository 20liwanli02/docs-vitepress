# MinIO 中 Key 的缓存设计问题

## 一、MinIO 的缓存定位

在系统架构中，MinIO 属于**基础设施层服务（Infrastructure Service）**，主要负责对象存储能力，对上层业务模块（如 user、order、content 等）提供统一访问接口。

因此：

> **MinIO 相关缓存属于“资源级缓存”，而非“业务级缓存”**



## 二、使用统一缓存 Key 的必要性

### ❌ 错误做法：使用业务化 RedisKeyBuilder

如果使用类似 RedisKeyBuilder 的方式构建 Key：

```text
user:minio:a.png
order:minio:a.png
```

会导致以下问题：

### 1️⃣ 重复缓存（数据冗余）

同一资源 `a.png` 被存储多份：

```text
user:minio:a.png
order:minio:a.png
```

Redis 无法感知它们是同一资源。



### 2️⃣ 重复 RPC 调用

不同模块访问时：

- user 模块缓存 miss → 调用 MinIO → 写入缓存
- order 模块缓存 miss → 再次调用 MinIO → 再写入缓存

👉 导致**不必要的远程调用开销**



### 3️⃣ 缓存命中率下降

由于 Key 不统一：

👉 各模块缓存相互隔离，无法复用



## ✅ 正确做法：去业务化 Key 设计

应统一使用资源级 Key，例如：

```text
minio:presigned:a.png
```

特点：

- 与业务模块解耦
- 全局唯一
- 多模块共享缓存

👉 从而实现：

- 减少重复调用
- 提高缓存命中率
- 降低 Redis 存储成本



## 三、expireSecond 对缓存设计的影响

MinIO 预签名 URL 与过期时间强相关：

> **不同 expireSecond 会生成不同的 URL**



### ❌ 情况一：Key 不包含 expireSecond

```text
key = minio:presigned:a.png
```

#### 问题：

```text
第一次请求：expire = 60 → 缓存 URL_A（1分钟）
第二次请求：expire = 300 → 命中缓存 → 返回 URL_A ❌
```

👉 导致：

- 返回的 URL 过期时间错误
- 破坏接口语义一致性



### ✅ 情况二：Key 包含 expireSecond（推荐）

```text
key = minio:presigned:a.png:60
key = minio:presigned:a.png:300
```

#### 优点：

- 不同过期时间 → 对应不同缓存
- 保证 URL 语义正确
- 避免错误复用



### ⚠️ 引入的新问题：Key 膨胀

如果 expireSecond 取值不受控：

```text
a.png:60
a.png:61
a.png:62
...
```

👉 会导致：

- Key 数量爆炸
- Redis 内存压力增大
- 缓存命中率下降



## 四、优化策略（关键）

### ✅ 方案一：规范 expireSecond（推荐）

限制为固定值集合：

```text
60 / 300 / 600
```

👉 优点：

- 控制 Key 数量
- 提高复用率
- 易于维护



### ✅ 方案二：统一过期时间

系统内部约定：

```text
统一使用 300 秒
```

👉 适用于对时效要求不敏感的场景



### ✅ 方案三：合理设置 Redis TTL

Redis Key 的过期时间建议：

```text
TTL <= expireSecond
```

避免缓存返回“即将过期”的 URL。



## 五、总结

### 核心原则

1. **MinIO 缓存是资源级缓存，必须去业务化**
2. **缓存 Key 应只与 objectName（及必要参数）相关**
3. **expireSecond 决定 URL 版本，必须纳入 Key 设计**



### 一句话总结

> **同一 objectName 必须共享缓存，不同 expireSecond 必须区分缓存，同时通过规范参数避免 Key 膨胀**



如果你后面要写到项目亮点或面试，我可以帮你再压缩成一段**“面试标准答案版”**，会更有杀伤力。