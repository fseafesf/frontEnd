//导入http模块
let http = require('http')
let router = require('./router')

//创建服务器
let server = http.createServer()

server.listen(8080, function () {
    console.log('http://127.0.0.1:8080')
})

server.on('request', function (req, res) {
   router(req,res)
})