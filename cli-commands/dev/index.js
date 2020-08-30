const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const path = require("path");

module.exports = function (optionObj, devWebpackPath) {
  console.log(optionObj);

  const config = require(devWebpackPath);
  const contentBase = path.join(process.cwd());
  console.log(contentBase)

  const devServerOptions = Object.assign({}, config.devServer)
  console.log(devServerOptions);
  
  WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);

  const compiler = Webpack(config);
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8080, "127.0.0.1", () => {
    console.log("Starting server on http://localhost:8080");
  });
};
