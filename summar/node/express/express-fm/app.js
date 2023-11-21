const express = require('express')
const db = require('./db')

const app = express()
app.use(express.urlencoded())
app.use(express.json())

app.get('/', async function (req, res) {
    try {
        let back = await db.getDb()
        res.send(back.users)
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.post('/', async function (req, res) {
    let body = req.body
    if (!body) {
        res.status(403).json({
            err: '缺少用户信息'
        })
    }
    let back = await db.getDb()
    body.id = back.users[back.users.length - 1].id + 1
    back.users.push(body)
    try {
        let w = await db.serveDb(back)
        if (!w) {
            res.status(200).send({
                msg: '添加成功'
            })
        }
        else {
            res.status(500).json({ ere: '错误' })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.put('/:id', async (req, res) => {
    try {
        let userInfo = await db.getDb()
        let userId = Number.parseInt(req.params.id)
        let user = userInfo.users.find(item => item.id === userId)
        if (!user) {
            res.status(403).json({
                error: '用户不存在'
            })
        }
        const body = req.body
        user.username = body.username ? body.username : user.username
        user.age = body.age ? body.age : user.age
        userInfo.users[userId - 1] = user
        if (! await db.serveDb(userInfo)) {
            res.status(200).json({
                msg:'修改成功'
            })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})