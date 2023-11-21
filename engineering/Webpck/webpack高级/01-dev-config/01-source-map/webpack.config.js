const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app.js',
    output: {
        clean: true
    },
    mode: 'development',

    // source map 默认值为 eval
    // source-map 会生成一个SourceMap文件
    // hidden-source-map 和 source-map一样 但它不会在末尾追加注释
    // inline-source-map 生成一个dataurl形式的source-map文件
    // eval-source-map 生成一个dataurl形式的source-map文件 并且每个model由eval执行
    // cheap-source-map 生成一个没有列信息的SourceMaps文件 不包含loader的sourcemap
    // cheap-module-source-map 生成一个没有列信息的SourceMaps文件 同时loader的sourcemap 也被简化
    devtool: 'cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                   
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    }
}