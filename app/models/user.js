const dbConn = require("../config/db.config.js");
const jwtFunctions = require("../jwt/jwtFunctions.js");
const SHA256 = require("crypto-js/sha256");

// User model
class User {
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
        this.token = user.token;
        this.email = user.email;
    }

    static login(user, result) {
        dbConn.query(`SELECT * FROM User WHERE Username=? AND Password=?`, [user.username, String(SHA256(user.password))], (err, rows) => {

            if (rows[0]) {
                const id = rows[0].IdUser
                let token = jwtFunctions.sign({ id }, {expiresIn: 86400}) // 24 hours
                result(null, { token });
            }
            else if (err) {
                result(err, null);
                return;
            }
            else {
                result({"message":"Username or password wrong"}, null);
                return;
            }
        });
    }

    static register(user, result) {
        dbConn.query(`SELECT * FROM User WHERE Username=?`, [user.username], (err, rows) => {
            if (rows[0]) {
                result(null, { "state": "username alredy used" });
            }
            else if (err){
                result(err, null);
            }
            else {
                dbConn.query(`INSERT INTO User(Username, Password, Email) VALUES(?,?,?)`, [user.username, String(SHA256(user.password)), user.email], (err) => {
                    if (err) {
                        result(err, null);
                        return;
                    }
                    else {
                        result(null, { "state": "success" });
                    }
                });
            }
        })

    }

    static passwords(user, result) {
        jwtFunctions.verify(user.token, (err, decoded) => {
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

}


module.exports = User;