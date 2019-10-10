const webpack = require('webpack')
// vue.config.js
module.exports = {
  publicPath: '/', // 静态资源对应的路径
  outputDir: 'dist', // 成的生产环境构建文件的目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: 7000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/admin': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      }
    }
  },
  configureWebpack: {
    // devtool: false, // productionSourceMap 不起作用 打包的时候把这个放开
    output: {
      filename: 'static/js/[name].js'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      }) // 全局引用一下其他的库，并重命名。 要在校验.eslintrc.js文件中定义一下全局变量
    ]
  },
  productionSourceMap: true
}
