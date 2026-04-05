import{_ as a,o as n,c as i,ak as e}from"./chunks/framework.24mNDJkT.js";const g=JSON.parse('{"title":"OpenClaw 本地文件管理笔记","description":"","frontmatter":{},"headers":[],"relativePath":"AI/OpenClaw/OpenClaw 本地文件管理.md","filePath":"AI/OpenClaw/OpenClaw 本地文件管理.md","lastUpdated":0}'),p={name:"AI/OpenClaw/OpenClaw 本地文件管理.md"};function l(t,s,h,d,r,c){return n(),i("div",null,[...s[0]||(s[0]=[e(`<h1 id="openclaw-本地文件管理笔记" tabindex="-1">OpenClaw 本地文件管理笔记 <a class="header-anchor" href="#openclaw-本地文件管理笔记" aria-label="Permalink to “OpenClaw 本地文件管理笔记”">​</a></h1><h2 id="一、智能文件搜索" tabindex="-1">一、智能文件搜索 <a class="header-anchor" href="#一、智能文件搜索" aria-label="Permalink to “一、智能文件搜索”">​</a></h2><h3 id="为什么需要智能搜索" tabindex="-1">为什么需要智能搜索 <a class="header-anchor" href="#为什么需要智能搜索" aria-label="Permalink to “为什么需要智能搜索”">​</a></h3><table tabindex="0"><thead><tr><th>传统搜索痛点</th><th>OpenClaw 智能搜索</th></tr></thead><tbody><tr><td>忘记文件名，只记得内容</td><td>✅ 根据文件内容搜索</td></tr><tr><td>文件太多，不知道在哪个文件夹</td><td>✅ 跨文件夹智能搜索</td></tr><tr><td>需要同时搜索多种类型</td><td>✅ 理解自然语言描述</td></tr><tr><td>需要根据内容筛选</td><td>✅ 智能过滤和排序</td></tr></tbody></table><h3 id="场景-1-找文件-真实案例" tabindex="-1">场景 1：找文件（真实案例） <a class="header-anchor" href="#场景-1-找文件-真实案例" aria-label="Permalink to “场景 1：找文件（真实案例）”">​</a></h3><p><strong>场景</strong>：找一张跑步机的发票，但文件名都是微信默认命名（微信文件XXX）</p><table tabindex="0"><thead><tr><th>方式</th><th>耗时</th><th>体验</th></tr></thead><tbody><tr><td><strong>传统方法</strong>（一张张点开看）</td><td>10-30 分钟</td><td>😫 太呆逼了</td></tr><tr><td><strong>OpenClaw</strong></td><td>30-60 秒</td><td>😊 一句话搞定</td></tr></tbody></table><p><strong>命令示例</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我找一下我电脑上的一张发票，里面详情是买了一个跑步机，</span></span>
<span class="line"><span>然后把那个发票用文件发给我。</span></span></code></pre></div><p><strong>执行过程</strong>：</p><ol><li>🔍 搜索所有图片文件</li><li>📄 使用 OCR 识别文字</li><li>🎯 匹配&quot;跑步机&quot;关键词</li><li>📤 发送找到的文件</li></ol><h3 id="搜索命令示例" tabindex="-1">搜索命令示例 <a class="header-anchor" href="#搜索命令示例" aria-label="Permalink to “搜索命令示例”">​</a></h3><h4 id="按内容搜索" tabindex="-1">按内容搜索 <a class="header-anchor" href="#按内容搜索" aria-label="Permalink to “按内容搜索”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找一下包含&quot;合同&quot;的PDF文件</span></span>
<span class="line"><span>搜索所有提到&quot;项目计划&quot;的文档</span></span>
<span class="line"><span>找一下我写的关于AI的笔记</span></span></code></pre></div><h4 id="按类型搜索" tabindex="-1">按类型搜索 <a class="header-anchor" href="#按类型搜索" aria-label="Permalink to “按类型搜索”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找出所有的PNG图片</span></span>
<span class="line"><span>搜索最近下载的PDF文件</span></span>
<span class="line"><span>找一下所有的Excel表格</span></span></code></pre></div><h4 id="按时间搜索" tabindex="-1">按时间搜索 <a class="header-anchor" href="#按时间搜索" aria-label="Permalink to “按时间搜索”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找一下最近7天修改的文件</span></span>
<span class="line"><span>搜索上个月创建的文档</span></span>
<span class="line"><span>找一下今天下载的文件</span></span></code></pre></div><h4 id="按大小搜索" tabindex="-1">按大小搜索 <a class="header-anchor" href="#按大小搜索" aria-label="Permalink to “按大小搜索”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找出大于100MB的文件</span></span>
<span class="line"><span>搜索所有小于1MB的图片</span></span>
<span class="line"><span>找一下占用空间最大的10个文件</span></span></code></pre></div><h4 id="组合搜索" tabindex="-1">组合搜索 <a class="header-anchor" href="#组合搜索" aria-label="Permalink to “组合搜索”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找一下最近一周内，包含&quot;发票&quot;的图片文件</span></span>
<span class="line"><span>搜索下载文件夹里，大于10MB的PDF</span></span>
<span class="line"><span>找一下桌面上，今天修改过的Word文档</span></span></code></pre></div><h3 id="搜索技巧" tabindex="-1">搜索技巧 <a class="header-anchor" href="#搜索技巧" aria-label="Permalink to “搜索技巧”">​</a></h3><table tabindex="0"><thead><tr><th>技巧</th><th>❌ 不好的搜索</th><th>✅ 好的搜索</th></tr></thead><tbody><tr><td><strong>描述内容而非文件名</strong></td><td>找一下 IMG_1234.jpg</td><td>找一下我去年在海边拍的照片</td></tr><tr><td><strong>提供上下文</strong></td><td>找发票</td><td>找一下我上个月买跑步机的发票，应该在下载文件夹里</td></tr><tr><td><strong>指定搜索范围</strong></td><td>找所有文件</td><td>在文档文件夹里找所有的PDF文件</td></tr><tr><td><strong>使用排序</strong></td><td>找图片</td><td>找最近修改的10张图片，按时间排序</td></tr></tbody></table><hr><h2 id="二、批量文件处理" tabindex="-1">二、批量文件处理 <a class="header-anchor" href="#二、批量文件处理" aria-label="Permalink to “二、批量文件处理”">​</a></h2><h3 id="场景-2-整理发票报销-真实案例" tabindex="-1">场景 2：整理发票报销（真实案例） <a class="header-anchor" href="#场景-2-整理发票报销-真实案例" aria-label="Permalink to “场景 2：整理发票报销（真实案例）”">​</a></h3><p><strong>场景</strong>：财务要求发票填写在 Excel 模板中提交</p><table tabindex="0"><thead><tr><th>方式</th><th>耗时</th><th>步骤</th></tr></thead><tbody><tr><td><strong>传统方法</strong></td><td>30-60 分钟</td><td>一张张上传到 ChatGPT → 提取信息 → 复制到 Excel → 重复 N 次</td></tr><tr><td><strong>OpenClaw</strong></td><td>2-5 分钟</td><td>一句话搞定</td></tr></tbody></table><p><strong>命令示例</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>我希望你帮我把我本地那个1月发票文件夹里的所有发票都整理一下，</span></span>
<span class="line"><span>按照那个下载文件里报销单.xlsx的模板格式填进去，</span></span>
<span class="line"><span>再把填好的表格用文件发送给我。</span></span></code></pre></div><p><strong>执行过程</strong>：</p><ol><li>📁 读取发票文件夹</li><li>🔍 识别所有发票图片</li><li>📄 OCR 提取信息（日期、金额、商家等）</li><li>📊 读取 Excel 模板</li><li>✍️ 按模板格式填写</li><li>💾 保存新文件</li><li>📤 发送给你</li></ol><h3 id="批量处理命令示例" tabindex="-1">批量处理命令示例 <a class="header-anchor" href="#批量处理命令示例" aria-label="Permalink to “批量处理命令示例”">​</a></h3><h4 id="批量读取" tabindex="-1">批量读取 <a class="header-anchor" href="#批量读取" aria-label="Permalink to “批量读取”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>读取文档文件夹里所有的PDF文件</span></span>
<span class="line"><span>提取所有图片中的文字</span></span>
<span class="line"><span>读取所有Excel表格的第一行</span></span></code></pre></div><h4 id="批量提取信息" tabindex="-1">批量提取信息 <a class="header-anchor" href="#批量提取信息" aria-label="Permalink to “批量提取信息”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>从所有发票中提取日期、金额、商家信息</span></span>
<span class="line"><span>从所有简历中提取姓名、电话、邮箱</span></span>
<span class="line"><span>从所有合同中提取甲方、乙方、金额</span></span></code></pre></div><h4 id="批量格式转换" tabindex="-1">批量格式转换 <a class="header-anchor" href="#批量格式转换" aria-label="Permalink to “批量格式转换”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把所有Word文档转换成PDF</span></span>
<span class="line"><span>把所有PNG图片转换成JPG</span></span>
<span class="line"><span>把所有Excel表格导出为CSV</span></span></code></pre></div><h4 id="批量数据整理" tabindex="-1">批量数据整理 <a class="header-anchor" href="#批量数据整理" aria-label="Permalink to “批量数据整理”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把所有发票信息整理到一个Excel表格</span></span>
<span class="line"><span>把所有联系人信息整理成通讯录</span></span>
<span class="line"><span>把所有会议记录整理成一份总结</span></span></code></pre></div><h3 id="实战案例" tabindex="-1">实战案例 <a class="header-anchor" href="#实战案例" aria-label="Permalink to “实战案例”">​</a></h3><h4 id="案例-1-整理客户信息" tabindex="-1">案例 1：整理客户信息 <a class="header-anchor" href="#案例-1-整理客户信息" aria-label="Permalink to “案例 1：整理客户信息”">​</a></h4><p><strong>场景</strong>：100 份客户资料（Word），提取公司名、联系人、电话、邮箱，整理到 Excel</p><p><strong>命令</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我从&quot;客户资料&quot;文件夹里的所有Word文档中，</span></span>
<span class="line"><span>提取公司名、联系人、电话、邮箱，</span></span>
<span class="line"><span>整理到一个Excel表格里，</span></span>
<span class="line"><span>按公司名排序。</span></span></code></pre></div><p><strong>结果</strong>：</p><ul><li>自动提取 100 份资料</li><li>生成规范的 Excel 表格</li><li>耗时：5-10 分钟</li></ul><h4 id="案例-2-批量提取-pdf-内容" tabindex="-1">案例 2：批量提取 PDF 内容 <a class="header-anchor" href="#案例-2-批量提取-pdf-内容" aria-label="Permalink to “案例 2：批量提取 PDF 内容”">​</a></h4><p><strong>场景</strong>：50 份 PDF 报告，提取摘要，整理成汇总文档</p><p><strong>命令</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>读取&quot;报告&quot;文件夹里所有的PDF文件，</span></span>
<span class="line"><span>提取每份报告的摘要部分（通常在第一页），</span></span>
<span class="line"><span>整理成一份Word文档，</span></span>
<span class="line"><span>每个摘要标注来源文件名。</span></span></code></pre></div><h4 id="案例-3-批量图片识别" tabindex="-1">案例 3：批量图片识别 <a class="header-anchor" href="#案例-3-批量图片识别" aria-label="Permalink to “案例 3：批量图片识别”">​</a></h4><p><strong>场景</strong>：200 张名片照片，提取联系信息，整理成通讯录</p><p><strong>命令</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>识别&quot;名片&quot;文件夹里所有图片，</span></span>
<span class="line"><span>提取姓名、公司、职位、电话、邮箱，</span></span>
<span class="line"><span>整理成Excel通讯录，</span></span>
<span class="line"><span>按公司分类。</span></span></code></pre></div><h3 id="错误处理和纠错" tabindex="-1">错误处理和纠错 <a class="header-anchor" href="#错误处理和纠错" aria-label="Permalink to “错误处理和纠错”">​</a></h3><table tabindex="0"><thead><tr><th>问题</th><th>处理方式</th></tr></thead><tbody><tr><td><strong>识别错误</strong></td><td><code>帮我检查一下刚才生成的Excel表格，看看有没有识别错误的地方，比如电话号码格式不对、金额异常等。</code></td></tr><tr><td><strong>缺失信息</strong></td><td><code>有些发票可能信息不全，如果缺少必填项，请单独列出来，我手动补充。</code></td></tr><tr><td><strong>格式问题</strong></td><td><code>如果遇到无法识别的文件格式，请跳过并告诉我，我会手动处理。</code></td></tr></tbody></table><hr><h2 id="三、文件自动整理" tabindex="-1">三、文件自动整理 <a class="header-anchor" href="#三、文件自动整理" aria-label="Permalink to “三、文件自动整理”">​</a></h2><h3 id="场景-3-批量重命名文件-真实案例" tabindex="-1">场景 3：批量重命名文件（真实案例） <a class="header-anchor" href="#场景-3-批量重命名文件-真实案例" aria-label="Permalink to “场景 3：批量重命名文件（真实案例）”">​</a></h3><p><strong>场景</strong>：邀请函文件名全是&quot;微信文件XXX&quot;，需要根据内容重命名</p><table tabindex="0"><thead><tr><th>方式</th><th>耗时</th><th>体验</th></tr></thead><tbody><tr><td><strong>传统方法</strong>（一张张看内容重命名）</td><td>20-30 分钟</td><td>😫 太 BUG 了</td></tr><tr><td><strong>OpenClaw</strong></td><td>1-2 分钟</td><td>😊 一句话搞定</td></tr></tbody></table><p><strong>命令示例</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>让OpenClaw根据我邀请函里面对应的人名，</span></span>
<span class="line"><span>把外面的名字改成&quot;人名-邀请函.jpg&quot;的格式。</span></span></code></pre></div><h3 id="文件整理命令示例" tabindex="-1">文件整理命令示例 <a class="header-anchor" href="#文件整理命令示例" aria-label="Permalink to “文件整理命令示例”">​</a></h3><h4 id="批量重命名" tabindex="-1">批量重命名 <a class="header-anchor" href="#批量重命名" aria-label="Permalink to “批量重命名”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把所有图片按拍摄日期重命名，格式：YYYY-MM-DD_序号.jpg</span></span>
<span class="line"><span>把所有文档按内容主题重命名</span></span>
<span class="line"><span>把所有下载文件按类型重命名</span></span></code></pre></div><h4 id="文件分类" tabindex="-1">文件分类 <a class="header-anchor" href="#文件分类" aria-label="Permalink to “文件分类”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>把桌面上的文件按类型分类到不同文件夹</span></span>
<span class="line"><span>把下载文件夹里的文件按日期分类</span></span>
<span class="line"><span>把照片按拍摄地点分类</span></span></code></pre></div><h4 id="文件夹结构优化" tabindex="-1">文件夹结构优化 <a class="header-anchor" href="#文件夹结构优化" aria-label="Permalink to “文件夹结构优化”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我整理一下项目文件夹，按功能模块分类</span></span>
<span class="line"><span>优化我的文档文件夹结构，让它更清晰</span></span>
<span class="line"><span>把所有散乱的文件整理到合适的文件夹</span></span></code></pre></div><h3 id="实战案例-1" tabindex="-1">实战案例 <a class="header-anchor" href="#实战案例-1" aria-label="Permalink to “实战案例”">​</a></h3><h4 id="案例-1-整理下载文件夹" tabindex="-1">案例 1：整理下载文件夹 <a class="header-anchor" href="#案例-1-整理下载文件夹" aria-label="Permalink to “案例 1：整理下载文件夹”">​</a></h4><p><strong>场景</strong>：下载文件夹 500+ 文件，各种类型混在一起</p><p><strong>命令</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我整理下载文件夹：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 按文件类型分类（文档、图片、视频、压缩包等）</span></span>
<span class="line"><span>2. 每个类型创建一个子文件夹</span></span>
<span class="line"><span>3. 把文件移动到对应文件夹</span></span>
<span class="line"><span>4. 删除重复文件</span></span>
<span class="line"><span>5. 告诉我整理结果</span></span></code></pre></div><p><strong>结果</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>✅ 整理完成！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📊 统计：</span></span>
<span class="line"><span>- 文档：120个 → Documents/</span></span>
<span class="line"><span>- 图片：200个 → Images/</span></span>
<span class="line"><span>- 视频：50个 → Videos/</span></span>
<span class="line"><span>- 压缩包：30个 → Archives/</span></span>
<span class="line"><span>- 其他：100个 → Others/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🗑️ 删除重复文件：15个</span></span>
<span class="line"><span>💾 释放空间：2.3GB</span></span></code></pre></div><h4 id="案例-2-照片自动分类" tabindex="-1">案例 2：照片自动分类 <a class="header-anchor" href="#案例-2-照片自动分类" aria-label="Permalink to “案例 2：照片自动分类”">​</a></h4><p><strong>场景</strong>：1000+ 张照片，按日期和地点分类</p><p><strong>命令</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我整理照片文件夹：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 按拍摄日期创建文件夹（YYYY-MM格式）</span></span>
<span class="line"><span>2. 如果照片有地理位置信息，在文件名中标注</span></span>
<span class="line"><span>3. 删除模糊和重复的照片</span></span>
<span class="line"><span>4. 生成一个索引文件</span></span></code></pre></div><p><strong>结果</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>✅ 整理完成！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📁 文件夹结构：</span></span>
<span class="line"><span>Photos/</span></span>
<span class="line"><span>├── 2025-12/</span></span>
<span class="line"><span>│   ├── 2025-12-01_北京_001.jpg</span></span>
<span class="line"><span>│   ├── 2025-12-01_北京_002.jpg</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>├── 2026-01/</span></span>
<span class="line"><span>│   ├── 2026-01-15_上海_001.jpg</span></span>
<span class="line"><span>│   └── ...</span></span>
<span class="line"><span>└── index.txt (索引文件)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🗑️ 删除模糊照片：50张</span></span>
<span class="line"><span>🗑️ 删除重复照片：30张</span></span></code></pre></div><h4 id="案例-3-文档归档" tabindex="-1">案例 3：文档归档 <a class="header-anchor" href="#案例-3-文档归档" aria-label="Permalink to “案例 3：文档归档”">​</a></h4><p><strong>场景</strong>：项目结束，文档散落在各处，需要统一归档</p><p><strong>命令</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我归档&quot;XX项目&quot;的所有文档：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 搜索所有相关文档（包含项目名称）</span></span>
<span class="line"><span>2. 按文档类型分类（需求、设计、代码、测试等）</span></span>
<span class="line"><span>3. 创建归档文件夹结构</span></span>
<span class="line"><span>4. 移动文件到对应位置</span></span>
<span class="line"><span>5. 生成项目文档清单</span></span></code></pre></div><h3 id="自动化脚本" tabindex="-1">自动化脚本 <a class="header-anchor" href="#自动化脚本" aria-label="Permalink to “自动化脚本”">​</a></h3><p><strong>需求</strong>：经常需要整理某类文件，生成自动化脚本</p><p><strong>命令</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我写1个脚本，每周自动整理下载文件夹，</span></span>
<span class="line"><span>按照刚才的规则分类。</span></span></code></pre></div><hr><h2 id="四、硬盘清理优化" tabindex="-1">四、硬盘清理优化 <a class="header-anchor" href="#四、硬盘清理优化" aria-label="Permalink to “四、硬盘清理优化”">​</a></h2><h3 id="场景-4-清理硬盘垃圾-真实案例" tabindex="-1">场景 4：清理硬盘垃圾（真实案例） <a class="header-anchor" href="#场景-4-清理硬盘垃圾-真实案例" aria-label="Permalink to “场景 4：清理硬盘垃圾（真实案例）”">​</a></h3><p><strong>场景</strong>：硬盘快满了，不想下载清理软件</p><table tabindex="0"><thead><tr><th>方式</th><th>耗时</th><th>风险</th></tr></thead><tbody><tr><td><strong>传统清理软件</strong></td><td>30-60 分钟</td><td>担心误删重要文件</td></tr><tr><td><strong>OpenClaw</strong></td><td>智能分析 + 安全建议</td><td>三步确认，安全删除</td></tr></tbody></table><p><strong>命令示例</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我分析一下硬盘空间使用情况，</span></span>
<span class="line"><span>找出占用空间最大的文件和文件夹，</span></span>
<span class="line"><span>建议哪些可以清理。</span></span></code></pre></div><h3 id="清理命令示例" tabindex="-1">清理命令示例 <a class="header-anchor" href="#清理命令示例" aria-label="Permalink to “清理命令示例”">​</a></h3><h4 id="查找大文件" tabindex="-1">查找大文件 <a class="header-anchor" href="#查找大文件" aria-label="Permalink to “查找大文件”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找出占用空间最大的10个文件</span></span>
<span class="line"><span>查找大于1GB的文件</span></span>
<span class="line"><span>分析哪个文件夹占用空间最多</span></span></code></pre></div><h4 id="查找重复文件" tabindex="-1">查找重复文件 <a class="header-anchor" href="#查找重复文件" aria-label="Permalink to “查找重复文件”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找出所有重复的文件</span></span>
<span class="line"><span>查找重复的照片</span></span>
<span class="line"><span>找出重复的文档</span></span></code></pre></div><h4 id="查找临时文件" tabindex="-1">查找临时文件 <a class="header-anchor" href="#查找临时文件" aria-label="Permalink to “查找临时文件”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>找出所有临时文件</span></span>
<span class="line"><span>查找缓存文件</span></span>
<span class="line"><span>找出可以安全删除的文件</span></span></code></pre></div><h4 id="清理建议" tabindex="-1">清理建议 <a class="header-anchor" href="#清理建议" aria-label="Permalink to “清理建议”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>分析我的硬盘，给出清理建议</span></span>
<span class="line"><span>哪些文件可以移动到外部硬盘</span></span>
<span class="line"><span>哪些文件可以压缩存储</span></span></code></pre></div><h3 id="实战案例-释放-100gb-空间" tabindex="-1">实战案例：释放 100GB 空间 <a class="header-anchor" href="#实战案例-释放-100gb-空间" aria-label="Permalink to “实战案例：释放 100GB 空间”">​</a></h3><h4 id="第一步-分析空间占用" tabindex="-1">第一步：分析空间占用 <a class="header-anchor" href="#第一步-分析空间占用" aria-label="Permalink to “第一步：分析空间占用”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>我：帮我分析一下硬盘空间使用情况</span></span></code></pre></div><p><strong>回复</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>📊 硬盘空间分析：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>总容量：500GB</span></span>
<span class="line"><span>已使用：450GB (90%)</span></span>
<span class="line"><span>剩余：50GB (10%)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⚠️ 空间不足警告！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>占用空间最多的文件夹：</span></span>
<span class="line"><span>1. ~/Library/Caches - 80GB</span></span>
<span class="line"><span>2. ~/Downloads - 50GB</span></span>
<span class="line"><span>3. ~/Movies - 120GB</span></span>
<span class="line"><span>4. ~/Documents - 100GB</span></span>
<span class="line"><span>5. ~/Desktop - 30GB</span></span></code></pre></div><h4 id="第二步-查找大文件" tabindex="-1">第二步：查找大文件 <a class="header-anchor" href="#第二步-查找大文件" aria-label="Permalink to “第二步：查找大文件”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>我：找出大于1GB的文件</span></span></code></pre></div><p><strong>回复</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>🔍 找到35个大于1GB的文件：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>视频文件（25个）：</span></span>
<span class="line"><span>1. 项目演示.mov - 15GB</span></span>
<span class="line"><span>2. 会议录像_2025-12.mp4 - 8GB</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>虚拟机镜像（5个）：</span></span>
<span class="line"><span>1. Windows.vmdk - 50GB</span></span>
<span class="line"><span>2. Ubuntu.vmdk - 30GB</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>备份文件（5个）：</span></span>
<span class="line"><span>1. iPhone备份_2025-12.backup - 20GB</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>💡 建议：</span></span>
<span class="line"><span>- 视频文件可以压缩或移动到外部硬盘</span></span>
<span class="line"><span>- 旧的虚拟机镜像可以删除</span></span>
<span class="line"><span>- 旧的备份文件可以删除</span></span></code></pre></div><h4 id="第三步-查找重复文件" tabindex="-1">第三步：查找重复文件 <a class="header-anchor" href="#第三步-查找重复文件" aria-label="Permalink to “第三步：查找重复文件”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>我：找出所有重复的文件</span></span></code></pre></div><p><strong>回复</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>🔍 找到120组重复文件：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重复照片（80组）：</span></span>
<span class="line"><span>- IMG_1234.jpg (3份) - 15MB</span></span>
<span class="line"><span>- IMG_5678.jpg (2份) - 10MB</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>重复文档（30组）：</span></span>
<span class="line"><span>- 报告_v1.docx (4份) - 5MB</span></span>
<span class="line"><span>- 方案_final.pptx (3份) - 20MB</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>💡 可释放空间：约8GB</span></span></code></pre></div><h4 id="第四步-清理临时文件" tabindex="-1">第四步：清理临时文件 <a class="header-anchor" href="#第四步-清理临时文件" aria-label="Permalink to “第四步：清理临时文件”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>我：找出所有可以安全删除的临时文件和缓存</span></span></code></pre></div><p><strong>回复</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>🗑️ 可安全删除的文件：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>系统缓存：</span></span>
<span class="line"><span>- ~/Library/Caches - 80GB</span></span>
<span class="line"><span>  - Safari缓存 - 20GB</span></span>
<span class="line"><span>  - Chrome缓存 - 30GB</span></span>
<span class="line"><span>  - 其他应用缓存 - 30GB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>临时文件：</span></span>
<span class="line"><span>- /tmp - 5GB</span></span>
<span class="line"><span>- ~/Downloads/临时文件 - 10GB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>日志文件：</span></span>
<span class="line"><span>- ~/Library/Logs - 3GB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>💡 可释放空间：约98GB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⚠️ 建议：</span></span>
<span class="line"><span>- 系统缓存可以全部清理</span></span>
<span class="line"><span>- 临时文件可以全部删除</span></span>
<span class="line"><span>- 日志文件保留最近1个月的</span></span></code></pre></div><h4 id="第五步-执行清理" tabindex="-1">第五步：执行清理 <a class="header-anchor" href="#第五步-执行清理" aria-label="Permalink to “第五步：执行清理”">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>我：好的，帮我清理这些文件，但是要先备份重要的，然后再删除。</span></span></code></pre></div><p><strong>回复</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>✅ 清理完成！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📊 清理结果：</span></span>
<span class="line"><span>- 删除缓存文件：80GB</span></span>
<span class="line"><span>- 删除临时文件：15GB</span></span>
<span class="line"><span>- 删除重复文件：8GB</span></span>
<span class="line"><span>- 删除旧备份：20GB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>💾 总共释放空间：123GB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📁 备份位置：</span></span>
<span class="line"><span>- 重要文件已备份到：~/Backup/清理前备份_2026-02-10/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⚠️ 建议：</span></span>
<span class="line"><span>- 定期清理缓存（每月一次）</span></span>
<span class="line"><span>- 及时删除不需要的下载文件</span></span>
<span class="line"><span>- 使用外部硬盘存储大文件</span></span></code></pre></div><h3 id="安全删除策略" tabindex="-1">安全删除策略 <a class="header-anchor" href="#安全删除策略" aria-label="Permalink to “安全删除策略”">​</a></h3><table tabindex="0"><thead><tr><th>步骤</th><th>操作</th></tr></thead><tbody><tr><td><strong>第一步</strong></td><td>分析 - 识别可删除文件</td></tr><tr><td><strong>第二步</strong></td><td>备份 - 重要文件先备份</td></tr><tr><td><strong>第三步</strong></td><td>删除 - 移动到回收站而非直接删除</td></tr></tbody></table><p><strong>保护重要文件</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>在清理之前，请确保以下文件夹不被删除：</span></span>
<span class="line"><span>- ~/Documents/重要文档</span></span>
<span class="line"><span>- ~/Projects</span></span>
<span class="line"><span>- ~/Photos</span></span></code></pre></div><p><strong>可恢复删除</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>先把文件移动到回收站，而不是直接删除，</span></span>
<span class="line"><span>这样如果误删了还能恢复。</span></span></code></pre></div><h3 id="定期清理计划" tabindex="-1">定期清理计划 <a class="header-anchor" href="#定期清理计划" aria-label="Permalink to “定期清理计划”">​</a></h3><p><strong>命令</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>帮我制定一个定期清理计划，</span></span>
<span class="line"><span>每周自动清理缓存和临时文件，</span></span>
<span class="line"><span>每月检查大文件和重复文件。</span></span></code></pre></div><p><strong>回复</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>✅ 已创建定期清理计划：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📅 每周任务（每周日晚上10点）：</span></span>
<span class="line"><span>- 清理系统缓存</span></span>
<span class="line"><span>- 清理浏览器缓存</span></span>
<span class="line"><span>- 清理临时文件</span></span>
<span class="line"><span>- 清理下载文件夹（超过30天的文件）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📅 每月任务（每月1号）：</span></span>
<span class="line"><span>- 查找大文件（&gt;1GB）</span></span>
<span class="line"><span>- 查找重复文件</span></span>
<span class="line"><span>- 分析空间占用</span></span>
<span class="line"><span>- 生成清理报告</span></span>
<span class="line"><span></span></span>
<span class="line"><span>💡 预计每月可释放：20-30GB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>⚠️ 重要提醒：</span></span>
<span class="line"><span>- 清理前会自动备份</span></span>
<span class="line"><span>- 清理后会发送通知</span></span>
<span class="line"><span>- 可以随时取消任务</span></span></code></pre></div><hr><h2 id="五、实战项目-打造文件管理助手" tabindex="-1">五、实战项目：打造文件管理助手 <a class="header-anchor" href="#五、实战项目-打造文件管理助手" aria-label="Permalink to “五、实战项目：打造文件管理助手”">​</a></h2><h3 id="项目目标" tabindex="-1">项目目标 <a class="header-anchor" href="#项目目标" aria-label="Permalink to “项目目标”">​</a></h3><p>创建完整的文件管理工作流：</p><ol><li>每天自动整理下载文件夹</li><li>每周清理缓存和临时文件</li><li>每月检查大文件和重复文件</li><li>重要文件自动备份</li></ol><h3 id="实施步骤" tabindex="-1">实施步骤 <a class="header-anchor" href="#实施步骤" aria-label="Permalink to “实施步骤”">​</a></h3><table tabindex="0"><thead><tr><th>步骤</th><th>命令</th></tr></thead><tbody><tr><td><strong>设置自动整理</strong></td><td><code>帮我设置每天晚上10点自动整理下载文件夹，按文件类型分类。</code></td></tr><tr><td><strong>设置定期清理</strong></td><td><code>设置每周日晚上11点清理缓存和临时文件。</code></td></tr><tr><td><strong>设置月度检查</strong></td><td><code>设置每月1号检查大文件和重复文件，生成清理报告。</code></td></tr><tr><td><strong>设置自动备份</strong></td><td><code>设置每天自动备份重要文件夹到外部硬盘。</code></td></tr></tbody></table><h3 id="预期效果" tabindex="-1">预期效果 <a class="header-anchor" href="#预期效果" aria-label="Permalink to “预期效果”">​</a></h3><ul><li>📁 下载文件夹始终保持整洁</li><li>💾 硬盘空间充足（至少保持 20% 空闲）</li><li>🔒 重要文件有备份</li><li>⏱️ 每月节省 5-10 小时整理时间</li></ul><hr><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to “本章小结”">​</a></h2><p>✅ <strong>智能文件搜索</strong> - 根据内容找文件，不再依赖文件名</p><p>✅ <strong>批量文件处理</strong> - 一次处理 100+ 文件，自动提取信息</p><p>✅ <strong>文件自动整理</strong> - 智能分类、重命名、归档</p><p>✅ <strong>硬盘清理优化</strong> - 找出垃圾文件，释放大量空间</p>`,157)])])}const b=a(p,[["render",l]]);export{g as __pageData,b as default};
