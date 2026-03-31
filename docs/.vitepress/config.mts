import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "夜愿-文档库",
  description: "A VitePress Site",
  themeConfig: {
    logo: '/logo.png',
    outline: {
      label: '本页目录'  // 自定义中文标题
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/markdown-examples' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {  // root 表示默认语言
            translations: {
              button: {
                buttonText: '搜索',           // 搜索按钮文字
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '没有找到相关结果',  // 无结果提示
                // ... 其他翻译
              }
            }
          }
        }
      }
    },
    sidebar: [
      {
        text: '简介',
        collapsed: false,
        items: [
          { text: '快速开始', link: '/简介/快速开始' }
        ]
      },
      {
        text: 'Java 文档',
        collapsed: false,
        items: [
          { text: 'Java 公共代码抽象', link: '/Java 文档/Java 公共代码抽象' },
          { text: '理解 JVM 内存模型', link: '/Java 文档/理解 JVM 内存模型' },
        ]
      },{
        text: '扩展',
        collapsed: false,
        items: [
          { text: '扩展文档', link: '/扩展/扩展文档' },
          { text: 'Cloudflare 使用文档', link: '/扩展/Cloudflare 使用文档' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      copyright: 'Copyright © 2026 YeYuan'
    }
  }
})
