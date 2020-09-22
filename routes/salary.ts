/**
 * 收入管理
 */
import * as express from 'express'
// const express = require("express");
const router = express.Router();
const database = require("../config/db.ts");
const utils = require("../utils/index.ts");

// 查询收入
router.get("/getSalarys", async (req, res) => {
  const {
    teacherName = "",
    dealType = "",
    dealTime = "",
    pageNum,
    pageSize
  } = req.query;
  // 关联查询，先查询所有需要字段，再根据条件进行筛选
  const sql =
    "select sal.*,(sal.sal_sum - sal_deal) as sal_after,tea.name,tea.phone from sal_tbl sal left join teacher_tbl tea on sal.teacher_id = tea.phone where tea.name like ? and sal.sal_type like ? and sal.deal_time like ? limit ?,?";
  const totalSql = "select count(*) as total from sal_tbl";
  const total = await database.sqlConnect(totalSql, []);
  const result = await database.sqlConnect(sql, [
    `%${teacherName}%`,
    `%${dealType}%`,
    `%${dealTime}%`,
    (parseInt(pageNum) - 1) * parseInt(pageSize),
    parseInt(pageSize)
  ]);
  if (result) {
    result.forEach(item => {
      item.deal_time = utils.formatDate(item.deal_time);
    });
    res.json(utils.formatSuccessRes(result, total[0].total, pageNum, pageSize));
  } else {
    res.send("查询失败" + result);
  }
});

// 添加收入
router.post("/addSalary", (req, res) => {
  const { salaryId, dealType, dealSalary, salarySum, teacherId } = req.body;
  const sql =
    "insert into sal_tbl (sal_id,sal_type,sal_deal,sal_sum,teacher_id) values(?,?,?,?,?)";
  database.sqlConnect(
    sql,
    [salaryId, dealType, dealSalary, salarySum, teacherId],
    (err, result) => {
      if (err) {
        res.send("插入失败" + err);
      } else {
        res.send({
          code: 0,
          msg: "插入成功"
        });
      }
    }
  );
});
module.exports = router;
