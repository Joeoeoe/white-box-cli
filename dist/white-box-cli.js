#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const basic_1 = require("./util/basic");
const constants_1 = require("./constants");
const version = require("../package.json").version;
commander_1.program.version(version, "-v, --version");
commander_1.program
    .command("init <app-name>")
    .description("使用 white-box-cli 初始化项目")
    .action((name) => __awaiter(void 0, void 0, void 0, function* () {
    const { init } = yield Promise.resolve().then(() => __importStar(require("./cli-commands/init")));
    init(name);
}));
commander_1.program
    .command("dev")
    .description("进入开发模式")
    .option("-p, --port [port]", "指定开发端口")
    .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
    const optionObj = basic_1.parseCmd(cmd); // 命令行option选项
    const devWebpackPath = path_1.default.join(process.cwd(), "webpack.dev.js"); // 项目webpack.dev.js路径
    const { dev } = yield Promise.resolve().then(() => __importStar(require("./cli-commands/dev")));
    dev(optionObj, devWebpackPath);
}));
commander_1.program
    .command("build")
    .description("打包应用")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const prodWebpackPath = path_1.default.join(process.cwd(), "webpack.prod.js");
    const { build } = yield Promise.resolve().then(() => __importStar(require("./cli-commands/build")));
    build(prodWebpackPath);
}));
commander_1.program
    .command("upload")
    .description("上传至FTP服务器")
    .option("-b, --build", "打包后再上传")
    .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
    const optionObj = basic_1.parseCmd(cmd);
    const cwd = process.cwd();
    const configPath = path_1.default.join(cwd, constants_1.UPLOAD_NAME);
    const { upload } = yield Promise.resolve().then(() => __importStar(require("./cli-commands/upload")));
    upload(optionObj, configPath);
}));
commander_1.program.parse(process.argv);
