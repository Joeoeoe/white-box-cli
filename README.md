# ts-react-cli
ts-react项目脚手架

特点:
* 未把webpack配置隐藏，透明化配置。对于个人项目而言方便折腾，但不适用于公司团队项目（因为未隐藏webpack配置，不利于升级、维护）

功能支持:
* Typescript
* React及其HMR
* ESLint
* Prettier（已整合入ESLint -fix，在vscode下，保存时会自动格式化代码）
* CSS、Less及其Module

npm命令:
* dev: 进入开发模式
* build: 打包
* fix: ESLint修复所有文件
* format: Prettier格式化所有文件