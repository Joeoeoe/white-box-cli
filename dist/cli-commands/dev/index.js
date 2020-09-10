"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dev = void 0;
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const chalk_1 = __importDefault(require("chalk"));
const defaultConfig_1 = require("./defaultConfig");
const util_1 = require("../../util");
const log = console.log;
function dev(cliOption, devWebpackPath) {
    const tip = new util_1.TipObj();
    tip.loading('构建中');
    // 配置来源：webpack.dev.js与脚手架输入及部分默认
    // 对于各配置，优先级为  默认 < dev.js配置 < cli输入
    const config = require(devWebpackPath);
    const devServerObj = Object.assign(defaultConfig_1.DEV_SERVER_DEFAULT, config.devServer, cliOption);
    config.devServer = devServerObj;
    // 端口
    const port = devServerObj["port"];
    webpack_dev_server_1.default.addDevServerEntrypoints(config, devServerObj);
    const compiler = webpack_1.default(config);
    compiler.hooks.done.tap("done", () => {
        log();
        tip.success(`构建成功! ${chalk_1.default.blueBright("http://localhost:" + port + "/")}`);
    });
    compiler.hooks.failed.tap('failed', (error) => {
        tip.fail(error.message);
    });
    const server = new webpack_dev_server_1.default(compiler, devServerObj);
    server.listen(port, "127.0.0.1", () => {
        console.log(`Starting server on http://localhost:${port}`);
    });
}
exports.dev = dev;
