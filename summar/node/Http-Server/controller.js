let fs = require('fs')
module.exports = {
    index(req,res){
        fs.readFile('./index.html', 'utf-8', (err, data) => {
            res.write(data)
            res.end()
        })
    },
    user(req,res,data){
        console.log(data)
    }
}