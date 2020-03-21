/**
 * 文档管理
 */
const express = require('express')
const router = express.Router()
const database = require('../config/db')
const utils = require('../utils/index')

// 查询文档
router.get('/getDocs', (req, res) => {
  // 获取请求参数
  let { docName, createTime } = req.query
  let sql = 'select doc_name, upload_time from doc_tbl'
  if (docName && !createTime) {
    sql += ' where doc_name = ?'
    createTime = ''
  } else if (!docName && createTime) {
    sql += ' where upload_time = ?'
    docName = ''
  } else if (docName && createTime) {
    sql += ' where doc_name = ? or upload_time = ?'
  }
  database.sqlConnect(sql, [docName, createTime], (err, result) => {
    if (err) {
      res.send('查询失败' + err)
    } else {
      result.forEach(item => {
        item.upload_time = utils.formatDate(item.upload_time)
      })
      res.json(utils.formatSuccessRes(result))
    }
  })
})
// 删除文档
router.delete('/deleteDoc', (req, res) => {
  const { docId } = req.query
  const sql = 'delete from doc_tbl where doc_id = ?'
  database.sqlConnect(sql, [docId], (err, result) => {
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
// 添加文档
router.post('/addDoc', (req, res) => {
  const { docName, uploadUser } = req.body
  const sql = 'insert into doc_tbl (doc_name,upload_user) values(?,?)'
  database.sqlConnect(sql, [docName, uploadUser], (err, result) => {
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
// 更新文档
router.post('/updateDoc', (req, res) => {
  const { docId, docName, uploadUser } = req.body
  const sql = 'update doc_tbl set doc_name = ?,upload_user = ? where doc_id = ?'
  database.sqlConnect(sql, [docName, uploadUser, docId], (err, result) => {
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
module.exports = router
