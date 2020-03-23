/**
 * 收入管理
 */
const express = require('express')
const router = express.Router()
const database = require('../config/db.ts')
const utils = require('../utils/index.ts')

// 查询收入
router.get('/getSalarys', (req, res) => {
  const { teacherName, dealType, dealTime } = req.query
  // TODO:待优化
  let sql = 'select * from sal_tbl'
  let data = []
  if (!teacherName && dealType && !dealTime) {
    sql += ' where sal_type = ?'
    data = [dealType]
  } else if (!teacherName && !dealType && dealTime) {
    sql += ' where deal_time = ?'
    data = [dealTime]
  } else if (!teacherName && dealType && dealTime) {
    sql += ' where sal_type = ? and deal_time = ?'
    data = [dealType, dealTime]
  }
  database.sqlConnect(sql, data, (err, result) => {
    if (err) {
      res.send('查询失败' + err)
    } else {
      result.forEach(item => {
        item.deal_time = utils.formatDate(item.deal_time)
      })
      res.json(utils.formatSuccessRes(result))
    }
  })
})

// 添加收入
router.post('/addSalary', (req, res) => {
  const { salaryId, dealType, dealSalary, salarySum, teacherId } = req.body
  const sql =
    'insert into sal_tbl (sal_id,sal_type,sal_deal,sal_sum,teacher_id) values(?,?,?,?,?)'
  database.sqlConnect(
    sql,
    [salaryId, dealType, dealSalary, salarySum, teacherId],
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
module.exports = router
