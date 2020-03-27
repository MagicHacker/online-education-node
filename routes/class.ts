/**
 * 分类管理
 */
// export {};
const express = require('express')
const router = express.Router()
const database = require('../config/db.ts')
const utils = require('../utils/index.ts')
// 查询分类
router.get('/getClass', async (req, res) => {
  // 获取请求参数
  const {
    className = '',
    createTime = '',
    pageNum,
    pageSize,
    classId
  } = req.query
  const totalSql = 'select count(*) as total from category_tbl'
  let data = [
    `%${className}%`,
    `%${createTime}%`,
    (parseInt(pageNum) - 1) * parseInt(pageSize),
    parseInt(pageSize)
  ]
  let sql =
    'select * from category_tbl where cate_name like ? and create_time like ? limit ?,?'
  if (classId) {
    sql = 'select * from category_tbl where cate_id = ?'
    data = [classId]
  }
  const total = await database.sqlConnect(totalSql, [])
  const result = await database.sqlConnect(sql, data)
  result.forEach(item => {
    item.create_time = utils.formatDate(item.create_time)
  })
  res.json(utils.formatSuccessRes(result, total[0].total, pageNum, pageSize))
})
// 添加分类
router.post('/addClass', async (req, res) => {
  const { className, classSort } = req.body
  const sql = 'insert into category_tbl (cate_name,cate_sort) values (?,?)'
  const result = await database.sqlConnect(sql, [className, classSort])
  // 未报错
  if (result) {
    res.send({
      code: 0,
      msg: '添加成功'
    })
  } else {
    res.send('添加失败' + result)
  }
})
// 更新分类
router.post('/updateClass', async (req, res) => {
  const { classId, className, classSort } = req.body
  const sql =
    'update category_tbl set cate_name = ?, cate_sort = ? where cate_id = ?'
  const result = await database.sqlConnect(sql, [className, classSort, classId])
  if (result) {
    res.send({
      code: 0,
      msg: '更新成功'
    })
  } else {
    res.send('更新失败' + result)
  }
})
// 删除分类
router.delete('/deleteClass', async (req, res) => {
  const { classId } = req.query
  const sql = 'delete from category_tbl where cate_id = ?'
  const result = await database.sqlConnect(sql, [classId])
  if (result) {
    res.send({
      code: 0,
      msg: '删除成功'
    })
  } else {
    res.send('删除失败' + result)
  }
})
module.exports = router
