"use strict";
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
function upload(uploadConfigPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const tip = new util_1.TipObj();
        const sftp = new ssh2_sftp_client_1.default();
        let answerRes = null;
        answerRes = yield inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'uploadConfirm',
                message: chalk_1.default.redBright('请确认upload.json不会外泄，比如.gitignore文件应该含upload.json路径!'),
                default: false,
            }
        ]);
        if (answerRes.uploadConfirm === false) {
            return;
        }
        let uploadConfig = null;
        try {
            // upload.json require是否有误
            uploadConfig = require(uploadConfigPath);
        }
        catch (error) {
            tip.fail(error.message);
            return;
        }
        try {
            // uploadJson格式校验
            const formatRight = validateUpload(uploadConfig);
            if (formatRight === false) {
                throw new Error(`upload.json格式错误`);
            }
        }
        catch (error) {
            tip.fail(error.message);
            log(chalk_1.default.greenBright('upload.json格式示例: '));
            log(JSON.stringify(constants_1.RIGHT_CONFIG, null, 2));
            return;
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
