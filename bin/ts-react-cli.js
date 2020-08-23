#!/usr/bin/env node

const { program } = require('commander');
const version = require('../package.json').version;

program.version(version, "-v, --version");

program
    .command("init <app-name>")
    .description('使用 ts-react-cli 初始化项目')
    .action( name => {
        const create = require('../create');
        create(name);
    });


program.parse(process.argv);