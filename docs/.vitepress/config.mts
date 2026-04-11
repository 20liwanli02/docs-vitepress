import { defineConfig } from 'vitepress'
import nav from './nav.mts'
import sidebar from "./sidebar.mts";
import search from './search.mjs';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "夜愿-文档库",
  description: "A VitePress Site",
  themeConfig: {
    logo: '/logo.png',
    aside: false,
    outline: {
      label: '本页目录'  // 自定义中文标题
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
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
    search: search,
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      copyright: 'Copyright © 2026 YuHan'
    },
  },
  markdown: {
    lineNumbers: true
  }
})
