更多详细的讲解请看 [森果技术分享：webpack配置从0到1](http://www.zpblogs.com/myBlogs/2018/10/08/%E6%A3%AE%E6%9E%9C%E5%86%85%E9%83%A8%E5%88%86%E4%BA%AB%EF%BC%9Awebpack%E9%85%8D%E7%BD%AE%E4%BB%8E0%E5%88%B01/)

## 初始化 npm

> npm init -y

## 建立相关文件

* build 目录
* 入口文件
* webpack配置

## 下载相关依赖
* vue
    > yarn add vue
* webpack
    > yarn add webpack webpack-cli webpack-merge --dev

## 添加.gitignore文件
```
/node_modules/
```

## 编写package.json

```js
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --config ./build/webpack.dev.js"
  }
```

## 安装 vue-loader
> yarn add vue-loader vue-template-compiler --dev

```js
rules: [{
    test: /\.vue$/,
    loader: 'vue-loader'
}]
```

```js
plugins: [
    new VueLoaderPlugin()
]
```

## 配置 
```js
resolve: {
    extensions: ['.js', '.vue']
}
```

## 安装 html-webpack-plugin
> yarn add html-webpack-plugin --dev

```js
plugins: [
    new HtmlWebpackPlugin({
        filename: './index.html',
        template: path.resolve(config.rootPath, './public/index.html')
    })
]
```

## 配置开发环境以及热更新
安装 **webpack-dev-server**
> yarn add webpack-dev-server --dev

配置 **devserver** 配置项
```js
devServer: {
    contentBase: false,
    host: '0.0.0.0',
    port: 8080,
    open: true,
    hot: true,
    publicPath: '/'
}
```

使用 **HotModuleReplacementPlugin** 模块
```js
plugins: [
    new webpack.HotModuleReplacementPlugin({
        // Options...
    })
]
```

修改 **package.json**

```json
"scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.dev.js"
}
```

## 配置scss
> yarn add sass-loader node-sass css-loader style-loader --dev

```js
rules: [{
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
    }]
}
```

## 配置别名
```js
resolve: {
    extensions: ['.js', '.vue'],
    alias: {
        '@': path.resolve(config.rootPath, './src')
    }
}
```

## 引入图片资源
> yarn add file-loader url-loader --dev

```js
rules: [{
    test: /\.jpe?g|png$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192,
            fallback: 'file-loader',
            outputPath: './images/',
            name: '[name].[hash].[ext]',
        }
    }]
}]
```

## 配置打包
新建 webpack.pro.js文件
```js
const commonWebpackConfig = require('./webpack.common')
const merge = require('webpack-merge')
const config = require('./config')
const path = require('path')
const webpack = require('webpack')

module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    entry: path.resolve(config.rootPath, './src/main.js'),
    output: {
        path: path.resolve(config.rootPath, './dist'),
        publicPath: './',
        filename: 'js/main.[hash].js'
    }
})
```

修改package.json
```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.pro.js"
}
```

## 抽离公共依赖项

配置 splitChunks
```js
optimization: {
    splitChunks: {
        chunks: 'all',
        name: 'commons',
        filename: 'js/[name].[chunkhash].js'
    }
},
```

## 添加 clean-webpack-plugin
> yarn add clean-webpack-plugin --dev
```js
plugins: [
    new CleanWebpackPlugin()
]
```

## 抽离css文件
> yarn add mini-css-extract-plugin --dev

```js
module: {
    rules: [{
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }]
},

plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[chunkhash].css',
    })
]
```

## 添加babel
> yarn add babel-loader @babel/core @babel/preset-env --dev

添加 **.babelrc** 文件
```json
{
    "presets": ["@babel/preset-env"]
}
```

webpack 添加 rules 

```js
rules: [{
    test: /\.js$/,
    loader: ['babel-loader'],
    exclude: [/node_modules/]
}]
```

## 优化babel

> yarn add @babel/runtime 

> yarn add @babel/plugin-transform-runtime --dev


配置 .babelrc plugins

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-transform-runtime"]
}
```

配置 [.browserslistrc](
https://www.jianshu.com/p/bd9cb7861b85)

```
last 2 versions
```

