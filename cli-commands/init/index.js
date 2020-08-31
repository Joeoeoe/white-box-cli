const path = require("path");
const mkdirp = require("mkdirp"); //使用mkdirp包，可以避免一级一级创建目录
const ora = require('ora');
const chalk = require('chalk');
const copyDir = require("../../util/copyDir");
const { writeFile } = require("../../util");



module.exports = function (name) {
  const spinner = ora('创建中，请稍后').start();

  // process.cwd()获取工作区目录
  const projectDir = path.join(process.cwd(), name); // 项目创建路径
  const sourceDir = path.join(__dirname, "./template"); // 资源文件路径

  mkdirp(projectDir).then(async (made) => {
    if (made === undefined) {
      spinner.fail('创建失败，存在同名目录');
    } else {
      // copy 模板文件
      const dirRes = await copyDir(sourceDir, projectDir);
      // 修改package.json项目名
      const packageJsonPath = path.join(projectDir, "package.json");
      const packageJson = require(packageJsonPath);
      packageJson.name = name;

      const writePackageJsonRes = await writeFile(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2)
      );

      spinner.succeed('创建成功');
    }
  });
};
