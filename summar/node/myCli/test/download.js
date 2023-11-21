const download = require('download-git-repo')
download('direct:git@gitee.com:simin777/chen-xiaoping.git','./xxx',{clone:true},err => {
    console.log(err)
})