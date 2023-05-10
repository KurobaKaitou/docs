export default {
    '/backend/netty/': [
        {
            text: 'Netty',
            collapsable: false, // 可选的, 默认值是 true,
            children: [
                'nio.md',
                'introduction.md',
                'advanced.md',
                'optimization.md'
            ]
        }
    ],
    '/datastruct/': [{
        text: '数据结构',
        collapsable: false, // 可选的, 默认值是 true,
        children: [
            'preview.md',
            'sparseArray.md',
        ]
    }]
}