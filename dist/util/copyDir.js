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
exports.copyDir = void 0;
const path_1 = __importDefault(require("path"));
const Result_1 = require("./Result");
const basic_1 = require("./basic");
function copyDir(sourceDir, targetDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const copyFun = function (sourceDir, targetDir) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield basic_1.readDir(sourceDir);
                if (res.err) {
                    throw res.err;
                }
                const files = res.data;
                for (const item of files) {
                    const sourcePath = path_1.default.join(sourceDir, item); // 资源目录
                    const targetPath = path_1.default.join(targetDir, item); // 复制目标路径
                    const { data: isDir, err } = yield basic_1.isDirFun(sourcePath);
                    if (err) {
                        throw err;
                    }
                    if (isDir) {
                        const mkDirRes = yield basic_1.mkDir(targetPath);
                        if (mkDirRes.err) {
                            throw mkDirRes.err;
                        }
                        const recursionRes = yield copyFun(sourcePath, targetPath);
                        if (recursionRes.err) {
                            throw recursionRes.err;
                        }
                    }
                    else {
                        const readRes = yield basic_1.readFile(sourcePath);
                        if (readRes.err) {
                            throw readRes.err;
                        }
                        const writeRes = yield basic_1.writeFile(targetPath, readRes.data);
                        if (writeRes.err) {
                            throw writeRes.err;
                        }
                    }
                }
                return new Result_1.Result(true, null);
            });
        };
        const res = yield copyFun(sourceDir, targetDir);
        return res;
    });
}
exports.copyDir = copyDir;
