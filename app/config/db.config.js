const mysql = require("mysql");
//let dotenv = require('dotenv').config()

// DB connect
const connection = mysql.createPool({
    host: process.env.HOST, //dotenv.parsed.HOST,
    user: process.env.USER, //dotenv.parsed.USER,
    password: process.env.PASS, //dotenv.parsed.PASS,
    database: process.env.DB, //dotenv.parsed.DB
})

module.exports = connection;