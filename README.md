# ts-react-cli
ts-react项目脚手架

# 特点
未把webpack配置隐藏，透明化配置。对于个人项目而言方便折腾，但不适用于公司团队项目（因为未隐藏webpack配置，不利于升级、维护）

# 功能支持
* Typescript
* React及其HMR
* ESLint
* Prettier（已整合入ESLint -fix，由于会生成.vscode/settings.json配置文件，vscode下保存时会自动格式化代码）
* CSS、Less及其Module

# ts-react-cli命令及选项
## 初始化项目
```
ts-react-cli  init  [options]  <app-name>
```

# 目录结构
* bin: 执行脚本
* create: 文件生成
* util: 单元方法
* playground: 测试


# TODOList
* 自定义端口支持 √
* init进度完善 √
* npx执行 ⏰
* 脚手架提示完善
* 文档编写