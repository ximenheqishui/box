const base = require('../webpack.config')
const path = require('path')
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['index.html','views/*','js/*','css/*','images/*','fonts/*'], // 这个人写的代码没有排除文件夹的功能
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[chunkhash].css",
        })
    ],
    mode: 'production'
});
