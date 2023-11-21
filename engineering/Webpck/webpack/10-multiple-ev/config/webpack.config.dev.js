const path = require('path');
module.exports = {
    // 分别打包的方法 一 多个入口
  
    output: {
        // 输出文件名
        filename: 'scripts/[name].js',
      
    },
    mode:  'development',

    // source-map 找到错误发生的地方
    devtool: 'inline-source-map',
    
    devServer: {
        // server服务 的根目录
        static: './dist'
    }
   
}