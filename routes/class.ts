/**
 * 分类管理
 */
// export {};
const express = require('express')
const router = express.Router()
const database = require('../config/db.ts')
const utils = require('../utils/index.ts')
// 查询分类
router.get('/getClass', (req, res) => {
  // 获取请求参数
  const { className = '', createTime = '' } = req.query
  const sql =
    'select * from category_tbl where cate_name like ? and create_time like ?'
  database.sqlConnect(
    sql,
    [`%${className}%`, `%${createTime}%`],
    (err, result) => {
      if (err) {
        res.send('查询失败' + err)
      } else {
        result.forEach(item => {
          item.create_time = utils.formatDate(item.create_time)
        })
        res.json(utils.formatSuccessRes(result))
      }
    }
  )
})
// 添加分类
router.post('/addClass', (req, res) => {
  const { className, classSort } = req.body
  const sql = 'insert into category_tbl (cate_name,cate_sort) values (?,?)'
  database.sqlConnect(sql, [className, classSort], err => {
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
// 更新分类
router.post('/updateClass', (req, res) => {
  const { classId, className, classSort } = req.body
  const sql =
    'update category_tbl set cate_name = ?, cate_sort = ? where cate_id = ?'
  database.sqlConnect(sql, [className, classSort, classId], err => {
    if (err) {
      res.send('更新失败' + err)
    } else {
      res.send({
        code: 0,
        msg: '更新成功'
      })
    }
  })
})
// 删除分类
router.delete('/deleteClass', (req, res) => {
  const { classId } = req.query
  const sql = 'delete from category_tbl where cate_id = ?'
  database.sqlConnect(sql, [classId], err => {
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
module.exports = router
