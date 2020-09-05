const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonWebpack = require('./webpack.common');

module.exports = merge.smart(commonWebpack, {
  mode: 'production',

  entry: `${__dirname}/src/index.js`,
  module: {
    rules: [
      // css与css module处理
      {
        test: /\.css$/,
        // 匹配.css或.module.css
        oneOf: [
          {
            test: /\.module\.css/,
            use: [
              // {
              //   loader: "style-loader"//把<style></style>标签放在DOM中
              // },
              {
                loader: MiniCssExtractPlugin.loader, // 使打包后CSS与js文件分离
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    // css modules 启用
                    localIdentName: '[hash:base64]',
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
              // {
              //   loader: "style-loader"
              // },
              {
                loader: MiniCssExtractPlugin.loader, // 使打包后CSS与js文件分离
              },
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
});
