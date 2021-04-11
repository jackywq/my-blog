
const nav = require('./nav.js');
const sidebar = require('./sidebar.js');

module.exports = {
    title: '牧游blog',
    description: '牧游带你上王者',
    dest: './dist',
    port: '7777',
    // sidebar: 'auto',
    head: [
        ['link', {rel: 'icon', href: '/img/favicon.ico'}],
        ["link", { rel: "stylesheet", href: "/css/style.css" }],
        ["script", { charset: "utf-8", src: "/js/main.js" }],//新加入
    ],

    markdown: {
        lineNumbers: true
    },

    themeConfig: {
        nav,
        sidebar,
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    },

    // [热更新] 监听文件变化，自动重新构建 https://vuepress.vuejs.org/zh/config/?#extrawatchfiles
    extraWatchFiles: [
        '.vuepress/'
    ]
}
