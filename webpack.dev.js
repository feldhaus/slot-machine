const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const VERSION = `${require('./package.json').version}`;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(VERSION),
      __ENV__: JSON.stringify('development'),
    }),
  ],
});
