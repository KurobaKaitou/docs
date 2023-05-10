export default [
    { text: '首页', link: '/' },
    { text: '前言', link: '/preview/' },
    { text: '数据结构', link: '/datastruct/preview.md' },
    {
        text: '后端', ariaLabel: 'Backend', children: [
            {
                text: 'Netty', link: '/backend/netty/nio.md'
            }
        ]
    },
    {
        text: '更多', ariaLabel: 'Other', children: [
            { text: '书签', link: '/bookmark/' },
            {
                text: '站点', children: [
                    { text: 'Design Pattern', link: 'https://java-design-patterns.com' }
                ]
            }
        ]
    },
    { text: '🚇 开往', link: 'https://www.travellings.cn/go.html' },
]