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
exports.init = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mkdirp_1 = __importDefault(require("mkdirp")); //使用mkdirp包，可以避免一级一级创建目录
const chalk_1 = __importDefault(require("chalk"));
const util_1 = require("../../util");
const log = console.log;
function init(name) {
    const tip = new util_1.TipObj();
    tip.loading("创建中，请稍后");
    // process.cwd()获取工作区目录
    const projectDir = path_1.default.join(process.cwd(), name); // 项目创建路径
    const sourceDir = path_1.default.join(__dirname, "../../../template"); // 模板文件路径
    mkdirp_1.default(projectDir).then((made) => __awaiter(this, void 0, void 0, function* () {
        if (made === undefined) {
            tip.fail('"创建失败，存在同名目录"');
            return;
        }
        /**
         * copy模板文件
         */
        try {
            const dirRes = yield util_1.copyDir(sourceDir, projectDir);
            if (dirRes.err) {
                throw dirRes.err;
            }
        }
        catch (error) {
            tip.fail('拷贝模板项目失败');
            log(error.message);
            return;
        }
        /**
         * 修改package.json项目名
         */
        const packageJsonPath = path_1.default.join(projectDir, "package.json");
        const packageJson = require(packageJsonPath);
        packageJson.name = name;
        try {
            const writePackageJsonRes = yield util_1.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
            if (writePackageJsonRes.err) {
                throw writePackageJsonRes.err;
            }
        }
        catch (error) {
            tip.fail('设置package.json name失败');
            log(error.message);
            return;
        }
        /**
         * 重命名gitignroe.txt为.gitignore
         */
        try {
            const oldName = path_1.default.join(projectDir, 'gitignore.txt');
            const newName = path_1.default.join(projectDir, '.gitignore');
            fs_1.default.renameSync(oldName, newName);
        }
        catch (error) {
            tip.fail('.gitignore创建失败');
            log(error.message);
        }
        tip.success("创建成功, 接下来启动项目: ");
        log(`  ${chalk_1.default.greenBright("cd")} ${name}`);
        log(`  npm i`);
        log(`  npm run dev`);
        log(chalk_1.default.blue(`更多帮助请使用 white-box-cli --help 或者 npx white-box-cli --help 查看`));
    }));
}
exports.init = init;
