/**
 * 学生管理
 */
const express = require('express')
const router = express.Router()
const database = require('../config/db.ts')
const utils = require('../utils/index.ts')

// 查询学生
router.get('/getStudents', (req, res) => {
  const { name, phone, regTime } = req.query
  let sql = 'select * from stu_tbl'
  let data = []
  if (name && !phone && !regTime) {
    sql += ' where name = ?'
    data = [name]
  } else if (!name && phone && !regTime) {
    sql += ' where phone = ?'
    data = [phone]
  } else if (!name && !phone && regTime) {
    sql += ' where rgt_time = ?'
    data = [regTime]
  } else if (name && phone && regTime) {
    sql += ' where name = ? and phone = ? and rgt_time = ?'
    data = [name, phone, regTime]
  }
  database.sqlConnect(sql, data, (err, result) => {
    if (err) {
      res.send('查询失败' + err)
    } else {
      result.forEach(item => {
        item.rgt_time = utils.formatDate(item.rgt_time)
      })
      res.json(utils.formatSuccessRes(result))
    }
  })
})

// 添加学生
router.post('/addStudent', (req, res) => {
  const { name, phone, password } = req.body
  const sql = 'insert into stu_tbl (name,phone,password) values(?,?,?)'
  database.sqlConnect(sql, [name, phone, password], (err, result) => {
    if (err) {
      res.send('插入失败' + err)
    } else {
      res.send({
        code: 0,
        msg: '插入成功'
      })
    }
  })
})
module.exports = router
