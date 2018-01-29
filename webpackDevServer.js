const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');
const F_PORT = process.env.PORT || 8080;
const colors = require('colors');

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
}).listen(F_PORT, 'localhost', function (err, result) {
  if (err) console.log(err);

  console.log('===================================='.cyan);
  console.log('         WEBPACK DEV SERVER         ');
  console.log('===================================='.cyan);
  console.log('Configuration:', 'webpack.config.dev.js'.cyan);
  console.log('Listening at', `http://localhost:${F_PORT}`.cyan);
  console.log('===================================='.cyan);
});
