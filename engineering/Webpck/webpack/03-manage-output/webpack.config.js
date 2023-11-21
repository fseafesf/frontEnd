const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        // 输出文件名
        filename: 'bundle.js',
        // 输出路径 需要用require来进行绝对引用
        path: path.resolve(__dirname, './dist'),
        // 清理之前的遗留
        clean:true
    },
    mode: 'none',
    plugins: [
        new HtmlWebpackPlugin({
            // 模板
            template: './index.html',
            // 生成的文件名
            filename: 'app.html',
            // 插入位置
            inject: 'body'
        })
    ]
}