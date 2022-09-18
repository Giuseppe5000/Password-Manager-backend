const dbConn = require("../config/db.config.js")
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");


// User model
class User {
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
        this.token = user.token;
        this.email = user.email;
    }

    static login(user, result) {
        dbConn.query(`SELECT * FROM User WHERE Username=? AND Password=?`, [user.username, user.password], (err, rows) => {

            if (rows[0]) {
                const id = rows[0].IdUser
                let token = jwt.sign({ id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });
                result(null, { token })
            }
            else {
                result(err, null);
                return;
            }
        });
    }

    static register(user, result) {
        dbConn.query(`INSERT INTO User(Username, Password, Email) VALUES(?,?,?)`, [user.username, user.password, user.email], (err) => {
            if (err) {
                result(err, null);
                return;
            }
            else {
                result(null, { "state": "success" });
            }
        });
    }

    static logged(user, result) {
        jwt.verify(user.token, config.secret, (err, decoded) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { "status": "logged" });
        });

    }

    // static passwords(user, result) {
    //     jwt.verify(user.token, config.secret, (err, decoded) => {
    //         if (err) {
    //             result(err, null);
    //             return;
    //         }
    //         result(null, { "passwords": "boh, aff, sdgtw" });
    //     });

    // }

}


module.exports = User;