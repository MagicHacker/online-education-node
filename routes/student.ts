/**
 * 学生管理
 */
const express = require("express");
const router = express.Router();
const database = require("../config/db.ts");
const utils = require("../utils/index.ts");

// 查询学生
router.get("/getStudents", async (req, res) => {
  const { name = "", phone = "", rgtTime = "", pageNum, pageSize } = req.query;
  const totalSql = "select count(*) as total from stu_tbl";
  const sql =
    "select any_value(name) as name, any_value(phone) as phone, any_value(rgt_time) as rgtTime, count(sub.stu_id) as count from (select stu.*,stuc.stu_id from stu_tbl stu left join stu_course_tbl stuc on stu.phone = stuc.stu_id) sub group by sub.stu_id having name like ? and phone like ? and rgtTime like ? limit ?,?";
  const total = await database.sqlConnect(totalSql, []);
  const result = await database.sqlConnect(sql, [
    `%${name}%`,
    `%${phone}%`,
    `%${rgtTime}%`,
    (parseInt(pageNum) - 1) * parseInt(pageSize),
    parseInt(pageSize)
  ]);
  if (result) {
    result.forEach(item => {
      item.rgtTime = utils.formatDate(item.rgtTime);
    });
    res.json(utils.formatSuccessRes(result, total[0].total, pageNum, pageSize));
  } else {
    res.send("查询失败" + result);
  }
});

// 添加学生
router.post("/addStudent", (req, res) => {
  const { name, phone, password } = req.body;
  const sql = "insert into stu_tbl (name,phone,password) values(?,?,?)";
  database.sqlConnect(sql, [name, phone, password], (err, result) => {
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
module.exports = router;
