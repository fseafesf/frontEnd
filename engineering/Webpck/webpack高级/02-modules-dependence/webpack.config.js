const path = require('path')
module.exports = {
    entry: './src/app.js',
    mode: 'development',

    reslove: {
        // 别名
        alias: {
            "@": path.resolve(__dirname, './src')
        },

        extensions: [".json", ".js", ".vue"]
    }
}