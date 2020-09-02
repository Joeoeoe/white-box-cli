import webpack from "webpack";

export function build(path: string) {
  const config = require(path);

  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log("bug");
    }

    console.log("build finish");
  });
}
