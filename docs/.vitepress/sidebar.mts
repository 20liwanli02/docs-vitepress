export default [
    {
        text: '简介',
        collapsed: false,
        items: [
            {text: '快速开始', link: '/简介/快速开始'}
        ]
    },
    {
        text: 'Java 文档',
        collapsed: false,
        items: [
            {text: 'Java 公共代码抽象', link: '/Java 文档/Java 公共代码抽象'},
            {text: '理解 JVM 内存模型', link: '/Java 文档/理解 JVM 内存模型'},
        ]
    }, {
        text: '计算机网络',
        collapsed: false,
        items: [ // link: '/计算机网络/初识计算机网络/协议的本质'
            {
                text: '初识计算机网络',
                collapsed: false,
                items: [
                    {text: '协议的本质', link: '/计算机网络/初识计算机网络/协议的本质'}
                ]
            },
        ]
    }, {
        text: '扩展',
        collapsed: false,
        items: [
            {text: '扩展文档', link: '/扩展/扩展文档'},
            {text: 'Cloudflare 使用文档', link: '/扩展/Cloudflare 使用文档'},
        ]
    },
]
