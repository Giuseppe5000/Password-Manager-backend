const mysql = require('mysql')

// DB connect
//let dotenv = require('dotenv').config()
const connection = mysql.createConnection({
    host: process.env.HOST, //dotenv.parsed.HOST,
    user: process.env.USER, //dotenv.parsed.USER,
    password: process.env.PASS, //dotenv.parsed.PASS,
    database: process.env.DB, //dotenv.parsed.DB
})

connection.connect();

// User model
class User {
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
    }

    static login(user, result) {
        connection.query(`SELECT Username, Password FROM User WHERE Username=? AND Password=?`, [user.username, user.password], (err, rows) => {
            if (rows[0]) {
                result(null, { token: user.username });
            }
            else {
                result(err, null);
                return;
            }
        });
    }

    static register(user, result) {
        connection.query(`INSERT INTO User(Username, Password) VALUES(?,?)`, [user.username, user.password], (err) => {
            if (err) {
                result(err, null);
                return;
            }
            else {
                result(null, { "state": "success" });
            }
        });
    }
}


module.exports = User;