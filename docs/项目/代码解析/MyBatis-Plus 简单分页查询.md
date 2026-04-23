# queryInPage 分析

## 一、原始代码

```java
@Override
public PageResponseDTO<NoteRespDTO> queryInPage(NotePageReqDTO notePageReqDTO) {
    // 1.查询数据
    LambdaQueryWrapper<NotePO> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(NotePO::getStatus, NoteStatusEnum.PUBLISHED.getCode());
    queryWrapper.eq(notePageReqDTO.getUserId() != null, NotePO::getUserId, notePageReqDTO.getUserId());
    queryWrapper.orderByDesc(NotePO::getCreateTime);
    IPage<NotePO> notePageResp = this.getBaseMapper().selectPage(new Page<>(notePageReqDTO.getPage(), notePageReqDTO.getPageSize()), queryWrapper);
    if (notePageResp.getRecords().isEmpty()) {
        return PageResponseDTO.emptyPage();
    }
    PageResponseDTO<NoteRespDTO> pageResponseDTO = new PageResponseDTO<>();
    pageResponseDTO.setDataList(BeanCopyUtils.convertList(notePageResp.getRecords(), NoteRespDTO.class));
    pageResponseDTO.setPage(notePageReqDTO.getPage());
    pageResponseDTO.setSize(notePageReqDTO.getPageSize());
    pageResponseDTO.setHasNext(notePageResp.getTotal() > (notePageResp.getPages() * notePageResp.getSize()));
    return pageResponseDTO;
}
```

## 二、代码解析

```java
@Override
public PageResponseDTO<NoteRespDTO> queryInPage(NotePageReqDTO notePageReqDTO) {
    
    // ══════════════════════════════════════════════════════════
    // 第1步：构建查询条件
    // ══════════════════════════════════════════════════════════
    LambdaQueryWrapper<NotePO> queryWrapper = new LambdaQueryWrapper<>();
    
    // 条件1: 只查"已发布"状态的笔记
    queryWrapper.eq(NotePO::getStatus, NoteStatusEnum.PUBLISHED.getCode());
    
    // 条件2: 如果传了 userId，则按用户过滤（动态条件）
    queryWrapper.eq(
        notePageReqDTO.getUserId() != null,   // ← 条件为 true 时才拼接 SQL
        NotePO::getUserId, 
        notePageReqDTO.getUserId()
    );
    
    // 排序: 按创建时间倒序（最新的在前）
    queryWrapper.orderByDesc(NotePO::getCreateTime);
```

### 动态条件解释

```java
queryWrapper.eq(条件是否成立, 字段名, 值);
```

| userId 值     | 生成的 SQL                                                   |
| ------------- | ------------------------------------------------------------ |
| **不为 null** | `WHERE user_id = ? AND status = ? ORDER BY create_time DESC` |
| **为 null**   | `WHERE status = ? ORDER BY create_time DESC`                 |

```java
// ══════════════════════════════════════════════════════════
// 第2步：执行分页查询
// ══════════════════════════════════════════════════════════
IPage<NotePO> notePageResp = this.getBaseMapper().selectPage(
    new Page<>(notePageReqDTO.getPage(), notePageReqDTO.getPageSize()), 
    queryWrapper
);
```

MyBatis-Plus 会自动处理：
- `LIMIT offset, size`
- 总数统计 `SELECT COUNT(*)`

```java
// ══════════════════════════════════════════════════════════
// 第3步：空结果处理
// ══════════════════════════════════════════════════════════
if (notePageResp.getRecords().isEmpty()) {
    return PageResponseDTO.emptyPage();  // 返回空页面对象
}
```

```java
// ══════════════════════════════════════════════════════════
// 第4步：组装返回结果
// ══════════════════════════════════════════════════════════
PageResponseDTO<NoteRespDTO> pageResponseDTO = new PageResponseDTO<>();

// PO → DTO 转换（数据对象 → 响应对象）
pageResponseDTO.setDataList(
    BeanCopyUtils.convertList(notePageResp.getRecords(), NoteRespDTO.class)
);

pageResponseDTO.setPage(notePageReqDTO.getPage());       // 当前页码
pageResponseDTO.setSize(notePageReqDTO.getPageSize());    // 每页大小

// 判断是否有下一页
pageResponseDTO.setHasNext(
    notePageResp.getTotal() > (notePageResp.getPages() * notePageResp.getSize())
);

return pageResponseDTO;
}
```

## 心概念说明

### 1. 为什么用 PO 和 DTO 分离？

```
┌─────────────────┐         ┌─────────────────┐
│   NotePO        │   →     │  NoteRespDTO    │
│   (数据库实体)   │  转换    │  (响应对象)      │
├─────────────────┤         ├─────────────────┤
│ - id            │         │ - id            │
│ - user_id       │         │ - userName      │ ← 可能关联查询
│ - content       │         │ - content       │
│ - status(数字)  │         │ - statusText    │ ← 数字→文字
│ - create_time   │         │ - createTimeStr │ ← 格式化日期
│ - is_deleted    │         │                 │  ← 过滤敏感字段
└─────────────────┘         └─────────────────┘

好处：
✅ 隐藏数据库字段结构
✅ 敏感字段不暴露（如 deleted）
✅ 可以做数据格式化/转换
✅ 解耦：改表结构不影响接口
```

### 2. hasNext 的计算逻辑

```java
pageResponseDTO.setHasNext(
    notePageResp.getTotal() > (notePageResp.getPages() * notePageResp.getSize())
);
```

**举例说明：**

| 场景                    | total | pages | size | 计算        | hasNext |
| ----------------------- | ----- | ----- | ---- | ----------- | ------- |
| 共100条，每10页，第9页  | 100   | 9     | 10   | 100 > 90 ✅  | true    |
| 共100条，每10页，第10页 | 100   | 10    | 10   | 100 > 100 ❌ | false   |
| 共95条，每10页，第9页   | 95    | 9     | 10   | 95 > 90 ✅   | true    |
| 共95条，每10页，第10页  | 95    | 10    | 10   | 95 > 100 ❌  | false   |

**作用：前端根据此字段决定是否显示"加载更多"按钮**

---

## 五、调用示例

```javascript
// 前端调用
GET /api/note/page?page=1&pageSize=10&userId=123

// 后端执行过程：
// 1. 查询条件: status='PUBLISHED' AND user_id=123 ORDER BY create_time DESC LIMIT 0,10
// 2. 查询到 8 条数据
// 3. 转换成 DTO 返回

{
    "code": 200,
    "data": {
        "dataList": [
            { "id": 1, "title": "笔记1", ... },
            { "id": 2, "title": "笔记2", ... },
            // ...共8条
        ],
        "page": 1,
        "size": 10,
        "hasNext": false
    }
}
```

---

## 六、潜在优化建议

| 方面        | 当前实现   | 可优化点                                    |
| ----------- | ---------- | ------------------------------------------- |
| **缓存**    | 每次都查DB | 热门笔记可加 Redis 缓存                     |
| **hasNext** | 手动计算   | MyBatis-Plus 的 IPage 已有 `hasNext()` 方法 |
| **排序**    | 固定按时间 | 支持多种排序方式（热度/评论数）             |
| **权限**    | 无校验     | 应检查是否有权查看该用户的笔记              |
