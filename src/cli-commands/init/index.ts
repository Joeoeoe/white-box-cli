import path from "path";
import mkdirp from "mkdirp"; //使用mkdirp包，可以避免一级一级创建目录
import chalk from "chalk";
import { TipObj, copyDir, writeFile } from "../../util";

const log = console.log;

export function init(name) {
  const tip = new TipObj();

  tip.loading("创建中，请稍后");

  // process.cwd()获取工作区目录
  const projectDir = path.join(process.cwd(), name); // 项目创建路径
  const sourceDir = path.join(__dirname, "../../../template"); // 模板文件路径

  mkdirp(projectDir).then(async (made) => {
    try {
      if (made === undefined) {
        throw new Error("创建失败，存在同名目录");
      } else {
        // copy 模板文件
        const dirRes = await copyDir(sourceDir, projectDir);
        if (dirRes.err) {
          throw dirRes.err;
        }

        // 修改package.json项目名
        const packageJsonPath = path.join(projectDir, "package.json");
        const packageJson = require(packageJsonPath);
        packageJson.name = name;

        const writePackageJsonRes = await writeFile(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2)
        );
        if (writePackageJsonRes.err) {
          throw writePackageJsonRes.err;
        }

        tip.success("创建成功, 接下来启动项目: ");
        log(`  ${chalk.greenBright("cd")} ${name}`);
        log(`  npm i`);
        log(`  npm run dev ${chalk.magenta("or")} ts-react-cli dev`);
      }
    } catch (error) {
      tip.fail(error.message);
    }
  });
}
