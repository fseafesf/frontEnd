const express = require('express')
// const router = require('./router/index')
// const routerVideo = require('./router/video')
const app = express()

app.all('/xx',(req,res,next) => {
  res.send('xx')
})

app.get('/user/:id',(req,res)=>{
  console.log(req.params)
  res.send(`${req.method}`)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
