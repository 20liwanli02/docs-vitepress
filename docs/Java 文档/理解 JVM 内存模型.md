# 理解 JVM 内存模型

## 一、JVM 基础概念

![](https://cdn.nlark.com/yuque/0/2026/png/45503748/1774946667116-5eed77c0-b31a-4d4b-bcf4-c36139ee1493.png)

### 虚拟机各个部件简单介绍
1. **堆**：存放对象
2. **方法区**：用于存储类元数据、运行时常量池、静态变量以及JIT编译后的代码，属于线程共享的内存区域。它与堆类似，但专注于类级别的信息存储。
3. **栈**：成员变量、方法存放的地方
4. **本地方法栈**：底层调用 C++ 时用到，如 start0 方法可能会存储于这里
5. **程序计数器**：记录线程执行的代码行数，main 方法调用其他方法结束后，可以继续执行下面的内容

### 实际代码案例
```java
public class Math {

    public int compute() {
        int a = 1;
        int b = 2;
        int c = (a + b) * 10;
        return c;
    }
    
    public static void main(String[] args) {
        Math math = new Math();
        math.compute();
        System.out.println("exe is over......");
    }
}
```

![](https://cdn.nlark.com/yuque/0/2026/png/45503748/1774948118463-16173b07-184b-4ba0-a8c9-b016f175a860.png)

**详解 compute 方法**

isconst_1 操作码为 isconst 操作数为 1，将 int 类型常量 1 压入操作数栈，

istore_1 将 int 类型值存入局部变量 1，如 a = 1，

iload_1 从局部变量 1 中装载 int 类型变量值，

iadd 相加，

bipush 10 放入 10 进操作数栈，

imul 相乘，

ireturn 返回结果给调用方【先赋给 c 再返回】

**查看字节码工具**

| **工具名** |  |
| --- | --- |
| notepad | 记事本 |
| jclasslib | idea 插件 |

**字节码手册**

JVM 官网

## 二、堆

### 堆的结构
堆中老年代 2/3，年轻代（8:1:1 => s0，s1） 1/3

### 年轻代 GC 流程
创建的对象首先进入 Eden，当 Eden 不足以分配空间给新对象时也就是 100% 时触发 Minor GC 清理年轻代中失去引用的垃圾对象，如果对象引用存在则放入 <font style="color:rgba(0, 0, 0, 0.9);">Survivor</font> 中，如果对象过大则直接进入老年代（Survivor 分配更大的空间，当然如果空间过大清理一次过久也可以分块 GC 清理），但是 <font style="color:rgba(0, 0, 0, 0.9);">Survivor 区不会触发 GC，即使 Survivor 区满了，也不会触发 Minor GC，但 Survivivor 区满或者年龄超限（默认>=15）会导致对象直接进入老年代（空间分配担保机制：</font><font style="color:rgba(0, 0, 0, 0.9);">Minor GC 前检查老年代剩余空间是否足够容纳晋升对象，不够则先触发 Full GC</font><font style="color:rgba(0, 0, 0, 0.9);">）</font>

> **注意：对象在 GC 时会在 Survivor 的 S0 和 S1 之间来回传递（复制），每次赋值都会使年龄 + 1，S0和S1始终有一个为空**
> 
> 牺牲：一个 Survivor 区的空间（永远空闲）  
> 换取：高效的内存回收和分配速度（算法）

### <font style="color:rgba(0, 0, 0, 0.9);">复制算法（待）</font>
1. **<font style="color:rgba(0, 0, 0, 0.9);">没有内存碎片</font>**<font style="color:rgba(0, 0, 0, 0.9);">：对象整齐排列在 Survivor 一端</font>
2. **<font style="color:rgba(0, 0, 0, 0.9);">快速分配</font>**<font style="color:rgba(0, 0, 0, 0.9);">：指针碰撞（Bump the Pointer）方式分配新对象</font>
3. **<font style="color:rgba(0, 0, 0, 0.9);">高效回收</font>**<font style="color:rgba(0, 0, 0, 0.9);">：新生代 90%+ 对象都是朝生夕死，复制少量存活对象即可</font>

......

### 进入老年代的条件
| 条件 | 说明 |
| --- | --- |
| **年龄达到阈值** | 默认 `-XX:MaxTenuringThreshold=15`，复制15次后进入老年代 |
| **Survivor 空间不足** | 如果 To Survivor 放不下，直接进入老年代 |
| **动态年龄判断** | 如果 Survivor 中相同年龄对象总大小超过 Survivor 一半，大于等于该年龄的对象直接晋升 |


### <font style="color:rgba(0, 0, 0, 0.9);">老年代 GC 流程</font>
<font style="color:rgba(0, 0, 0, 0.9);">空间使用超过阈值（默认约 92%），由 </font>`<font style="color:rgba(0, 0, 0, 0.9);background-color:rgba(0, 0, 0, 0.03);">-XX:CMSInitiatingOccupancyFraction</font>`<font style="color:rgba(0, 0, 0, 0.9);">等参数控制，就会触发 Full  GC（也可以强制调用等），清理的范围为整个堆 + 元空间，会有较长的 STW 时间</font>

💡 **什么是 STW 机制**

发生 GC 时，无论是 Minor GC 还是 Full GC，都会将用户线程暂停挂起，，但是 Minor GC 约**<font style="color:rgba(0, 0, 0, 0.9);">几毫秒~几十毫秒，</font>**<font style="color:rgba(0, 0, 0, 0.9);">而Full GC却要</font>**<font style="color:rgba(0, 0, 0, 0.9);">几百毫秒~几秒</font>**，降低了用户的体验，所以 JVM 调优主要处理的问题是减少 STW 的触发！

### Full GC 收集器情况（待）
| 收集器 | Full GC 算法 | 特点 |
| --- | --- | --- |
| **Serial Old** | 标记-整理 | 单线程，STW 时间长，简单高效 |
| **Parallel Old** | 标记-整理 | 多线程并行，吞吐量优先 |
| **CMS** | 标记-清除（退化 Serial Old） | 并发失败时用 Serial Old，碎片多 |
| **G1** | 标记-整理（混合收集） | 分 Region 回收，整理碎片，可控停顿 |
| **ZGC/Shenandoah** | 并发标记-整理 | 几乎无 STW，低延迟 |


## 三、监控工具（待）
### <font style="color:rgb(24, 24, 24);">jvisualvm</font>
JDK 自带的监控工具

### Arthas
<font style="color:rgba(0, 0, 0, 0.9);">Arthas 是阿里巴巴开源的 Java 诊断神器，无需重启、无需改代码，实时诊断线上问题。</font>

<font style="color:rgba(0, 0, 0, 0.9);">特别情况可以直接修改源代码的值</font>

**快速启动**

```bash
# 1. 下载
curl -O https://arthas.aliyun.com/arthas-boot.jar

# 2. 启动（自动列出 Java 进程，选择要 attach 的进程）
java -jar arthas-boot.jar

# 3. 或者指定 PID
java -jar arthas-boot.jar <pid>
```

**核心基础命令**

1. 基础信息查看

| 命令 | 作用 | 示例 |
| --- | --- | --- |
| `dashboard` | **系统实时面板**（线程、内存、GC、运行时） | 按 `q` 退出 |
| `thread` | 线程信息 | `thread -n 3` 查看 CPU 占用前3的线程 |
| `jvm` | JVM 详细信息 | 显示 GC 算法、内存区域、启动参数 |
| `sysprop` | 系统属性 | `sysprop java.version` |
| `sysenv` | 环境变量 | `sysenv PATH` |


```bash
# 查看最忙的3个线程
thread -n 3

# 查看线程状态统计
thread --state

# 查看指定线程堆栈
thread <tid>
```

2. 类与类加载器

| 命令 | 作用 | 示例 |
| --- | --- | --- |
| `sc` | **Search Class** 查找类 | `sc *UserService*` |
| `sm` | **Search Method** 查找方法 | `sm com.example.Service` |
| `jad` | **反编译源码** | `jad com.example.Service` |
| `classloader` | 查看类加载器统计 | `classloader -t` 树状结构 |


```bash
# 模糊搜索类
sc *Controller*

# 反编译线上代码（查看实际运行的逻辑）
jad com.example.OrderService

# 查看类加载器层次
classloader -t
```

3. 方法监控与追踪（最常用）

| 命令 | 作用 | 场景 |
| --- | --- | --- |
| `watch` | **观察方法入参和返回值** | 查看 `getOrder` 收到了什么参数 |
| `trace` | **方法内部调用路径和耗时** | 定位 `saveOrder` 哪里慢 |
| `stack` | **方法调用栈** | 谁调用了 `deleteUser` |
| `tt` | **Time Tunnel 方法执行时空隧道** | 录制调用，稍后重放 |


```bash
# 观察方法入参和返回值
watch com.example.Service getOrder '{params,returnObj}' -x 2

# 追踪方法耗时（看哪行代码慢）
trace com.example.Service saveOrder '#cost>100' -n 5

# 查看方法调用栈
stack com.example.Service deleteUser

# 录制方法调用（可重放、可查看详细入参）
tt -t com.example.Service getOrder
```

4. 内存与对象

| 命令 | 作用 | 示例 |
| --- | --- | --- |
| `heapdump` | **生成堆内存快照**（类似 jmap） | `heapdump /tmp/dump.hprof` |
| `vmtool` | 强制 GC、获取实例 | `vmtool --action forceGc` |
| `ognl` | 执行 OGNL 表达式 | 获取静态字段、调用方法 |


```bash
# 强制触发 GC
vmtool --action forceGc

# 获取 Spring Context 中的 Bean
ognl '@com.example.SpringContext@getBean("userService")'

# 查看某个静态字段的值
ognl '@com.example.Config@MAX_SIZE'
```

5. 线上热修复

| 命令 | 作用 |
| --- | --- |
| `redefine` | **热更新类**（替换线上代码，不重启） |
| `retransform` | 结合 Java Agent 转换类 |


```bash
# 热更新（先本地改好代码编译出 .class）
redefine /tmp/com/example/FixedService.class
```

**典型实战场景**

场景1：接口响应慢，定位热点方法

```bash
# 1. 找到 CPU 高的线程
thread -n 3

# 2. 追踪该线程执行的方法耗时
trace com.example.ApiController handleRequest '#cost>500' -n 10

# 3. 发现是 queryDatabase 慢，再深入
trace com.example.Dao queryDatabase '#cost>200' -n 10
```

场景2：线上异常，查看方法入参

```bash
# 查看方法入参，定位异常数据
watch com.example.Service processOrder '{params,throwExp}' -e -x 2

# -e 表示异常时触发，-x 2 表示展开层级
```

场景3：内存泄漏，分析大对象

```bash
# 1. 生成堆 dump
heapdump /tmp/leak.hprof

# 2. 用 MAT 工具分析，或用 Arthas 简单查看
vmtool --action getInstances --className com.example.User --limit 10
```

**常用组合命令速查**

| 问题 | 命令组合 |
| --- | --- |
| CPU 飙高 | `thread -n 3` → `trace` 热点方法 |
| 接口超时 | `trace` 看耗时分布 → `watch` 看入参 |
| 内存溢出 | `heapdump` → MAT 分析 |
| 代码逻辑疑问 | `jad` 反编译确认 |
| 热修复 Bug | `redefine` 替换 class |


**退出 Arthas**

```bash
# 退出当前 session（应用继续运行）
quit 或 q

# 完全关闭 Arthas 服务端（慎用）
stop
```
