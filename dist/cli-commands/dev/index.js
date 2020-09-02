"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dev = void 0;
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const defaultConfig_1 = require("./defaultConfig");
const log = console.log;
// 清除值为undefined的key
const cleanOption = function (option) {
    const cleanedOption = {};
    Object.keys(option).forEach(function (key) {
        if (option[key] !== undefined) {
            cleanedOption[key] = option[key];
        }
    });
    return cleanedOption;
};
function dev(cliOption, devWebpackPath) {
    const spinner = ora_1.default("构建中").start();
    // 配置来源：webpack.dev.js与脚手架输入及部分默认
    // 对于各配置，优先级为  默认 < dev.js配置 < cli输入
    const config = require(devWebpackPath);
    const devServerPbj = Object.assign(defaultConfig_1.DEV_SERVER_DEFAULT, config.devServer, cleanOption(cliOption));
    config.devServer = devServerPbj;
    // 端口
    const port = devServerPbj["port"];
    webpack_dev_server_1.default.addDevServerEntrypoints(config, devServerPbj);
    const compiler = webpack_1.default(config);
    compiler.hooks.done.tap("test", () => {
        log();
        spinner.succeed(`Compiled succeed! Starting server on ${chalk_1.default.blueBright.bold("http://localhost:" + port + "/")}`);
    });
    const server = new webpack_dev_server_1.default(compiler, devServerPbj);
    server.listen(port, "127.0.0.1", () => {
        console.log(`Starting server on http://localhost:${port}`);
    });
}
exports.dev = dev;
