/**
 * mysql数据库配置与连接
 */
const mysql = require('mysql2')
module.exports = {
  mysql: {
    host: '127.0.0.1',
    user: 'root',
    password: 'zhang2684323',
    database: 'onlineEducation',
    port: 3306
  },
  sqlConnect: function(sql, data): Promise<{}> {
    const connection = mysql.createConnection(this.mysql)
    return new Promise((resolve, reject) => {
      connection.connect(err => {
        if (err) {
          console.log('连接失败')
          return false
        } else {
          console.log('连接成功')
        }
      })
      console.log(sql)
      connection.query(sql, data, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
      // 关闭连接
      connection.end()
    })
  }
}
