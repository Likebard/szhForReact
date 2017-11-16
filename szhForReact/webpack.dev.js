//开发环境配置
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


module.exports = merger(common, {
    entry: [
        //这将连接到服务器以接收通知，当bundle被重新build出来时,然后更新相应的client包
        'webpack-hot-middleware/client',
        //react的HMR开启
        'react-hot-loader/patch',
    ],
    //作用是将编译后的代码映射回源码，便于追踪错误
    devtool: 'inline-source-map',
    plugins: [
        //这两行用于启用热重载
        new webpack.HotModuleReplacementPlugin(),
        // Use NoErrorsPlugin for webpack 1.x
        new webpack.NoEmitOnErrorsPlugin(),
    ]
});
