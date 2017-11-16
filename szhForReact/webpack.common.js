const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        //作用是每次构建前清除/dist文件夹
        new CleanWebpackPlugin(['dist']),
        //作用是在output自动生成index.html文件,并动态引用entry中生成的各bundle文件
        new HtmlWebpackPlugin({
            title: 'Output Management',
            //指定要生成的index.html的模板
            template: './src/index.html'
        }),
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
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        //用于确保文件资源能在server.js指定的端口号下正确访问
        publicPath: '/'
    },
};
