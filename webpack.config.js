var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app/main.ts',
    output: {
        pathinfo: true,
        filename: '[name].bundle.js',
        path: path.resolve('./dist')
    },

    resolve: {
        // add '.ts' as resolvable extensions
        extensions: ['.js', '.ts']
    },

    // enable sourcemaps for debugging webpack's output
    devtool: 'source-map',

    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to:'./assets'
            },
            {
                from: './src/css',
                to:'./css'
            }
        ]),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.json$/,
                include: path.join(__dirname, 'node_modules', 'pixi.js'),
                loader: 'json'
            },
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
          ]
    }
}