/**
 * 课程管理
 */
const express = require("express");
const router = express.Router();
const database = require("../config/db.ts");
const utils = require("../utils/index.ts");

// 查询课程
router.get("/getCourses", async (req, res) => {
  const {
    courseName = "",
    teacherName = "",
    oneLevel = "",
    twoLevel = "",
    createTime = "",
    pageNum,
    pageSize
  } = req.query;
  const totalSql = "select count(*) as total from course_tbl";
  const sql =
    "select course.*,teacher.name as teacherName from course_tbl course left join teac_course_tbl teaCourse on course.course_id = teaCourse.course_id left join teacher_tbl teacher on teaCourse.teacher_id = teacher.phone where course.name like ? and teacher.name like ? and one_level like ? and two_level like ? and create_time like ? limit ?,?";
  const total = await database.sqlConnect(totalSql, []);
  const result = await database.sqlConnect(sql, [
    `%${courseName}%`,
    `%${teacherName}%`,
    `%${oneLevel}%`,
    `%${twoLevel}%`,
    `%${createTime}%`,
    (parseInt(pageNum) - 1) * parseInt(pageSize),
    parseInt(pageSize)
  ]);
  if (result) {
    result.forEach(item => {
      item.createTime = utils.formatDate(item.create_time);
    });
    res.json(utils.formatSuccessRes(result, total[0].total, pageNum, pageSize));
  } else {
    res.send("查询失败" + result);
  }
});

// 添加课程
router.post("/addCourse", (req, res) => {
  const { courseName, oneLevel, twoLevel, grade, price, courseUnit } = req.body;
  const sql =
    "insert into course_tbl (name,one_level,two_level,grade,price,course_unit) values(?,?,?,?,?,?)";
  database.sqlConnect(
    sql,
    [courseName, oneLevel, twoLevel, grade, price, courseUnit],
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

// 更新课程
router.post("/updateCourse", (req, res) => {
  const {
    courseName,
    oneLevel,
    twoLevel,
    grade,
    price,
    courseUnit,
    courseId
  } = req.body;
  const sql =
    "update course_tbl set name = ?,one_level = ?, two_level = ?,grade = ?, price = ?, course_unit = ? where course_id = ?";
  database.sqlConnect(
    sql,
    [courseName, oneLevel, twoLevel, grade, price, courseUnit, courseId],
    (err, result) => {
      if (err) {
        res.send("更新失败" + err);
      } else {
        res.send({
          code: 0,
          msg: "更新成功"
        });
      }
    }
  );
});
module.exports = router;
