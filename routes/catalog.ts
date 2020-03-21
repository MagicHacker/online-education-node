/**
 * 课程目录
 */
const express = require('express')
const router = express.Router()
const database = require('../config/db.ts')
const utils = require('../utils/index.ts')

// 查询课程目录
router.get('/getCatalog', (req, res) => {
  const { courseId } = req.query
  const sql = 'select * from catalog_tbl where course_id = ?'
  database.sqlConnect(sql, [courseId], (err, result) => {
    if (err) {
      res.send('查询失败' + err)
    } else {
      result.forEach(item => {
        item.live_time = utils.formatDate(item.live_time)
      })
      res.json(utils.formatSuccessRes(result))
    }
  })
})

// 删除课程目录
router.delete('/deleteCatalog', (req, res) => {
  const { catalogId } = req.query
  const sql = 'delete from catalog_tbl where catalog_id =?'
  database.sqlConnect(sql, [catalogId], (err, result) => {
    if (err) {
      res.send('删除失败' + err)
    } else {
      res.send({
        code: 0,
        msg: '删除成功'
      })
    }
  })
})

// 添加课程目录
router.post('/addCatalog', (req, res) => {
  const { catalogName, liveTime, courseId } = req.body
  const sql =
    'insert into catalog_tbl (name, live_time, live_status,course_id) values (?,?,1,?)'
  database.sqlConnect(sql, [catalogName, liveTime, courseId], (err, result) => {
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
