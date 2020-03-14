const mysql = require("mysql2");
const database = require("../config/db.ts");
const connection = mysql.createConnection(database.mysql);
connection.connect(err => {
  if (err) {
    console.log("失败");
  } else {
    console.log("成功");
  }
});
