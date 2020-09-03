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
function upload(sourcePath, uploadConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const tip = new util_1.TipObj();
        const targetPath = uploadConfig.targetPath;
        const sftp = new ssh2_sftp_client_1.default();
        yield sftp.connect(uploadConfig.targetServer);
        sftp.on('upload', info => {
            console.log(`uploaded: ${info.source}`);
        });
        const uploadRes = yield sftp.uploadDir(sourcePath, targetPath);
        console.log('上传成功');
        // try {
        //   const filesRes = await travelDir(sourcePath);
        //   if (filesRes.err) {
        //     throw filesRes.err;
        //   }
        //   const filesList = filesRes.data;
        //   await sftp.connect(uploadConfig.targetServer);
        //   console.log(filesList);
        //   for (const file of filesList) {
        //     const data = fs.createReadStream(file);
        //     const serverFilePath = path.join(targetPath, file);
        //     await sftp.put(data, serverFilePath.replace(/\\/g, '/'));// 解决linux与window下正反斜杆问题
        //     console.log(`${file}上传成功`);
        //   }
        // } catch (error) {
        //   tip.fail(error.message);
        // }
    });
}
exports.upload = upload;
