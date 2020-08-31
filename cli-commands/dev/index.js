const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const path = require("path");
const { DEV_SERVER_DEFAULT } = require("./defaultConfig");

// 清除值为undefined的key
const cleanOption = function (option) {
  const cleanedOption = {};
  Object.keys(option).forEach(function (key) {
    if (option[key] !== undefined) {
      cleanedOption[key] = option[key];
    }
  });
  return cleanedOption;
};

module.exports = function (cliOption, devWebpackPath) {
  // 配置来源：webpack.dev.js与脚手架输入及部分默认
  // 对于各配置，优先级为  默认 < dev.js配置 < cli输入
  const config = require(devWebpackPath);
  const devServerPbj = Object.assign(
    DEV_SERVER_DEFAULT,
    config.devServer,
    cleanOption(cliOption)
  );
  config.devServer = devServerPbj;

  // 端口
  const port = devServerPbj["port"];

  WebpackDevServer.addDevServerEntrypoints(config, devServerPbj);
  const compiler = Webpack(config);
  const server = new WebpackDevServer(compiler, devServerPbj);

  server.listen(port, "127.0.0.1", () => {
    console.log(`Starting server on http://localhost:${port}`);
  });
};
