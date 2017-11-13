const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        //这将连接到服务器以接收通知，当bundle被重新build出来时,然后更新相应的client包
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        './src/index.js'
    ],
    //作用是将编译后的代码映射回源码，便于追踪错误
    devtool: 'inline-source-map',
    plugins: [
        //作用是每次构建前清除/dist文件夹
        new CleanWebpackPlugin(['dist']),
        //作用是在output自动生成index.html文件,并动态引用entry中生成的各bundle文件
        //(生成的index.html文件，vscode需要重启才能看到，应该是vscode的bug)
        new HtmlWebpackPlugin({
            title: 'Output Management',
            //指定要生成的index.html的模板
            template: './src/index.html'
        }),
        //这两行用于启用热重载
        new webpack.HotModuleReplacementPlugin(),
        // Use NoErrorsPlugin for webpack 1.x
        new webpack.NoEmitOnErrorsPlugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        //用于确保文件资源能在server.js指定的端口号下正确访问
        publicPath: '/'
    },
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
    }
};