const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://localhost:27017/express-video')
}

main().then(res => {
    console.log('链接成功' + res)
}).catch(err => {
    console.log(err)
})

module.exports = {
    User:mongoose.model('User',require('./userModel'))
}