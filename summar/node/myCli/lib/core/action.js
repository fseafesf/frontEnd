let inquirer = require('inquirer')
let config = require('../../config')
const download = require('download-git-repo')

const myAction = async (project, args) => {
    let res = await inquirer.prompt([
        {
            type: 'list',
            name: 'framwork',
            choices: config.framwork,
            message: '选择使用的框架'
        }
    ])
    // console.log(res)
    download('direct:git@gitee.com:simin777/chen-xiaoping.git',project,{clone:true},err => {
        console.log(err)
    })
}
module.exports = myAction