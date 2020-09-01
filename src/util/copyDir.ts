
import fs from 'fs';
import path from 'path';
import Result from './Result';
import { readFile, writeFile, readDir, mkDir } from './index';

const isDirFun = function (path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, function (err, stats) {
            const isDir = stats.isDirectory();
            resolve(new Result(isDir, err));
        })
    });
};

module.exports = async function (sourceDir, targetDir) {
    const copyFun = async function (sourceDir, targetDir) {
        const res = await readDir(sourceDir);
        if (res.err) {
            throw new Error(res.err);
        }

        const files = res.data;

        for (const item of files) {
            const sourcePath = path.join(sourceDir, item); // 资源目录
            const targetPath = path.join(targetDir, item); // 复制目标路径

            const { data: isDir, err } = await isDirFun(sourcePath);
            if (err) {
                throw new Error(err);
            }

            if (isDir) {
                const mkDirRes = await mkDir(targetPath);
                if (mkDirRes.err) {
                    throw new Error(mkDirRes.err);
                }

                const recursionRes = await copyFun(sourcePath, targetPath);
                if (recursionRes.err) {
                    throw new Error(recursionRes.err);
                }
            } else {
                const readRes = await readFile(sourcePath);
                if (readRes.err) {
                    throw new Error(readRes.err);
                };

                const writeRes = await writeFile(targetPath, readRes.data);
                if (writeRes.err) {
                    throw new Error(writeRes.err);
                };
            }
        }
        return new Result(true, null);
    }


    const res = await copyFun(sourceDir, targetDir);

    return res;
};