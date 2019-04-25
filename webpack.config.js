const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    // 环境
    mode: "development",
    // 唯一入口
    entry: path.resolve(__dirname, 'app/importNoteClient.js'),
    // 出口
    output: {
        // 打包后文件所在目录
        path: path.resolve(__dirname, 'dist'),
        // 文件名
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader','sass-loader']
            },
            {
                test: /\.(gif|jpg|jpeg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'name.[hash:6].[ext]'
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png)$/,
                use: {
                    loader: 'url-loader'
                }
            
            }
        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': path.resolve(__dirname),
            // 'static':path.resolve(__dirname, './static'),
            // 'dist':path.resolve(__dirname,'./dist')
        },
        // 引入文件可不加后缀
        extensions: ['.js', '.vue', '.json']
    }
}