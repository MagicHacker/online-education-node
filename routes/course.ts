/**
 * 课程管理
 */
const express = require('express')
const router = express.Router()
const database = require('../config/db.ts')
const utils = require('../utils/index.ts')

// 查询课程
router.get('/getCourses', (req, res) => {
  const { courseName, teacherName, oneLevel, twoLevel, createTime } = req.query
  let sql = 'select * from course_tbl'
  let data = []
  if (courseName && !teacherName && !oneLevel && !twoLevel && !createTime) {
    sql += ' where name = ?'
    data = [courseName]
  } else if (
    !courseName &&
    !teacherName &&
    oneLevel &&
    !twoLevel &&
    !createTime
  ) {
    sql += ' where one_level = ?'
    data = [oneLevel]
  } else if (
    !courseName &&
    !teacherName &&
    !oneLevel &&
    twoLevel &&
    !createTime
  ) {
    sql += ' where two_level = ?'
    data = [twoLevel]
  } else if (
    !courseName &&
    !teacherName &&
    !oneLevel &&
    !twoLevel &&
    createTime
  ) {
    sql += ' where create_time = ?'
    data = [createTime]
  } else if (courseName && teacherName && oneLevel && twoLevel && createTime) {
    sql += ' where name = ? and one_level = ? and two_level and create_time = ?'
    data = [courseName, oneLevel, twoLevel, createTime]
  }
  database.sqlConnect(sql, data, (err, result) => {
    if (err) {
      res.send('查询失败' + err)
    } else {
      result.forEach(item => {
        item.create_time = utils.formatDate(item.create_time)
      })
      res.json(utils.formatSuccessRes(result))
    }
  })
})

// 添加课程
router.post('/addCourse', (req, res) => {
  const { courseName, oneLevel, twoLevel, grade, price, courseUnit } = req.body
  const sql =
    'insert into course_tbl (name,one_level,two_level,grade,price,course_unit) values(?,?,?,?,?,?)'
  database.sqlConnect(
    sql,
    [courseName, oneLevel, twoLevel, grade, price, courseUnit],
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

// 更新课程
router.post('/updateCourse', (req, res) => {
  const {
    courseName,
    oneLevel,
    twoLevel,
    grade,
    price,
    courseUnit,
    courseId
  } = req.body
  const sql =
    'update course_tbl set name = ?,one_level = ?, two_level = ?,grade = ?, price = ?, course_unit = ? where course_id = ?'
  database.sqlConnect(
    sql,
    [courseName, oneLevel, twoLevel, grade, price, courseUnit, courseId],
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
