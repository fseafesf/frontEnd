let fs = require('fs')
fs.writeFile('./a.txt','666',(err) => {
    console.log(err)
})