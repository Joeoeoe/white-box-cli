const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonWebpack = require('./webpack.common');

module.exports = merge.smart(commonWebpack, {
  mode: 'development',
  entry: ['react-hot-loader/patch', `${__dirname}/src/index.js`],
  output: {
    publicPath: '/',
  },
  // 中小项目：eval-source-map
  // 大项目考虑时间成本，用cheap-module-eval-source-map
  devtool: 'eval-source-map',
  module: {
    rules: [
      // css与css module处理
      {
        test: /\.(c|le)ss$/,
        // 匹配.css或.module.css
        oneOf: [
          {
            test: /\.module\.(le|c)ss/,
            use: [
              {
                loader: 'style-loader', // 把<style></style>标签放在DOM中（因为CSS文件以开始没有分离
              },
              // {
              //   loader: MiniCssExtractPlugin.loader //使打包后CSS与js文件分离
              // },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    // css modules 启用
                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  },
                },
              },
              {
                loader: 'less-loader',
              },
              {
                loader: 'postcss-loader',
              },
            ],
          },
          {
            use: [
              {
                loader: 'style-loader',
              },
              // {
              //   loader: MiniCssExtractPlugin.loader //使打包后CSS与js文件分离
              // },
              {
                loader: 'css-loader',
              },
              {
                loader: 'less-loader',
              },
              {
                loader: 'postcss-loader',
              },
            ],
          },
        ],
      },
    ],
  },
  //   本地服务器配置
  devServer: {
    hot: true,
    host: 'localhost',
    port: 8081,
    historyApiFallback: true, // 404跳转至index.html
    proxy: {
      // 代理，可用于跨域，多个后台服务器（上线用nginx?）等情况。
    },
  },
});
