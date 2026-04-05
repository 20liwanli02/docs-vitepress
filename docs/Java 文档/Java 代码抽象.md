# Java 代码抽象

## 一、判断标准

| 层级     | 判断依据                                               | 依赖方向                 | 复用范围         |
| -------- | ------------------------------------------------------ | ------------------------ | ---------------- |
| **上层** | 与 Web/框架强绑定，依赖 Servlet、AOP、注解等           | 依赖中层和下层           | 仅限 Web 应用    |
| **中层** | 纯业务逻辑/通用工具，不依赖 Web 层，可独立运行         | 只依赖下层（JDK/三方库） | 任意 Java 应用   |
| **下层** | 与具体技术栈绑定（数据库、缓存、MQ），但封装成公共组件 | 只依赖 JDK/中间件 SDK    | 同类技术栈的应用 |

**核心原则**：

- **上层**：涉及 HTTP、Servlet、Spring MVC、AOP 等 **Web 应用层相关逻辑**
- **中层**：**纯 Java 逻辑**，不感知 Web 环境
- **下层**：涉及数据库、Redis、MQ 等**基础设施**，但通过接口暴露，上层不关心具体实现

## 二、具体例子

### 1. 上层（Web 入口层）——什么时候用？

**场景**：需要对所有 Web 请求做统一处理，且逻辑与 HTTP/Servlet 强相关。

**例子：统一日志切面**

```java
@Aspect
@Component
public class WebLogAspect {
    
    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        // 获取 HttpServletRequest（依赖 Servlet API）
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        
        log.info("请求URL: {}", request.getRequestURL());
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        log.info("耗时: {}ms", System.currentTimeMillis() - start);
        return result;
    }
}
```

**为什么放上层？**

- 强依赖 `HttpServletRequest`、`@Aspect`、Spring Web 上下文
- 脱离 Web 容器无法运行
- 如果放到中层，会导致中层污染 Web 层依赖

### 2. 中层（逻辑代码层）——什么时候用？

**场景**：纯工具类、业务算法、数据校验等，不依赖任何 Web 框架。

**例子：通用校验工具类**

```java
public class ValidationUtils {
    
    // 手机号校验 - 纯正则，不依赖任何框架
    public static boolean isMobile(String phone) {
        return phone != null && phone.matches("^1[3-9]\\d{9}$");
    }
    
    // 参数校验 - 可被任意层调用
    public static <T> void requireNonNull(T obj, String message) {
        if (obj == null) {
            throw new IllegalArgumentException(message);
        }
    }
}
```

**为什么放中层？**

- 纯 Java 逻辑，无任何框架依赖
- 可被上层、下层、其他模块复用
- 单元测试简单，不依赖 Spring 容器

### 3. 下层（基础设施层）——什么时候用？

**场景**：封装 Redis、数据库、MQ 等中间件操作，提供统一 API。

**例子：Redis 公共组件**

```java
@Component
public class RedisClient {
    
    @Autowired
    private StringRedisTemplate redisTemplate;  // 依赖 Redis
    
    // 封装带过期时间的缓存获取逻辑
    public <T> T getWithCache(String key, int expireSeconds, Supplier<T> supplier) {
        String value = redisTemplate.opsForValue().get(key);
        if (value != null) {
            return JSON.parseObject(value, (Class<T>) supplier.get().getClass());
        }
        T result = supplier.get();
        redisTemplate.opsForValue().set(key, JSON.toJSONString(result), expireSeconds, TimeUnit.SECONDS);
        return result;
    }
}
```

**为什么放下层？**

- 封装 Redis 技术细节，但暴露通用方法
- 上层调用时不关心底层是 Redis 还是其他缓存
- 可被多个上层模块复用

## 四、决策流程图

```plain
这个逻辑是否依赖 Servlet/Spring MVC/AOP？
    ├─ 是 → 上层（Web 入口层）
    └─ 否 → 这个逻辑是否依赖数据库/Redis/MQ？
                ├─ 是 → 下层（基础设施层）
                └─ 否 → 中层（逻辑代码层）
```

## 五、一个完整的三层配合例子

**场景**：用户登录接口，需要校验验证码、生成 Token、缓存登录信息。

| 层级     | 组件                              | 职责                                         |
| -------- | --------------------------------- | -------------------------------------------- |
| **上层** | `LoginController` + `@Valid` 切面 | 接收 HTTP 请求，参数校验切面统一处理校验异常 |
| **中层** | `VerificationCodeValidator`       | 纯逻辑：验证码校验算法（不依赖 Web）         |
| **下层** | `RedisClient`                     | 封装 Redis 操作，存储/获取验证码、Token      |

**代码示意**：

```java
// 下层：Redis 组件
@Component
public class RedisClient {
    public void set(String key, String value, int expireSeconds) { ... }
    public String get(String key) { ... }
}

// 中层：验证码校验（纯逻辑）
public class VerificationCodeValidator {
    public static boolean validate(String inputCode, String storedCode) {
        return storedCode != null && storedCode.equals(inputCode);
    }
}

// 上层：Controller
@RestController
public class LoginController {
    @Autowired
    private RedisClient redisClient;
    
    @PostMapping("/login")
    public Result login(@RequestBody LoginRequest request) {
        String storedCode = redisClient.get("code:" + request.getPhone());
        if (!VerificationCodeValidator.validate(request.getCode(), storedCode)) {
            return Result.error("验证码错误");
        }
        // 登录逻辑...
    }
}
```

## 六、抽象方案

- 公共方法：function
- 类：工具类，common，core
- 公共模块：脚手架