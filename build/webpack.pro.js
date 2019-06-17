const commonWebpackConfig = require('./webpack.common')
const merge = require('webpack-merge')
const config = require('./config')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    entry: path.resolve(config.rootPath, './src/main.js'),
    output: {
        path: path.resolve(config.rootPath, './dist'),
        publicPath: './',
        filename: 'js/main.[hash].js'
    },

    module: {
        rules: [{
            test: /\.s?css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[chunkhash].css',
        })
    ]
})