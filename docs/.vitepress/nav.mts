export default [
    {text: '首页', link: '/'},
    {
        text: '指南', link: '/指南/简介'
    },
    {
        text: '计算机基础', items: [
            {text: '计算机网络', link: '/计算机网络/初识计算机网络/协议的本质'},
            {text: '算法', link: '/algorithm/'},
        ]
    },
    {
        text: '编程语言', items: [
            {text: 'Java 文档', link: '/Java 文档/Java学习计划'},
        ]
    }, {
        text: '云服务', link: '/云服务/说明',
    },
    {
        text: 'AI', items: [
            {text: 'OpenClaw', link: '/AI/OpenClaw/OpenClaw 是什么'},
            {text: 'Vibe Coding', link: '/AI/Vibe Coding/01.Vibe Coding 是什么'},
        ]
    },
    {
        text: '项目实战', items: [
            {
                text: '入门', items: [
                    {text: 'Electron 扫雷大战', link: '/项目实战/入门/Electron 扫雷大战/01.开始'},
                ]
            },{
                text: '进阶', items: [
                    {text: 'Spring AI Alibaba 多智能体文章生成器', link: '/项目实战/进阶/Spring AI Alibaba 多智能体文章生成器/01.文章创作流程分析'},
                ]
            },
        ]
    },
    {
        text: '技能扩展', items:
            [
                {text: 'Agent', link: '/Java 文档/Java学习计划'},
            ]
    }
    ,
]
