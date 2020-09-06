import fs from 'fs';
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
    if (made === undefined) {
      tip.fail('"创建失败，存在同名目录"');
      return;
    }
    /**
     * copy模板文件
     */
    try {
      const dirRes = await copyDir(sourceDir, projectDir);
      if (dirRes.err) {
        throw dirRes.err;
      }
    } catch (error) {
      tip.fail('拷贝模板项目失败');
      log(error.message);
      return;
    }


    /**
     * 修改package.json项目名
     */
    const packageJsonPath = path.join(projectDir, "package.json");
    const packageJson = require(packageJsonPath);
    packageJson.name = name;

    try {
      const writePackageJsonRes = await writeFile(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2)
      );
      if (writePackageJsonRes.err) {
        throw writePackageJsonRes.err;
      }
    } catch (error) {
      tip.fail('设置package.json name失败');
      log(error.message);
      return;
    }


    /**
     * 重命名gitignroe.txt为.gitignore
     */
    try {
      const oldName = path.join(projectDir, 'gitignore.txt');
      const newName = path.join(projectDir, '.gitignore');
      fs.renameSync(oldName, newName);
    } catch (error) {
      tip.fail('.gitignore创建失败');
      log(error.message);
    }


    tip.success("创建成功, 接下来启动项目: ");
    log(`  ${chalk.greenBright("cd")} ${name}`);
    log(`  npm i`);
    log(`  npm run dev`);
    log(chalk.blue(`更多帮助请使用 white-box-cli --help 或者 npx white-box-cli --help 查看`))

  });
}
