"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RIGHT_CONFIG = void 0;
exports.RIGHT_CONFIG = {
    sourcePath: "源文件路径，如: ./dist",
    targetPath: "服务器目标路径，如: /var/XXX/",
    targetServer: {
        host: "目标服务器IP地址",
        port: "端口号，sftp默认为22",
        username: "用户名",
        password: "密码",
    },
};
