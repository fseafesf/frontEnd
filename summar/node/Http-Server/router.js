let fs = require('fs')
let url = require('url')
let controller = require('./controller')
module.exports = (req,res) => {
    if (req.method == 'GET') {
        //获取GET请求的参数
        console.log(req.url)
        url.parse(req.url , true)
        if (req.url == '/') {
           controller.index(req,res)
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
            controller.user(req,res,require('querystring').parse(data))
        })
       res.end()
    }
}