import { searchPlugin } from '@vuepress/plugin-search'
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { VssuePlugin } from "@laoergege/vuepress-plugin-vssue-next-compat";

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
    mdEnhancePlugin({
        // 你的选项
        mermaid: true
    }),
    VssuePlugin({
        platform:'github-v4',
        owner:'KurobaKaitou',
        repo:'docs',
        clientId:'f34e262164dcb3afe992',
        clientSecret:'1ab8f5e33b5432207d7b0ffbf7b6f8f8003331bf'
    })
]