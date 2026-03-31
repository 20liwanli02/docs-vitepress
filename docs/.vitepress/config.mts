import { defineConfig } from 'vitepress'
import nav from './nav.mts'
import sidebar from "./sidebar.mts";

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
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,

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
                resetButtonTitle: '清除',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '选择',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '向上导航',
                  navigateDownKeyAriaLabel: '向下导航',
                  closeText: '关闭',
                  closeKeyAriaLabel: '关闭',
                  searchByText: '搜索'
                }
                // ... 其他翻译
              }
            }
          }
        }
      }
    },
    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      copyright: 'Copyright © 2026 YeYuan'
    },
  }
})
