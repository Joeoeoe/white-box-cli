var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs');
const path = require('path');
const Result = require('./Result');
const { readFile, writeFile, readDir, mkDir } = require('./index');
const isDirFun = function (path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, function (err, stats) {
            const isDir = stats.isDirectory();
            resolve(new Result(isDir, err));
        });
    });
};
module.exports = function (sourceDir, targetDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const copyFun = function (sourceDir, targetDir) {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield readDir(sourceDir);
                if (res.err) {
                    throw new Error(res.err);
                }
                const files = res.data;
                for (const item of files) {
                    const sourcePath = path.join(sourceDir, item); // 资源目录
                    const targetPath = path.join(targetDir, item); // 复制目标路径
                    const { data: isDir, err } = yield isDirFun(sourcePath);
                    if (err) {
                        throw new Error(err);
                    }
                    if (isDir) {
                        const mkDirRes = yield mkDir(targetPath);
                        if (mkDirRes.err) {
                            throw new Error(mkDirRes.err);
                        }
                        const recursionRes = yield copyFun(sourcePath, targetPath);
                        if (recursionRes.err) {
                            throw new Error(recursionRes.err);
                        }
                    }
                    else {
                        const readRes = yield readFile(sourcePath);
                        if (readRes.err) {
                            throw new Error(readRes.err);
                        }
                        ;
                        const writeRes = yield writeFile(targetPath, readRes.data);
                        if (writeRes.err) {
                            throw new Error(writeRes.err);
                        }
                        ;
                    }
                }
                return new Result(true, null);
            });
        };
        const res = yield copyFun(sourceDir, targetDir);
        return res;
    });
};
