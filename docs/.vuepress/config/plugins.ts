import { searchPlugin } from '@vuepress/plugin-search'
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'

export default [
    searchPlugin({
        // 配置项
        locales: {
            '/': {
                placeholder: 'ctrl + f 搜索',
            }
        },
        hotKeys: [
            {
                key: 'f',
                ctrl: true
            },
            {
                key: 'F',
                ctrl: true
            },
        ],
        maxSuggestions: 10,
        // 排除首页
        isSearchable: (page) => page.path !== '/',
        // 允许搜索 Frontmatter 中的 `tags`
        getExtraFields: (page) => (page.frontmatter.tags ?? []) as string[],
    }),
    copyCodePlugin({
        showInMobile: true
    }),
    
]