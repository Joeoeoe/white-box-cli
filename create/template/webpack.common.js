const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  /**
   * eval-source-map：调试用
   * cheap-module-eval-source-map:大型项目调试用
   * cheap-module-source-map:上线用，也可不用
   */
  // devtool: "eval-source-map",

  // 入口文件
  // entry: ['react-hot-loader/patch', __dirname + "/src/index.js"],

  // 出口文件
  output: {
    path: `${__dirname}/dist`,
    filename: 'main-[hash].js',
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
          // {
          //   loader: "source-map-loader"
          // }
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

      // css与css module处理
      // 配合react-hot-loader，
      // dev与prod中对CSS处理的不同：1.css module的hash处理 2.样式是否写于js之中，配合react-hot-loader
      // {
      //   test: /\.css$/,
      //   //匹配.css或.module.css
      //   oneOf: [
      //     {
      //       test: /\.module\.css/,
      //       use: [
      //         // {
      //         //   loader: "style-loader"//把<style></style>标签放在DOM中（因为CSS文件以开始没有分离
      //         // },
      //         {
      //           loader: MiniCssExtractPlugin.loader //使打包后CSS与js文件分离
      //         },
      //         {
      //           loader: "css-loader",
      //           options: {
      //             modules: {//css modules 启用
      //               localIdentName: "[name]__[local]--[hash:base64:5]"
      //             }
      //           }
      //         },
      //         {
      //           loader: "postcss-loader"
      //         }
      //       ]
      //     },
      //     {
      //       use: [
      //         // {
      //         //   loader: "style-loader"
      //         // },
      //         {
      //           loader: MiniCssExtractPlugin.loader //使打包后CSS与js文件分离
      //         },
      //         {
      //           loader: "css-loader"
      //         },
      //         {
      //           loader: "postcss-loader"
      //         }
      //       ]
      //     }
      //   ]
      // },

      // 图片处理
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        use: [
          // {
          //   loader: "file-loader"
          // },
          {
            loader: 'url-loader', // 需要npm安装file-loader，会自动配合file-loader，但use中不需要写
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
              // publicPath: "fonts/", //????
              outputPath: 'fonts/',
            },
          },
        ],
      },

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

  /**
   * Plugins are the backbone of webpack. webpack itself is
   *  built on the same plugin system that you use in your webpack
   *  configuration!
   */
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),

    /**
     * Hot Module Replacement (HMR) exchanges, adds, or removes
     * modules while an application is running, without a full
     * reload.
     */
    new webpack.HotModuleReplacementPlugin(),

    // css与js分离
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),

    new webpack.ProvidePlugin({
      // 全局变量，不用每个地方都import
      // '$http': 'axios'
    }),
    // 清除上一次build的文件
    new CleanWebpackPlugin(),
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
  //   externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // }
};
