# queryByCommentId 分析

## 一、comment_replies 表分析

```sql
CREATE TABLE `t_comment_replies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `reply_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '回复id',
  `replied_id` bigint unsigned DEFAULT '0' COMMENT '被回复的回复id',
  `comment_id` bigint unsigned DEFAULT '0' COMMENT '被回复的评论id',
  `reply_content` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '回复内容',
  `user_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `status` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '回复状态',
  `is_deleted` bigint unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除（0未删除）',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_reply_id` (`reply_id`),
  KEY `ik_comment_id` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='评论回复表';
```

### 字段解释

`reply_id` ：本条记录的唯一 id

`replied_id` ：被回复的回复 id，二级评论的 id

`comment_id`： 被回复的评论 id，一级评论的 id，利用这个字段可以一次性查询出一级评论的回复评论

## 二、源代码分析

```java
// 根据评论 id 分页查询回复的评论集合
@Override
    public PageResponseDTO<CommentRepliesRespDTO> queryByCommentId(CommentRepliesReqDTO commentRepliesReqDTO) {
        // 根据 commentId 分页查询
        LambdaQueryWrapper<CommentRepliesPO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(CommentRepliesPO::getCommentId, commentRepliesReqDTO.getCommentId());
        queryWrapper.orderByDesc(CommentRepliesPO::getId);
        IPage<CommentRepliesPO> page = new Page<>(commentRepliesReqDTO.getPage(), commentRepliesReqDTO.getPageSize());
        // 数据库里有10条记录，我设置5条一页，每次只查5条
        IPage<CommentRepliesPO> commentRepliesPOIPage = this.getBaseMapper().selectPage(page, queryWrapper);
        // 如果为空直接返回空值 []
        if (commentRepliesPOIPage.getRecords().isEmpty()) {
            return PageResponseDTO.emptyPage();
        }
        List<CommentRepliesPO> commentRepliesPOList = commentRepliesPOIPage.getRecords();
        //被回复评论id集合
        List<Long> repliedIdList = commentRepliesPOList.stream().map(CommentRepliesPO::getRepliedId).toList();
		// 全表查询，查明直系上级评论是谁
        LambdaQueryWrapper<CommentRepliesPO> repliedQueryWrapper = new LambdaQueryWrapper<>();
        repliedQueryWrapper.in(CommentRepliesPO::getReplyId, repliedIdList);
        List<CommentRepliesPO> repliedList = this.getBaseMapper().selectList(repliedQueryWrapper);
        //被回复的评论集合
        Map<Long, CommentRepliesPO> commentRepliesPOMap = repliedList.stream().collect(Collectors.toMap(CommentRepliesPO::getReplyId, item -> item));
		// 封装数据
        List<CommentRepliesRespDTO> commentRepliesRespDTOList = new ArrayList<>();
        for (CommentRepliesPO commentRepliesPO : commentRepliesPOList) {
            CommentRepliesRespDTO commentRepliesRespDTO = BeanCopyUtils.convert(commentRepliesPO, CommentRepliesRespDTO.class);
            CommentRepliesPO repliedItem = commentRepliesPOMap.get(commentRepliesRespDTO.getRepliedId());
            // 如果不为空，表示这条评论有上级评论，将上级评论的内容取出来填入
            if (repliedItem != null) {
                commentRepliesRespDTO.setRepliedContent(repliedItem.getReplyContent());
            }
            commentRepliesRespDTOList.add(commentRepliesRespDTO);
        }
        PageResponseDTO<CommentRepliesRespDTO> pageResponseVO = new PageResponseDTO<>();
        pageResponseVO.setDataList(commentRepliesRespDTOList);
        pageResponseVO.setPage(commentRepliesReqDTO.getPage());
        pageResponseVO.setSize(commentRepliesReqDTO.getPageSize());
        pageResponseVO.setHasNext(commentRepliesPOIPage.getTotal() > commentRepliesReqDTO.getPageSize() * commentRepliesReqDTO.getPage());
        return pageResponseVO;
    }
```

### 具体案例

| 本条回复的 reply\_id | 本条回复的 replied\_id | 含义                             |
| :------------------: | :--------------------: | -------------------------------- |
|         1001         |           0            | 直接回复一级评论，没回复任何人   |
|         1002         |          1001          | 回复了 reply\_id=1001 的那条回复 |
|         1003         |           0            | 直接回复一级评论                 |
|         1004         |          1002          | 回复了 reply\_id=1002 的那条回复 |

`repliedIdList` ：[0, 1001, 0 1002]

`repliedList` ：{ 1001, 1002 }

`commentRepliesPOMap` ：{ 1001 => item，1002 => item }

### 前端展示

```text
回复1：直接回复评论A
回复2：回复 @回复1: "原来如此" → 我也觉得对 // 展示了上级评论的内容
回复3：直接回复评论A  
回复4：回复 @回复2: "确实" → 必须的
```

