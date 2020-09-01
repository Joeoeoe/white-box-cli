var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require("path");
const mkdirp = require("mkdirp"); //使用mkdirp包，可以避免一级一级创建目录
const ora = require('ora');
const chalk = require('chalk');
const copyDir = require("../../util/copyDir");
const { writeFile } = require("../../util");
const log = console.log;
module.exports = function (name) {
    const spinner = ora('创建中，请稍后').start();
    // process.cwd()获取工作区目录
    const projectDir = path.join(process.cwd(), name); // 项目创建路径
    const sourceDir = path.join(__dirname, "./template"); // 资源文件路径
    mkdirp(projectDir).then((made) => __awaiter(this, void 0, void 0, function* () {
        if (made === undefined) {
            spinner.fail('创建失败，存在同名目录');
        }
        else {
            // copy 模板文件
            const dirRes = yield copyDir(sourceDir, projectDir);
            // 修改package.json项目名
            const packageJsonPath = path.join(projectDir, "package.json");
            const packageJson = require(packageJsonPath);
            packageJson.name = name;
            const writePackageJsonRes = yield writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
            // TODO 思考init时要怎么做，因为推荐本地安装使用
            spinner.succeed('创建成功, 接下来启动项目: ');
            log(`  ${chalk.greenBright.bold('cd')} ${name}`);
            log(`  npm i`);
            log(`  npm run dev ${chalk.magenta('or')} ts-react-cli dev`);
        }
    }));
};
