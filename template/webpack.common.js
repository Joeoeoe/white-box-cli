const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const WebpackBar = require('webpackbar');

module.exports = {
  /**
   * eval-source-map：调试用
   * cheap-module-eval-source-map:大型项目调试用
   * cheap-module-source-map:上线用，也可不用
   */
  // devtool: "eval-source-map",

  // 出口文件
  output: {
    path: `${__dirname}/dist`,
    filename: 'main-[hash].js',
    publicPath: './'
  },

  /**
   * These options determine how the different types of modules
   * within a project will be treated.
   */
  module: {
    // an array of Rule
    rules: [
      // js,jsx处理
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      // html处理
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },

      /**
       * css与css module处理(为调试时可热更，已按照需求分别配置到dev、prod)
       * dev与prod中对CSS处理的不同：1.css module的hash处理 2.样式是否写于js之中，配合react-hot-loader
       */


      // 图片处理
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        use: [
          {
            loader: 'url-loader', // 需安装file-loader，会自动配合file-loader，但use中不需要写
            options: {
              outputPath: 'images/',
              limit: 10 * 1024, // 10kb以下转换为base64
            },
          },
        ],
      },

      // 字体处理
      {
        test: /\.(eot|woff2?|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              outputPath: 'fonts/',
            },
          },
        ],
      },

      // ts与tsx处理
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),

    // HMR
    new webpack.HotModuleReplacementPlugin(),

    // css与js分离
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),

    new webpack.ProvidePlugin({
      // 全局变量，不用每个地方都import
      // 距离
      // '$http': 'axios'
    }),

    // 清除上一次build的文件
    new CleanWebpackPlugin(),

    // webpack打包进度条
    new WebpackBar(),
  ],

  resolve: {
    // 支持缩写
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 别名
    alias: {
      '@': path.join(__dirname, 'src'), // "@表示src目录，即\src"
      '@source': path.join(__dirname, 'src', 'source'), // 静态资源
      '@com': path.join(__dirname, 'src', 'components'), // 组件目录
      'react-dom': '@hot-loader/react-dom',
    },
  },
};
