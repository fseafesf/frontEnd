const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const router = require('./router/index')

//数据解析中间件
app.use(express.urlencoded())
app.use(express.json())
//解决跨域问题中间件
app.use(cors())
//日志记录中间件
app.use(morgan('dev'))

app.use('/api/v1' , router)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
