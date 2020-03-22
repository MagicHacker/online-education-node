/**
 * 教师管理
 */
const express = require('express')
const router = express.Router()
const database = require('../config/db.ts')
const utils = require('../utils/index.ts')

// 查询教师
router.get('/getTeachers', (req, res) => {
  const { name, phone, status, regTime } = req.query
  let sql = 'select * from teacher_tbl'
  let data = []
  if (name && !phone && !status && !regTime) {
    sql += ' where name = ?'
    data = [name]
  } else if (!name && phone && !status && !regTime) {
    sql += ' where phone = ?'
    data = [phone]
  } else if (!name && !phone && status && !regTime) {
    sql += ' where status = ?'
    data = [status]
  } else if (!name && !phone && !status && regTime) {
    sql += ' where rgt_time = ?'
    data = [regTime]
  } else if (name && phone && status && regTime) {
    sql += ' where name = ? and phone = ? and status = ? and regTime = ?'
    data = [name, phone, status, regTime]
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

// 添加教师
router.post('/addTeacher', (req, res) => {
  const { phone, name, gride, subject, commission, brief } = req.body
  const sql =
    'insert into teacher_tbl (phone,name,gride,subject,commission,brief) values(?,?,?,?,?,?)'
  database.sqlConnect(
    sql,
    [phone, name, gride, subject, commission, brief],
    (err, result) => {
      if (err) {
        res.send('插入失败' + err)
      } else {
        res.send({
          code: 0,
          msg: '插入成功'
        })
      }
    }
  )
})

// 修改
router.post('/updateTeacher', (req, res) => {
  const { phone, name, gride, subject, commission, brief, status } = req.body
  const sql =
    'update teacher_tbl set name = ?, gride = ?,subject = ?,commission = ?,brief = ?, status =? where phone = ?'
  database.sqlConnect(
    sql,
    [name, gride, subject, commission, brief, status, phone],
    (err, result) => {
      if (err) {
        res.send('更新失败' + err)
      } else {
        res.send({
          code: 0,
          msg: '更新成功'
        })
      }
    }
  )
})
module.exports = router
