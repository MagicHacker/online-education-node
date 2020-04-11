/**
 * 教师管理
 */
const express = require("express");
const router = express.Router();
const database = require("../config/db.ts");
const utils = require("../utils/index.ts");

// 查询教师
router.get("/getTeachers", async (req, res) => {
  const {
    name = "",
    phone = "",
    status = "",
    regTime = "",
    pageNum,
    pageSize,
  } = req.query;
  const totalSql = "select count(*) as total from teacher_tbl";
  const sql = `select any_value(sub.name) as name,any_value(sub.phone) as phone,
    any_value(sub.gride) as gride,any_value(sub.subject) as subject,
    any_value(sub.commission) as commission,any_value(sub.brief) as brief,
    any_value(sub.status) as status,any_value(sub.rgt_time) as rgt_time,
    count(sub.course_id) as courseCount,count(sub.stu_id) as stuCount from 
    (select tea.*,tecStu.stu_id,teCourse.course_id from teacher_tbl tea 
      left join tec_stu_tbl tecStu on tea.phone = tecStu.teacher_id 
      left join teac_course_tbl teCourse on tea.phone = teCourse.teacher_id) 
    sub group by sub.stu_id
    having name like ? and phone like ? and status like ? and rgt_time like ? limit ?,?`;
  const total = await database.sqlConnect(totalSql, []);
  const result = await database.sqlConnect(sql, [
    `%${name}%`,
    `%${phone}%`,
    `%${status}%`,
    `%${regTime}%`,
    (parseInt(pageNum) - 1) * parseInt(pageSize),
    parseInt(pageSize),
  ]);
  if (result) {
    result.forEach((item) => {
      item.rgt_time = utils.formatDate(item.rgt_time);
    });
    res.json(utils.formatSuccessRes(result, total[0].total, pageNum, pageSize));
  } else {
    res.send("查询失败" + result);
  }
});

// 添加教师
router.post("/addTeacher", (req, res) => {
  const { phone, name, gride, subject, commission, brief } = req.body;
  const sql =
    "insert into teacher_tbl (phone,name,gride,subject,commission,brief) values(?,?,?,?,?,?)";
  database.sqlConnect(
    sql,
    [phone, name, gride, subject, commission, brief],
    (err, result) => {
      if (err) {
        res.send("插入失败" + err);
      } else {
        res.send({
          code: 0,
          msg: "插入成功",
        });
      }
    }
  );
});

// 修改
router.post("/updateTeacher", async (req, res) => {
  const {
    phone,
    name = "",
    gride = "",
    subject = "",
    commission = 0,
    brief = "",
    status = 0,
  } = req.body;
  const sql =
    "update teacher_tbl set name = ?, gride = ?,subject = ?,commission = ?,brief = ?, status =? where phone = ?";
  const result = await database.sqlConnect(sql, [
    name,
    gride,
    subject,
    commission,
    brief,
    status,
    phone,
  ]);
  if (result) {
    res.send({
      code: 0,
      msg: "更新成功",
    });
  } else {
    res.send("更新失败" + result);
  }
});
module.exports = router;
