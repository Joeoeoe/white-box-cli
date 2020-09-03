import fs from "fs";
import path from "path";
import { Result } from "./Result";
import { readFile, writeFile, readDir, mkDir } from "./basic";

const isDirFun = function (path: string) {
  return new Promise<Result>((resolve, reject) => {
    fs.stat(path, function (err, stats) {
      const isDir = stats.isDirectory();
      resolve(new Result(isDir, err));
    });
  });
};

export async function copyDir(sourceDir: string, targetDir: string) {
  const copyFun = async function (sourceDir, targetDir) {
    const res = await readDir(sourceDir);
    if (res.err) {
      throw res.err;
    }

    const files = res.data;

    for (const item of files) {
      const sourcePath = path.join(sourceDir, item); // 资源目录
      const targetPath = path.join(targetDir, item); // 复制目标路径

      const { data: isDir, err } = await isDirFun(sourcePath);
      if (err) {
        throw err;
      }

      if (isDir) {
        const mkDirRes = await mkDir(targetPath);
        if (mkDirRes.err) {
          throw mkDirRes.err;
        }

        const recursionRes = await copyFun(sourcePath, targetPath);
        if (recursionRes.err) {
          throw recursionRes.err;
        }
      } else {
        const readRes = await readFile(sourcePath);
        if (readRes.err) {
          throw readRes.err;
        }

        const writeRes = await writeFile(targetPath, readRes.data);
        if (writeRes.err) {
          throw writeRes.err;
        }
      }
    }
    return new Result(true, null);
  };

  const res = await copyFun(sourceDir, targetDir);

  return res;
}
