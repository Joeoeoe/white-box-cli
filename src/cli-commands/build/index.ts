import webpack from "webpack";
import TipObj from "../../util/TipObj";

export function build(path: string) {
  const tip = new TipObj();

  tip.loading('打包中');
  const config = require(path);

  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      tip.fail(err.message);
    }

    tip.success('打包成功!');
  });
}
