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
const path_1 = __importDefault(require("path"));
const mkdirp_1 = __importDefault(require("mkdirp")); //使用mkdirp包，可以避免一级一级创建目录
const chalk_1 = __importDefault(require("chalk"));
const copyDir_1 = __importDefault(require("../../util/copyDir"));
const util_1 = require("../../util");
const TipObj_1 = __importDefault(require("../../util/TipObj"));
const log = console.log;
function init(name) {
    const tip = new TipObj_1.default();
    tip.loading("创建中，请稍后");
    // process.cwd()获取工作区目录
    const projectDir = path_1.default.join(process.cwd(), name); // 项目创建路径
    const sourceDir = path_1.default.join(__dirname, "../../../template"); // 模板文件路径
    mkdirp_1.default(projectDir).then((made) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (made === undefined) {
                throw new Error('创建失败，存在同名目录');
            }
            else {
                // copy 模板文件
                const dirRes = yield copyDir_1.default(sourceDir, projectDir);
                if (dirRes.err) {
                    throw dirRes.err;
                }
                // 修改package.json项目名
                const packageJsonPath = path_1.default.join(projectDir, "package.json");
                const packageJson = require(packageJsonPath);
                packageJson.name = name;
                const writePackageJsonRes = yield util_1.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
                if (writePackageJsonRes.err) {
                    throw writePackageJsonRes.err;
                }
                tip.success("创建成功, 接下来启动项目: ");
                log(`  ${chalk_1.default.greenBright.bold("cd")} ${name}`);
                log(`  npm i`);
                log(`  npm run dev ${chalk_1.default.magenta("or")} ts-react-cli dev`);
            }
        }
        catch (error) {
            tip.fail(error.message);
        }
    }));
}
exports.init = init;
