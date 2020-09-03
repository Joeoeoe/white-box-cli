import { readDir, isDirFun } from "./basic";
import path from "path";
import { Result } from "./Result";

export const travelDir = async function (dir: string) {
  const filesList: string[] = [];

  const travel = async function (dir: string, filesList: string[]) {
    const res = await readDir(dir);
    if (res.err) {
      throw res.err;
    }
    const files = res.data;

    for (const item of files) {
      const itemPath = path.join(dir, item);
      const { data: isDir, err } = await isDirFun(itemPath);
      if (err) {
        throw err;
      }

      if (isDir) {
        const recurseRes = await travel(itemPath, filesList);
        if (recurseRes.err) {
          throw recurseRes.err;
        }
      } else {
        filesList.push(itemPath);
      }
    }

    return new Result(filesList, null);
  };

  const res = await travel(dir, filesList);

  return res;
};
