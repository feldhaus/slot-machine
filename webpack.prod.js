const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

const VERSION = `${require('./package.json').version}`;

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(VERSION),
      __ENV__: JSON.stringify('production'),
    }),
  ],
});
