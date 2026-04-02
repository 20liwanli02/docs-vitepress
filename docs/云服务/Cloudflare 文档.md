# Cloudflare 使用文档

## 一、概念
Cloudflare 可以部署网站，有免费的CDN、证书、域名......，是一个免费的服务器

Cloudflare 官网地址

[Cloudflare 官网](https://dash.cloudflare.com/)

## 二、项目部署
### Pages 部署应用 [Cloudflare Pages](https://developers.cloudflare.com/pages/)
#### 本地文件上传 < 1000
步骤：Compute -> Pages -> 部署页面

1. 如果部署的文件数量小于 1000，可以直接创建应用名
2. 直接拖动文件上传即可

#### wrangler cli 加手脚推行 [Wrangler CLI 官方文档](https://developers.cloudflare.com/pages/get-started/direct-upload/#wrangler-cli)
1. 打包项目 `npm run build`
2. 临时安装使用 wrangler 并使用 `npx wrangler pages deploy dist`
3. 选择应用名进行推送

> 💡 tip：
>
> 本地推送文件至 Cloudflare 需要身份验证，windows 验证需要的 token 放在  
> C:\Users\UserName\AppData\Roaming\xdg.config\.wrangler\config\default.toml
