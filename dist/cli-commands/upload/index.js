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
const util_1 = require("../../util");
const log = console.log;
function upload(sourcePath, uploadConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const tip = new util_1.TipObj();
        const targetPath = uploadConfig.targetPath;
        const sftp = new ssh2_sftp_client_1.default();
        try {
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
                // TODO 添加upload结果监听
                console.log(`  ${info.source} 上传成功`);
            });
            yield sftp.uploadDir(sourcePath, targetPath);
            tip.success(`${sourcePath}内容成功上传至${targetPath}`);
            sftp.end();
        }
        catch (error) {
            tip.fail("上传目录失败，原因: ");
            log(error.message);
            return;
        }
    });
}
exports.upload = upload;
