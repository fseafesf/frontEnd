//导入http模块
let http = require('http')
let fs = require('fs')

//创建服务器
let server = http.createServer()

server.listen(8080, function () {
    console.log('http://127.0.0.1:8080')
})

server.on('request', function (req, res) {
    /* console.log('request')
    res.setHeader('Content-type','text/html;charset=utf-8')
    res.write('<h1>你好</h1>')
    res.end() */
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

})