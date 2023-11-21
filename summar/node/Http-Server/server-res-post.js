//导入http模块
let http = require('http')
let fs = require('fs')
let url = require('url')

//创建服务器
let server = http.createServer()

server.listen(8080, function () {
    console.log('http://127.0.0.1:8080')
})

server.on('request', function (req, res) {
    if (req.method == 'GET') {
        //获取GET请求的参数
        console.log(req.url)
        url.parse(req.url , true)
        if (req.url == '/') {
            fs.readFile('./index.html', 'utf-8', (err, data) => {
                res.write(data)
                res.end()
            })
        }
        else {
            fs.readFile('./pic.webp', function (err, data) {
                res.end(data)
            })
        }
    }
    else if(req.method == 'POST'){
        let data = ''
        req.on('data',function(d){
            data += d           
        })
        req.on('end',function(){
            require('querystring').parse(data)
        })
       res.end()
    }
})