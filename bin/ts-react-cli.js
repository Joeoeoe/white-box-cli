#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");
const version = require("../package.json").version;
const { parseCmd } = require("../util");

program.version(version, "-v, --version");

program
  .command("init <app-name>")
  .description("使用 ts-react-cli 初始化项目")
  .action((name) => {
    const init = require("../cli-commands/init");
    
    init(name);
  });

program
  .command("dev")
  .description("进入开发模式")
  .option("-p, --port", "指定开发端口，默认为8080")
  .action((cmd) => {
    const optionObj = parseCmd(cmd); // 命令行option选项
    const devWebpackPath = path.join(process.cwd(), "webpack.dev.js"); // 项目webpack.dev.js路径
    const dev = require("../cli-commands/dev");

    dev(optionObj, devWebpackPath);
  });

program.parse(process.argv);
