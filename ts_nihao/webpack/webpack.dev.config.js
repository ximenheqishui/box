const base = require('../webpack.config')
const merge = require('webpack-merge');
const path = require('path');


module.exports = merge.merge(base, {
    devServer: {
        contentBase:  path.resolve(__dirname, "../src"),
        compress: true,
        port: 9001
    },
    module: {
        rules: [
            // scss  规则  开发环境下不要把css分离出来  会影响热加载
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                },{
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
        ]
    },
    devtool: 'inline-source-map',
    mode: 'development'
});
