const webpack = require('webpack')
const config = require('./config')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve(config.rootPath, './src')
        }
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'commons',
            filename: 'js/[name].[chunkhash].js'
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: ['babel-loader'],
            exclude: [/node_modules/]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.jpe?g|png$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1192,
                    fallback: 'file-loader',
                    outputPath: './images/',
                    name: '[name].[hash].[ext]',
                }
            }]
        }]
    },

    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.resolve(config.rootPath, './public/index.html')
        })
    ]
}