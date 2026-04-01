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
                        { text: '协议的本质', link: '/计算机网络/初识计算机网络/协议的本质' }
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
    ]
}
