/**
 * 订单管理
 */
const express = require("express");
const router = express.Router();
const database = require("../config/db.ts");
const utils = require("../utils/index.ts");

// 查询订单
router.get("/getOrders", async (req, res) => {
  const {
    orderId = "",
    buyerName = "",
    courseStatus = "",
    pageNum,
    pageSize
  } = req.query;
  const totalSql = "select count(*) as total from order_tbl";
  const sql = `select orderTbl.*, course.name as courseName,
  course.course_status as courseStatus,
  teacher.name as teacherName, stu.name as studentName 
  from order_tbl orderTbl left join course_tbl course on orderTbl.course_id = course.course_id
  left join teacher_tbl teacher on orderTbl.teac_id = teacher.phone
  left join stu_tbl stu on orderTbl.stu_id = stu.phone 
  where order_id like ? and stu.name like ? and course.course_status like ? limit ?,?`;
  const total = await database.sqlConnect(totalSql, []);
  const result = await database.sqlConnect(sql, [
    `%${orderId}%`,
    `%${buyerName}%`,
    `%${courseStatus}%`,
    (parseInt(pageNum) - 1) * parseInt(pageSize),
    parseInt(pageSize)
  ]);
  result.forEach(item => {
    item.pay_time = utils.formatDate(item.pay_time);
  });
  res.json(utils.formatSuccessRes(result, total[0].total, pageNum, pageSize));
});

module.exports = router;
