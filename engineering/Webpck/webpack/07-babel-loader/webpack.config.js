const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');
// 将多个 css 抽离成一个文件
const miniCssExtractPlugin = require('mini-css-extract-plugin')

// 压缩 css文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        // 输出文件名
        filename: 'bundle.js',
        // 输出路径 需要用require来进行绝对引用
        path: path.resolve(__dirname, './dist'),
        // 清理之前的遗留
        clean: true,
        assetModuleFilename: 'images/[contenthash][ext]'
    },
    mode: 'development',

    // source-map 找到错误发生的地方
    devtool: 'inline-source-map',

    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // 模板
            template: './index.html',
            // 生成的文件名
            filename: 'app.html',
            // 插入位置
            inject: 'body'
        }),

        // 实例化插件
        new miniCssExtractPlugin({
            // 生成的css 文件夹
            filename: 'styles/[contenthash].css'
        })
    ],

    devServer: {
        // server服务 的根目录
        static: './dist'
    },

    module: {
        // module 规则
        rules: [
            {
                // 以png 结尾的
                test: /\.jpg$/,
                // 单独的文件并到处url
                type: 'asset/resource',
                // 设置生成的路径
                generator: {
                    // 生成资源名称 (注意需要先 npm webpack 一下)
                    filename: 'images/[contenthash][ext]'
                }
            },
            {
                test: /\.svg$/,
                // dataURL
                type: 'asset/inline'
            },
            {
                test: /\.txt$/,
                // 获取源代码
                type: 'asset/source'
            },

            {
                test: /\.(css|less)$/,
                // 使用loader css-loader 是处理css的
                // style-loader 将css 放置到页面上 loader转换是逆序的
                use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            //加载fonts字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/source'
            },
            
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        // babel 预设
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    },

    // 优化的配置
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
}