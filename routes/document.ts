/**
 * 文档管理
 */
const express = require("express");
const router = express.Router();
const database = require("../config/db.ts");
const utils = require("../utils/index.ts");

// 查询文档
router.get("/getDocs", async (req, res) => {
  // 获取请求参数
  const { docName = "", uploadTime = "", pageNum, pageSize } = req.query;
  const sql =
    "select * from doc_tbl where doc_name like ? and upload_time like ? limit ?,?";
  const totalSql = "select count(*) as total from doc_tbl";
  const total = await database.sqlConnect(totalSql, []);
  const result = await database.sqlConnect(sql, [
    `%${docName}%`,
    `%${uploadTime}%`,
    (parseInt(pageNum) - 1) * parseInt(pageSize),
    parseInt(pageSize)
  ]);
  result.forEach(item => {
    item.upload_time = utils.formatDate(item.upload_time);
  });
  res.json(utils.formatSuccessRes(result, total[0].total, pageNum, pageSize));
});
// 删除文档
router.delete("/deleteDoc", async (req, res) => {
  const { docId } = req.query;
  const sql = "delete from doc_tbl where doc_id = ?";
  const result = await database.sqlConnect(sql, [docId]);
  if (result) {
    res.send({
      code: 0,
      msg: "删除成功"
    });
  } else {
    res.send("删除失败" + result);
  }
});
// 添加文档
router.post("/addDoc", (req, res) => {
  const { docName, uploadUser } = req.body;
  const sql = "insert into doc_tbl (doc_name,upload_user) values(?,?)";
  database.sqlConnect(sql, [docName, uploadUser], (err, result) => {
    if (err) {
      res.send("插入失败" + err);
    } else {
      res.send({
        code: 0,
        msg: "插入成功"
      });
    }
  });
});
// 更新文档
router.post("/updateDoc", (req, res) => {
  const { docId, docName, uploadUser } = req.body;
  const sql =
    "update doc_tbl set doc_name = ?,upload_user = ? where doc_id = ?";
  database.sqlConnect(sql, [docName, uploadUser, docId], (err, result) => {
    if (err) {
      res.send("更新失败" + err);
    } else {
      res.send({
        code: 0,
        msg: "更新成功"
      });
    }
  });
});
module.exports = router;
