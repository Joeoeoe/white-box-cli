#!/usr/bin/env node

const { program, option } = require('commander');
const version = require('../package.json').version;
const { parseCmd } = require('../util');

program.version(version, "-v, --version");

program
    .command("init <app-name>")
    .description('使用 ts-react-cli 初始化项目')
    .action(name => {
        const create = require('../create');
        create(name);
    });


program
    .command('dev')
    .description('进入开发模式')
    .option('-p, --port', '指定开发端口，默认为8080')
    .action((cmd) => {
        const optionsObj = parseCmd(cmd);
    })

program.parse(process.argv);