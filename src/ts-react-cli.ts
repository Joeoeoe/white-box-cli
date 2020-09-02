#!/usr/bin/env node
import { program } from "commander";
import path from "path";
import { parseCmd } from "./util";

const version = require("../package.json").version;

program.version(version, "-v, --version");

program
  .command("init <app-name>")
  .description("使用 ts-react-cli 初始化项目")
  .action(async (name: string) => {
    const { init } = await import("./cli-commands/init");

    init(name);
  });

program
  .command("dev")
  .description("进入开发模式")
  .option("-p, --port", "指定开发端口，默认为8080")
  .action(async (cmd) => {
    const optionObj = parseCmd(cmd); // 命令行option选项
    const devWebpackPath = path.join(process.cwd(), "webpack.dev.js"); // 项目webpack.dev.js路径
    const { dev } = await import("./cli-commands/dev");

    dev(optionObj, devWebpackPath);
  });

program.parse(process.argv);
