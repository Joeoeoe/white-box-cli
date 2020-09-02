# ts-react-cli

ts-react 项目脚手架

# 特点

未把 webpack 配置隐藏，透明化配置。对于个人项目而言方便折腾，但不适用于公司团队项目（因为未隐藏 webpack 配置，不利于升级、维护）

# 功能支持

- Typescript
- React 及其 HMR
- ESLint
- Prettier（已整合入 ESLint -fix，由于会生成.vscode/settings.json 配置文件，vscode 下保存时会自动格式化代码）
- CSS、Less 及其 Module

# ts-react-cli 命令及选项

## 初始化项目

```
ts-react-cli  init  [options]  <app-name>
```

# 目录结构

- bin: 执行脚本
- create: 文件生成
- util: 单元方法
- playground: 测试

# TODOList

- 自定义端口支持 √
- init 进度完善 √
- npx 执行 √
- 脚手架 typescript 改写 √
- build功能 √
- 脚手架报错机制 √
- 脚手架提示完善
- template 项目 typescript 本地安装
- upload 至服务器
- 文档编写
