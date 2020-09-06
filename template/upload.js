/**
 * 注意！请注意防止敏感信息外泄！.gitignore已添加upload.js，防止upload.js提交到github上！
 * 注意！请注意防止敏感信息外泄！.gitignore已添加upload.js，防止upload.js提交到github上！
 * 注意！请注意防止敏感信息外泄！.gitignore已添加upload.js，防止upload.js提交到github上！
 */

// eslint-disable-next-line no-undef
module.exports = {
    // 环境数组
    serverArray: [
        {
            name: "dev",//环境名称
            sourcePath: "", //源文件路径，如: ./dist
            targetPath: "", //服务器目标路径，如: /var/XXX/
            targetServer: {
                host: "", //目标服务器IP地址
                port: "", //端口号，sftp默认为22
                username: "", //用户名
                password: "", //密码
            },
        },
        {
            name: "prod",//环境名称
            sourcePath: "", //源文件路径，如: ./dist
            targetPath: "", //服务器目标路径，如: /var/XXX/
            targetServer: {
                host: "", //目标服务器IP地址
                port: "", //端口号，sftp默认为22
                username: "", //用户名
                password: "", //密码
            },
        }
    ]
}