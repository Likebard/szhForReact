const express = require('express');
const webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware")

const app = express();

const port = 3000;



//将webpack中间件添加到server
app.use(webpackDevMiddleware(compiler, {
    noInfo: true, 
    //该项在webpack.config.js中已经配置，目的是告诉index.html页面相对于浏览器地址怎么拿到它想要的js
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true},
    //懒人加载模式为false,不开启.跟watchOptions配合使用，则300ms查看一次源码修改状态
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
}));
//添加HMR到server
app.use(webpackHotMiddleware(compiler));

// Serve the files on port 3000.
app.listen(port, function () {
    console.log('Example app listening on port 3000!\n');
});