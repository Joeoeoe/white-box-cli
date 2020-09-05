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
exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const util_1 = require("../../util");
const constants_1 = require("./constants");
const log = console.log;
const validateUpload = function (config) {
    const keySets = new Set([
        "sourcePath",
        "targetPath",
        "targetServer",
        "targetServer.host",
        "targetServer.port",
        "targetServer.username",
        "targetServer.password",
    ]);
    for (const outKey of keySets) {
        let tempObj = config;
        const keyArray = outKey.split(".");
        for (const key of keyArray) {
            if (tempObj.hasOwnProperty(key)) {
                tempObj = tempObj[key];
            }
            else {
                return false;
            }
        }
    }
    return true;
};
function upload(optionObj, uploadConfigPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const tip = new util_1.TipObj();
        const sftp = new ssh2_sftp_client_1.default();
        // TODO 添加打包后再上传选项，先选择环境信息完毕再打包
        /**
         * 泄露确认
         */
        const confirmRes = yield inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'uploadConfirm',
                message: chalk_1.default.redBright('请确认upload.js不会外泄，比如.gitignore文件应该含upload.js路径!'),
                default: false,
            }
        ]);
        if (confirmRes.uploadConfirm === false) {
            return;
        }
        let uploadConfigArray = null;
        let uploadConfig = null;
        try {
            // 引入upload.js
            uploadConfigArray = require(uploadConfigPath)['serverArray'];
        }
        catch (error) {
            tip.fail(error.message);
            return;
        }
        /**
         * 环境选择
         */
        const envRes = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "envName",
                message: chalk_1.default.blueBright('请选择环境：'),
                choices: uploadConfigArray.map(item => item.name),
            },
        ]);
        uploadConfig = uploadConfigArray.find(item => item.name === envRes['envName']);
        try {
            // upload.js格式校验
            const formatRight = validateUpload(uploadConfig);
            if (formatRight === false) {
                throw new Error(`服务器信息配置有误`);
            }
        }
        catch (error) {
            tip.fail(error.message);
            log(chalk_1.default.greenBright('upload.js格式示例: '));
            // TODO 到时贴github链接
            log(JSON.stringify(constants_1.RIGHT_CONFIG, null, 2));
            return;
        }
        console.log(optionObj);
        if (optionObj['build']) {
            const prodWebpackPath = path_1.default.join(process.cwd(), "webpack.prod.js");
            const { build } = yield Promise.resolve().then(() => __importStar(require("../../cli-commands/build")));
            yield build(prodWebpackPath);
        }
        const sourcePath = uploadConfig.sourcePath;
        const targetPath = uploadConfig.targetPath;
        try {
            // 连接服务器是否有误
            tip.loading("正在连接服务器...");
            yield sftp.connect(uploadConfig.targetServer);
            tip.success("成功连接至服务器");
        }
        catch (error) {
            tip.fail("连接服务器失败，原因: ");
            log(error.message);
            return;
        }
        try {
            tip.success("开始上传...");
            sftp.on("upload", (info) => {
                console.log(`  上传成功: ${chalk_1.default.blueBright(info.source)}`);
            });
            yield sftp.uploadDir(sourcePath, targetPath);
            tip.success(`${sourcePath} 内容成功上传至 ${targetPath}`);
            sftp.end();
        }
        catch (error) {
            tip.fail("上传出现错误，原因: ");
            log(error.message);
            return;
        }
    });
}
exports.upload = upload;
