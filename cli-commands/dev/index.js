const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const path = require("path");

module.exports = function (optionObj, devWebpackPath) {
  console.log(optionObj);
  const config = require(devWebpackPath);
  const devServerOptions = Object.assign({
    stats: 'normal'
  }, config.devServer);
  // TODO 配置来源：webpack.dev.js与脚手架输入及部分默认
  // 对于各配置，优先级为 手动输入 > 脚手架 > 默认

  WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);
  const compiler = Webpack(config);
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8080, "127.0.0.1", () => {
    console.log("Starting server on http://localhost:8080");
  });
};

{
  hot: true,
    host: 'localhost',
      port: 8081,
        historyApiFallback: true,
          proxy: { },
  publicPath: '/',
    filename: 'main-[hash].js',
      hotOnly: undefined,
        clientLogLevel: 'info',
          stats: {
    cached: false,
      cachedAssets: false,
        colors: { level: 3, hasBasic: true, has256: true, has16m: true }
  },
  open: true,
    openPage: ''
}
