const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: [
            'lodash'
        ]
    },
    plugins: [
        //作用是每次构建前清除/dist文件夹
        new CleanWebpackPlugin(['dist']),
        //作用是在output自动生成index.html文件,并动态引用entry中生成的各bundle文件
        new HtmlWebpackPlugin({
            title: 'Caching',
            //指定要生成的index.html的模板
            template: './src/index.html'
        }),
        //用于确保每次rebuild时，存放第三方库的vendor打包后的hash值不发生改变，可以直接读取前端缓存
        new webpack.HashedModuleIdsPlugin(),
        //注意引入顺序很重要，CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入。
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        //提取模板,用于将模块(boilerplate, manifest)分离到单独文件中
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                    }
                }
            }
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        //用于确保文件资源能在server.js指定的端口号下正确访问
        publicPath: '/'
    },
};
