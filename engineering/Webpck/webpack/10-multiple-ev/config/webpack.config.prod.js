const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');
// 将多个 css 抽离成一个文件
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    // 分别打包的方法 一 多个入口
    
    output: {
        // 输出文件名
        filename: 'scripts/[name].[contenthash].js',
        // 输出路径 需要用require来进行绝对引用
       
        publicPath: 'http://localhost:8080/'
    },
    mode:  'production' ,

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]   
    }
}