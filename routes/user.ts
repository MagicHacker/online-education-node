/**
 * 用户管理
 */
const express = require("express");
const router = express.Router();
const database = require("../config/db.ts");
const utils = require("../utils/index.ts");

// 查询用户
router.get("/login", async (req, res) => {
  const { username, password } = req.query;
  const sql = "select * from user_tbl where username = ? and password = ?";
  const result = await database.sqlConnect(sql, [username, password]);
  if (result.length !== 0) {
    result.forEach((item) => {
      item.create_time = utils.formatDate(item.create_time);
    });
    res.json(utils.formatSuccessRes(result));
  } else {
    res.send("查询失败" + result);
  }
});
module.exports = router;
