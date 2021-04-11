
/**
 * @link 当为`/xx/xx/`这种菜单时，xx/指向的是其文件夹所在的README.md，所以对应的文件夹下面需要添加README.md文件
 */

module.exports = [
    {
        text: '面试题', link: '/interview/jsQuestion/JS面试题.md'
    },
    {
        text: '懵逼指南', link: '/guide/'
    },
    {
        text: '工具箱',
        items: [
			{
                text: '在线编辑',
				items: [
					{text: '图片压缩', link: 'https://tinypng.com/'}
				]
            },
			{
                text: '在线服务',
				items: [
					{text: '阿里云', link: 'https://www.aliyun.com/'},
					{text: '腾讯云', link: 'https://cloud.tencent.com/'}
				]
            },
			{
                text: '博客指南',
				items: [
					{text: '掘金', link: 'https://juejin.im/'},
					{text: 'CSDN', link: 'https://blog.csdn.net/'}
				]
            }
        ]
    }
]
