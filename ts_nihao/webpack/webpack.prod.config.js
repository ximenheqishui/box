const base = require('../webpack.config')
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge.merge(base, {
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {from: path.resolve(__dirname, "../src/vendor"), to: 'vendor' }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[chunkhash].css",
        })
    ],
    // 代码去重分离,把重复的js代码提取到同一个文件中，减少请求代码的体积
    optimization: {
        minimize: false, // 是否压缩
        splitChunks: {
            chunks (chunk) {
                return chunk.name !== 'component';
            }, // 包含哪些 chunk
            name:'vendor'  // 命名为 vendor  和 入口文件中vendor保持同名。 确保公共部分都打包到一个文件中
        },
    },
    mode: 'production'
});
