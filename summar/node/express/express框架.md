# express框架

promiseify 将函数promise化

post请求发送urlencoded数据时 需要使用该方法

发送json数据时 需要使用.json()方法

app.use(express.urlencoded())



### express的中间件 

```js
app.use((req,res,next) => {
  console.log(`${req.method} + ${req.url}`)
  next()
})
```

不能写在需要使用的地方的后面

### 中间件挂载路由

```js
//router.js
const express = require('express')
const router = express.Router()
router.get('/',(req,res,next) =>{
    console.log(req.method)
    res.send('/index')
})
router.get('/users',(req,res) => {
    console.log(req.method)
    res.send('/users')
})
module.exports = router

//app.js
const router = require('./router/index')
app.use(router)
```



### express().all方法

```js
app.all('/xx',(req,res,next) => {
  res.send('xx')
})
```



# MongoDB增删改查的一些操作

```js
//db.ff.insert({name:'123',age:12})
//db.ff.drop()
//db.cc.insert({_id:'2',key:3,h:4})
//db.cc.insertOne({username:'lisi',age:52})
//db.cc.insertMany([{username:'zs',age:18},{username:'ww',age:88}])
//db.cc.find({username:'lisi'})
//db.cc.find({age:{$gt:15}})
//db.cc.findOne({age:{$gt:15}})
//db.cc.updateOne({username:'ww'},{$set:{age:30}})
//db.cc.updateMany({age:{$gt:15}},{$set:{username:'znx'}})
//db.cc.deleteOne({username:'znx'})
```

1590