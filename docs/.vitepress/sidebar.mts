// sidebar.mts
export default {
    // 默认侧边栏（首页等）
    '/': [
        {
            text: '指南',
            collapsed: false,
            items: [
                { text: '快速开始', link: '/指南/快速开始' }
            ]
        },
        // ... 其他默认侧边栏
    ],

    // 计算机网络专用侧边栏
    ["/指南/"]: [
        {
            text: '指南',
            collapsed: false,
            items: [
                { text: '简介', link: '/指南/简介' },
                { text: '归档', link: '/指南/归档' },
            ]
        },
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
                        { text: '链路层的帧格式', link: '/计算机网络/物理层和数据链路层/链路层的帧格式' },
                        { text: '链路层常用协议', link: '/计算机网络/物理层和数据链路层/链路层常用协议' },
                        { text: '交叉线连接两台主机', link: '/计算机网络/物理层和数据链路层/交叉线连接两台主机' },
                        { text: '集线器连接多台主机', link: '/计算机网络/物理层和数据链路层/集线器连接多台主机' },
                        { text: '仿真解析集线器通信全过程', link: '/计算机网络/物理层和数据链路层/仿真解析集线器通信全过程' },
                        { text: '交换机连接多台主机', link: '/计算机网络/物理层和数据链路层/交换机连接多台主机' },
                        { text: '交换机的工作原理', link: '/计算机网络/物理层和数据链路层/交换机的工作原理' },
                    ]
                },
                {
                    text: '网络层',
                    collapsed: false,
                    items: [
                        { text: '认识 IP 地址', link: '/计算机网络/网络层/认识 IP 地址' },
                        { text: 'IP 地址的分类', link: '/计算机网络/网络层/IP 地址的分类' },
                        { text: '划分子网', link: '/计算机网络/网络层/划分子网' },
                        { text: '公网 IP 和私网 IP', link: '/计算机网络/网络层/公网 IP 和私网 IP' },
                        { text: 'IP 地址总结', link: '/计算机网络/网络层/IP 地址总结' },
                        { text: '认识网络层', link: '/计算机网络/网络层/认识网络层' },
                        { text: '深入理解 IP 协议', link: '/计算机网络/网络层/深入理解 IP 协议' },
                        { text: '抓包加深对 IP 协议理解', link: '/计算机网络/网络层/抓包加深对 IP 协议的理解' },
                        { text: 'ARP 协议', link: '/计算机网络/网络层/ARP 协议' },
                        { text: 'ICMP 协议', link: '/计算机网络/网络层/ICMP 协议' },
                        { text: '路由器连接多个网络', link: '/计算机网络/网络层/路由器连接多个网络' },
                        { text: '仿真演示路由器的工作原理', link: '/计算机网络/网络层/仿真演示路由器的工作原理' },
                    ]
                },
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
                { text: '脚手架是什么', link: '/Java 文档/脚手架是什么' },
            ]
        },
    ],

    // 计算机网络专用侧边栏
    ["/AI/OpenClaw/"]: [
        {
            text: 'OpenClaw',
            collapsed: false,
            items: [
                { text: 'OpenClaw 是什么', link: '/AI/OpenClaw/OpenClaw 是什么' },
                { text: 'OpenClaw 部署', link: '/AI/OpenClaw/OpenClaw 部署' },
                { text: 'OpenClaw 快速上手', link: '/AI/OpenClaw/OpenClaw 快速上手' },
                { text: 'OpenClaw 本地文件管理', link: '/AI/OpenClaw/OpenClaw 本地文件管理' },
                { text: 'OpenClaw 知识库管理', link: '/AI/OpenClaw/OpenClaw 知识库管理' },
            ]
        },
    ],
    // 计算机网络专用侧边栏
    ["/项目实战/进阶/"]: [
        {
            text: 'Spring AI Alibaba 多智能体文章生成器',
            collapsed: false,
            items: [
                { text: '文章创作流程分析', link: '/项目实战/进阶/Spring AI Alibaba 多智能体文章生成器/01.文章创作流程分析' },
                { text: '文章创作流程 FAQ', link: '/项目实战/进阶/Spring AI Alibaba 多智能体文章生成器/02.文章创作流程 FAQ' },
                { text: 'Stripe 支付流程分析', link: '/项目实战/进阶/Spring AI Alibaba 多智能体文章生成器/03.Stripe 支付流程分析' },
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
