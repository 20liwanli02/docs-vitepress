// sidebar.mts
export default {
    // 默认侧边栏（首页等）
    '/': [
        {
            text: '简介',
            collapsed: false,
            items: [
                { text: '快速开始', link: '/简介/快速开始' }
            ]
        },
        // ... 其他默认侧边栏
    ],

    // 计算机网络专用侧边栏
    '/计算机网络/': [
        {
            text: '计算机网络',
            collapsed: false,
            items: [
                {
                    text: '初识计算机网络',
                    collapsed: false,
                    items: [
                        { text: '协议的本质', link: '/计算机网络/初识计算机网络/协议的本质' },
                        { text: '分层思想', link: '/计算机网络/初识计算机网络/分层思想' },
                        { text: '分层体系结构', link: '/计算机网络/初识计算机网络/分层体系结构' },
                        { text: '抓包：加深对网络底层原理的理解', link: '/计算机网络/初识计算机网络/抓包：加深对网络底层原理的理解' },
                    ]
                },
                {
                    text: '物理层和数据链路层',
                    collapsed: false,
                    items: [
                        { text: '物理层', link: '/计算机网络/物理层和数据链路层/物理层' },
                        { text: 'MAC 地址', link: '/计算机网络/物理层和数据链路层/MAC 地址' },
                        { text: '什么是链路', link: '/计算机网络/物理层和数据链路层/什么是链路' },
                    ]
                }
            ]
        }
    ],

    // 计算机网络专用侧边栏
    ["/Java 文档/"]: [
        {
            text: 'Java 文档',
            collapsed: false,
            items: [
                { text: 'Java学习计划', link: '/Java 文档/Java学习计划' },
                { text: 'Java 公共代码抽象', link: '/Java 文档/Java 公共代码抽象' },
                { text: '理解 JVM 内存模型', link: '/Java 文档/理解 JVM 内存模型' },
                { text: 'Minio 中 Key 的缓存问题', link: '/Java 文档/Minio 中 Key 的缓存问题' },
            ]
        },
    ],

    // 算法专用侧边栏
    '/algorithm/': [
        {
            text: '算法',
            collapsed: false,
            items: [
                { text: '算法入门', link: '/algorithm/' }
            ]
        }
    ],

    // 计算机网络专用侧边栏
    ["/云服务/"]: [
        {
            text: '云服务',
            collapsed: false,
            items: [
                { text: 'Cloudflare 文档', link: '/云服务/Cloudflare 文档' },
                { text: 'Git 常用命令', link: '/云服务/Git 常用命令' },
                { text: 'Github 推送失败问题', link: '/云服务/Github 推送失败问题' },
            ]
        },
    ],
}
