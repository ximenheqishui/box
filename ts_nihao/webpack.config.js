const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appEntry = require('./app.js');

// 把组件个公共方法打一个包出来 让其他项目也可以用这里做的组件

let entry = {
    app: ['./app.js'],
    component: ['./src/component/index.ts']
}
let plugins = [
    new HtmlWebpackPlugin({
            chunks: ['app'],
            filename: 'index.html',
            template: 'app.html'
    }),
    new HtmlWebpackPlugin({
        chunks: ['component'],
        filename: 'component.html',
        template: 'src/component/index.html'
    }),
]

appEntry.forEach(function(item){
    entry[item.name] = item.js
    plugins.push(
        new HtmlWebpackPlugin({
            chunks: item.chunks,
            filename: item.filename,
            template:  item.template
        })
    )
})


module.exports = {
    entry: entry,
    devServer: {
        contentBase:  path.resolve(__dirname, "dist"),
        compress: true,
        port: 9001
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // js中的图片分离 输出到js输出目录的images下和statics中的images同名  。实现所有的图片都放到images下
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../images',
                            outputPath: './images'
                        }
                    }
                ],
            },
            // js中的字体图标 输出到js输出目录的fonts下和statics中的fonts同名。实现所有的字体都放到fonts下
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../fonts',
                            outputPath: './fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: plugins,
    output: {
        filename: 'js/[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
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
    resolve: {
        extensions: [ '.ts', '.js', '.json' ],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
};
