const commonWebpackConfig = require('./webpack.common')
const merge = require('webpack-merge')
const config = require('./config')
const path = require('path')
const webpack = require('webpack')


module.exports = merge(commonWebpackConfig, {
    mode: 'development',
    entry: path.resolve(config.rootPath, './src/main.js'),
    output: {
        path: path.resolve(config.rootPath, './dist'),
        filename: './js/main.js',
        publicPath: './'
    },

    module: {
        rules: [{
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },

    devServer: {
        contentBase: false,
        host: '0.0.0.0',
        port: 8080,
        open: true,
        hot: true,
        publicPath: '/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // Options...
        })
    ]
})