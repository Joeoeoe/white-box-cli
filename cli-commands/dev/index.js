const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

module.exports = function (optionObj, devWebpackPath) {
  console.log(optionObj);
  console.log(devWebpackPath);

  const webpackDevConfig = require(devWebpackPath);
  const compiler = Webpack(webpackDevConfig);

  const devServerOptions = Object.assign({}, webpackDevConfig.devServer, {
    open: true,
    stats: {
      colors: true,
    },
  });

  console.log(devServerOptions);

  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8080, "127.0.0.1", () => {
    console.log("Starting server on http://localhost:8080");
  });
};
