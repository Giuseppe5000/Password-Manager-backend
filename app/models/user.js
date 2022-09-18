const dbConn = require("../config/db.config.js")
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");


// User model
class User {
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
        this.token = user.token;
    }

    static login(user, result) {
        dbConn.query(`SELECT Username, Password FROM User WHERE Username=? AND Password=?`, [user.username, user.password], (err, rows) => {
            if (rows[0]) {
                let token = jwt.sign({ id: user.username }, config.secret, {
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
        dbConn.query(`INSERT INTO User(Username, Password) VALUES(?,?)`, [user.username, user.password], (err) => {
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
            result(null, {"status":"logged"});
        });

    }

}


module.exports = User;