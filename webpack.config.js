const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 环境
  'mode': 'development',
  // 唯一入口
  'entry': {
    'index': path.resolve(__dirname, 'app/main.js')
    // todoList: path.resolve(__dirname, 'app/todoList.js')
  },
  // 出口
  'output': {
    // 打包后文件所在目录
    'path': path.resolve(__dirname, 'dist'),
    // 文件名
    'filename': 'js/[name].js'
  },
  'plugins': [
    new HtmlWebpackPlugin({
      'filename': 'index.html',
      'template': 'index.html',
      'inject': true
    }),
    // new HtmlWebpackPlugin({
    //     filename: 'todoList.html',
    //     template: 'todoList.html',
    //     inject: true
    // }),
    new VueLoaderPlugin(),
    // new ExtractTextPlugin({
    //         filename: 'css/[name].css', // 配置提取出来的css名称
    //         allChunks: false
    //     }),
    new OptimizeCSSAssetsPlugin(),
    new MiniCssExtractPlugin({
      'filename': 'css/[name].css'
    })
  ],
  'module': {
    'rules': [
      {
        'test': /\.(js|vue)$/,
        'loader': 'eslint-loader',
        'enforce': 'pre',
        //指定检查的目录
        'include': [path.resolve(__dirname, 'src')],
        //eslint检查报告的格式规范
        'options': {
          'formatter': require('eslint-friendly-formatter')
        }
      },
      {
        'test': /\.js$/,
        'exclude': /node_modules/,
        'use': {
          'loader': 'babel-loader'
        }
      },
      {
        'test': /\.vue$/,
        'exclude': /node_modules/,
        'use': {
          'loader': 'vue-loader'
        }
      },
      {
        'test': /\.css$/,
        'use': [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      // {
      //     test: /\.(css)$/,
      //     exclude: /node_modules/,
      //     use: ExtractTextPlugin.extract({
      //         fallback: {// 这里表示不提取的时候，使用什么样的配置来处理css
      //             loader: 'style-loader',
      //         },
      //         use: [ // 提取的时候，继续用下面的方式处理
      //             {
      //                 loader: 'css-loader',
      //             }
      //         ]
      //     })
      // },
      {
        'test': /\.scss$/,
        'use': ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        'test': /\.(gif|jpg|jpeg|svg)$/,
        'use': {
          'loader': 'url-loader',
          'options': {
            'limit': 1024,
            'name': 'name.[hash:6].[ext]'
          }
        }
      },
      {
        'test': /\.(eot|svg|ttf|woff|woff2|png)$/,
        'use': {
          'loader': 'url-loader'
        }

      }
    ]
  },
  'resolve': {
    'alias': {
      'vue': 'vue/dist/vue.js',
      '@': path.resolve(__dirname),
      'prettify': './node_modules/showdown-prettify/src/showdown-prettify.js'
      // 'static':path.resolve(__dirname, './static'),
      // 'dist':path.resolve(__dirname,'./dist')
    },
    // 引入文件可不加后缀
    'extensions': ['.js', '.vue', '.json']
  }
};