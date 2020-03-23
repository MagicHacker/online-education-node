const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const classRouter = require('./routes/class.ts')
const docRouter = require('./routes/document.ts')
const catalogRouter = require('./routes/catalog.ts')
const studentRouter = require('./routes/student.ts')
const teacherRouter = require('./routes/teacher.ts')
const courseRouter = require('./routes/course.ts')
const salaryRouter = require('./routes/salary.ts')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 设置跨域
app.all('*', (req, res, next) => {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', 'http://www.zhangpeiyue.com')
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type')
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 挂载中间件方法到路径上
app.use('/class', classRouter)
app.use('/doc', docRouter)
app.use('/catalog', catalogRouter)
app.use('/student', studentRouter)
app.use('/teacher', teacherRouter)
app.use('/course', courseRouter)
app.use('/salary', salaryRouter)
app.listen(3000, () => {
  console.log('\x1b[32m', 'http://localhost:3000')
})
