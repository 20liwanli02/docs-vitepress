# Git 常用命令

## 一、仓库初始化与配置

```bash
git init                              # 初始化本地仓库
git clone git+ssh://git@xxx/xxx.git   # 克隆远程仓库

git config --global user.name "xxx"   # 配置用户名
git config --global user.email "xxx"  # 配置邮箱

git config --global color.ui true
git config --global color.status auto
git config --global color.diff auto
git config --global color.branch auto
git config --global color.interactive auto

git config --global --unset http.proxy # 取消代理
```

---

## 二、基本操作

```bash
git status                # 查看状态
git add file              # 添加文件到暂存区
git add .                 # 添加所有修改
git commit -m "msg"       # 提交
git commit -am "msg"      # add + commit
git commit --amend -m ""  # 修改上一次提交

git rm file               # 删除文件
git rm -r *               # 递归删除
git mv a b                # 重命名文件
```

---

## 三、日志查看

```bash
git log                   # 查看日志
git log -n                # 查看n条日志
git log -1
git log -5

git log --stat            # 查看变更文件
git log -p -m             # 查看详细变更

git show HEAD             # 查看当前提交
git show HEAD^            # 上一个提交
git show HEAD~3           # 上第3个版本
git show commitId         # 查看指定提交
git show dfb02            # 可用简写

git log --pretty=format:'%h %s' --graph  # 图形化日志
```

---

## 四、差异比较

```bash
git diff                          # 工作区 vs 暂存区
git diff --cached                 # 暂存区 vs 仓库
git diff HEAD^                    # 与上一个版本对比
git diff HEAD -- ./dir            # 对比某目录

git diff origin/master..master    # 本地 vs 远程
git diff --stat                   # 只显示文件变化
```

---

## 五、分支管理

```bash
git branch                        # 查看本地分支
git branch -a                     # 所有分支
git branch -r                     # 远程分支

git branch -b new_branch          # ❌（错误写法，注意）

git checkout -b new_branch        # 创建并切换分支
git checkout branch               # 切换分支

git branch -m old new             # 重命名分支

git branch --merged               # 已合并分支
git branch --no-merged            # 未合并分支

git branch -d branch              # 删除分支
git branch -D branch              # 强制删除
```

---

## 六、远程仓库操作

```bash
git remote add origin url         # 添加远程仓库

git push origin master            # 推送代码
git push --tags                   # 推送标签
git push origin :branch           # 删除远程分支

git fetch                         # 拉取远程（不合并）
git fetch --prune                 # 清理已删除分支

git pull origin master            # 拉取并合并
```

---

## 七、分支合并与变基

```bash
git merge branch                  # 合并分支
git merge origin/master

git rebase                        # 变基

git cherry-pick commitId          # 挑选提交
```

---

## 八、标签（Tag）

```bash
git tag                           # 查看标签
git tag -a v1.0 -m "msg"          # 创建标签

git show v1.0                     # 查看标签
git log v1.0                      # 查看日志
```

---

## 九、回退与撤销

```bash
git reset --hard HEAD             # 回到当前版本
git reset --hard HEAD^            # 回退一个版本

git revert commitId               # 撤销某次提交（推荐）

git checkout -- file              # 撤销文件修改
```

---

## 十、stash（暂存）

```bash
git stash                         # 暂存修改
git stash list                    # 查看暂存列表

git stash show -p stash@{0}       # 查看内容
git stash apply stash@{0}         # 恢复暂存
```

---

## 十一、查询与搜索

```bash
git grep "text"                   # 搜索内容
git grep -e "a" --and -e "b"      # 多条件搜索

git ls-files                      # 查看暂存区文件
```

---

## 十二、底层与调试命令

```bash
git reflog                        # 查看所有操作记录
git show HEAD@{5}                 # 查看历史状态

git show master@{yesterday}       # 查看昨日状态

git ls-tree HEAD                  # 查看对象树
git rev-parse v1.0                # 获取hash

git show-branch                   # 分支结构
git show-branch --all

git whatchanged                   # 查看变更

git fsck                          # 检查仓库完整性
git gc                            # 垃圾回收
```

---

## 十三、核心总结

### 1️⃣ Git 三大区域

```text
工作区 → 暂存区 → 本地仓库
```

---

### 2️⃣ 基本流程

```text
修改 → git add → git commit → git push
```

---

### 3️⃣ 三大核心能力

* 版本控制（log / show）
* 分支管理（branch / merge / rebase）
* 远程协作（push / pull / fetch）

---

如果你需要，我可以帮你再整理一版👇
👉 **“开发常用最小命令集（面试 + 实战版）”**（只保留最关键的20条）