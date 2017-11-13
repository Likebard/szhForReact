const express = require('express');
const webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware")

const app = express();


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}));

//将webpack中间件添加到server
// app.use(webpackDevMiddleware(compiler, {
//     noInfo: true, publicPath: webpackConfig.output.publicPath
// }));
// //添加HMR到server
// app.use(webpackHotMiddleware(compiler));

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});