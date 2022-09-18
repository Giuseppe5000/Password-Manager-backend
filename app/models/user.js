const dbConn = require("../config/db.config.js")
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

const jwtVerify = (token, callback) => {
    jwt.verify(token, config.secret, callback);
}

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

    static passwords(user, result) {
        jwtVerify(user.token, (err, decoded) => {
            if (err) {
                result(err, null);
                return;
            }
            dbConn.query(`SELECT * FROM Password WHERE IdUser = ?`, [decoded.id], (err, rows) => {
                if (rows) {
                    let passwords = []
                    rows.forEach(row => {
                        passwords.push({ "title": row.Title, "username": row.Username, "password": row.Password, "url": row.Url })
                    });
                    result(null, { passwords })
                }
                else {
                    result(err, null);
                    return;
                }
            });
        });

    }

    static addPassword(user, result) {
        jwtVerify(user.token, (err, decoded) => {
            if(err) {
                result(err, null);
                return;
            }
            result(null, { "addPassword": "true" });
        });

    }

}


module.exports = User;