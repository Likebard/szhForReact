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
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
//添加HMR到server
app.use(webpackHotMiddleware(compiler));

// Serve the files on port 3000.
app.listen(port, function () {
    console.log('Example app listening on port 3000!\n');
});