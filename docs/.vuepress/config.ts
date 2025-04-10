import { defineUserConfig, defaultTheme } from 'vuepress'
import navConfig from './config/navs'
import sideConfig from './config/sides'
import pluginConfig from './config/plugins'

export default defineUserConfig({
    title: 'hikari',
    description: '这是一个由Vuepress构建的文档',
    head: [
        ['link', { rel: 'icon', href: '/docs/avatar.jpg' }]
    ],
    base: '/docs/',
    theme: defaultTheme({
        repo: 'KurobaKaitou/docs',
        lastUpdated: true,
        lastUpdatedText: '上次更新',
        contributors: false,
        contributorsText: '贡献者',
        editLink: true,
        editLinkText: '编辑此页',
        docsBranch: 'main',
        docsDir: 'docs',
        navbar: navConfig,
        sidebar: sideConfig
    }),
    markdown: {
        code: {
            lineNumbers: false
        }
    },
    plugins: pluginConfig
})