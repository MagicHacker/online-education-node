/**
 * 分类管理
 */
export {};
const express = require("express");
const router = express.Router();
const database = require("../config/db");
// 查询分类
router.get("/getClass", (req, res) => {
  database.sqlConnect();
});
// 添加分类
router.post("/addClass", (req, res) => {});
// 更新分类
router.post("/updateClass", (req, res) => {});
// 删除分类
router.delete("deleteClass", (req, res) => {});
module.exports = router;
