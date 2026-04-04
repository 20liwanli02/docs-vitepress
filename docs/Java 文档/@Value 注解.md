# 📚 @Value 注解

### 一、基本概念

`@Value` 是 Spring 提供的**字段级注入注解**，用于将外部配置值注入到 Bean 的字段、方法参数或构造函数中。

```java
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Value {
    String value();  // 核心属性：表达式字符串
}
```

---

### 二、注入方式对比

| 注入目标               | 语法示例                                           | 适用场景                 |
| ---------------------- | -------------------------------------------------- | ------------------------ |
| **字段注入**（最常用） | `@Value("${xxx}") private String name;`            | 简单配置读取             |
| **Setter 方法注入**    | `@Value("${xxx}") public void setXxx(String v)`    | 需要额外处理逻辑         |
| **构造器参数注入**     | `public X(@Value("${xxx}") String name)`           | 强制依赖，推荐用于必配项 |
| **方法参数注入**       | `public void method(@Value("${xxx}") String name)` | 特定方法需要配置值       |

---

### 三、核心语法详解

#### 1. 基本配置读取（`${}`）
```java
// 读取 application.yml / application.properties 中的配置
@Value("${server.port}")
private String port;  // "8080"

@Value("${spring.datasource.url}")
private String dbUrl;
```

#### 2. 默认值语法（`:`）
```java
// 配置不存在时使用默认值
@Value("${spring.application.name:my-app}")
private String appName;  // 未配置时 = "my-app"

@Value("${cache.ttl:3600}")
private int ttl;  // 未配置时 = 3600

// 空字符串默认值（注意冒号后无内容）
@Value("${spring.application.name:}")
private String appName;  // 未配置时 = ""（空字符串）
```

#### 3. SpEL 表达式（`#{}`）

```java
// 支持 Spring Expression Language
@Value("#{systemProperties['user.home']}")
private String userHome;  // 读取系统属性

@Value("#{T(java.lang.Math).random() * 100}")
private double randomNum;  // 计算随机数

@Value("#{${server.port} + 1}")  // 配置值运算
private int nextPort;

// 引用其他 Bean 的属性
@Value("#{otherBean.propertyName}")
private String otherValue;
```

#### 4. 混合使用
```java
// ${} 内嵌在 #{} 中
@Value("#{'${app.name}'.toUpperCase()}")
private String upperAppName;  // 配置值转大写

// 默认值 + SpEL
@Value("#{${cache.size:100} * 2}")
private int doubleCacheSize;  // 默认200
```

---

### 四、支持的类型转换

Spring 会自动将字符串配置转换为对应类型：

```java
@Value("${feature.enabled:true}")
private boolean enabled;      // → Boolean

@Value("${thread.pool.size:10}")
private int poolSize;         // → Integer

@Value("${timeout:30.5}")
private double timeout;       // → Double

@Value("${allowed.origins:*}")
private List<String> origins; // → List（逗号分隔）

@Value("${start.date:2024-01-01}")
private LocalDate startDate;  // → JSR-310 日期类型（需配置 Converter）
```

---

### 五、高级用法

#### 1. 读取 List / Map
```yaml
# application.yml
app:
  whitelist: user1,user2,user3
  settings: "{key1: 'value1', key2: 'value2'}"  # JSON 格式
```

```java
@Value("${app.whitelist}")
private List<String> whitelist;  // ["user1", "user2", "user3"]

@Value("#{${app.settings}}")
private Map<String, String> settings;  // 注意 #{} 包裹
```

#### 2. 读取环境变量
```java
@Value("${JAVA_HOME}")
private String javaHome;  // 系统环境变量

@Value("${USERNAME:${user.name}}")  // 环境变量 > 系统属性
private String currentUser;
```

#### 3. 条件注入（结合 @Conditional）
```java
@Value("${feature.x.enabled:false}")
private boolean featureXEnabled;

// 配合条件注解
@Bean
@ConditionalOnExpression("${feature.x.enabled:false}")
public FeatureXBean featureXBean() {
    return new FeatureXBean();
}
```

---

### 六、常见问题与陷阱

| 问题                           | 现象                                                      | 解决方案                                   |
| ------------------------------ | --------------------------------------------------------- | ------------------------------------------ |
| **配置不存在**                 | `IllegalArgumentException: Could not resolve placeholder` | 使用默认值 `:defaultValue`                 |
| **类型转换失败**               | `ConversionFailedException`                               | 确保配置格式与目标类型匹配                 |
| **静态字段注入**               | 注入失败，值为 null                                       | `@Value` 不支持 `static` 字段              |
| **在 `@PostConstruct` 中使用** | 值为 null                                                 | 注入在构造器之后执行，改用构造器注入       |
| **复杂 SpEL 报错**             | `SpelEvaluationException`                                 | 检查表达式语法，特别是 `#{}` 和 `${}` 嵌套 |

---

### 七、最佳实践

```java
@Component
public class AppConfig {
    
    // ✅ 推荐：构造器注入（Spring 4.3+ 可省略 @Autowired）
    private final String appName;
    private final int maxConnections;
    
    public AppConfig(
        @Value("${spring.application.name:unknown}") String appName,
        @Value("${db.max-connections:100}") int maxConnections
    ) {
        this.appName = appName;
        this.maxConnections = maxConnections;
    }
    
    // ✅ 或：字段注入 + 非空校验
    @Value("${api.key:}")
    private String apiKey;
    
    @PostConstruct
    public void validate() {
        if (apiKey.isEmpty()) {
            throw new IllegalStateException("api.key must be configured");
        }
    }
}
```

---

### 八、与 @ConfigurationProperties 对比

| 特性     | `@Value`               | `@ConfigurationProperties`                     |
| -------- | ---------------------- | ---------------------------------------------- |
| 适用场景 | 单个/少量配置          | 批量配置（配置类）                             |
| 类型安全 | 需手动转换             | 自动绑定，支持校验                             |
| 松散绑定 | 不支持（严格匹配 key） | 支持（驼峰-下划线-中划线）                     |
| IDE 提示 | 无                     | 有（配合 spring-boot-configuration-processor） |
| 复杂对象 | 困难                   | 原生支持嵌套对象                               |

**建议**：简单值用 `@Value`，复杂配置用 `@ConfigurationProperties`。

---

### 九、你的代码案例分析

```java
@Value("${spring.application.name:}")
public String application;
```

| 知识点 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| 语法   | `${key:default}` 读取配置，空字符串为默认值                  |
| 风险   | 未配置时 `application = ""`，可能导致 `buildKey()` 生成 `:pattern` 格式的 key |
| 改进   | 建议改为有意义的默认值如 `${spring.application.name:default-app}` |

---

掌握 `@Value` 是 Spring 开发的基础，重点理解 **`${}` 用于配置读取，`:用于默认值`，`#{} 用于 SpEL 表达式`** 这三个核心模式。