const mysql = require("mysql")

const connection = mysql.createConnection({
  user: "root",
  password: "manager",
  host: "localhost",
  port: 3306,
  database: "DigitalFlex",
})

connection.connect()

module.exports = connection
