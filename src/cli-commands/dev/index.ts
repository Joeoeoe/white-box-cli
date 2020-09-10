import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import chalk from "chalk";
import { DEV_SERVER_DEFAULT } from "./defaultConfig";
import { TipObj } from "../../util";

const log = console.log;

export function dev(cliOption, devWebpackPath: string) {
  const tip = new TipObj();

  tip.loading('构建中');

  // 配置来源：webpack.dev.js与脚手架输入及部分默认
  // 对于各配置，优先级为  默认 < dev.js配置 < cli输入
  const config = require(devWebpackPath);
  const devServerObj = Object.assign(
    DEV_SERVER_DEFAULT,
    config.devServer,
    cliOption
  );
  config.devServer = devServerObj;

  // 端口
  const port = devServerObj["port"];

  WebpackDevServer.addDevServerEntrypoints(config, devServerObj);
  const compiler = Webpack(config);
  compiler.hooks.done.tap("done", () => {
    log();
    tip.success(`构建成功! ${chalk.blueBright(
      "http://localhost:" + port + "/"
    )}`);
  });
  compiler.hooks.failed.tap('failed', (error) => {
    tip.fail(error.message);
  })

  const server = new WebpackDevServer(compiler, devServerObj);

  server.listen(port, "127.0.0.1", () => {
    console.log(`Starting server on http://localhost:${port}`);
  });
}
