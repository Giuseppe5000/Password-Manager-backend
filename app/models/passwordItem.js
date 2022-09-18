const dbConn = require("../config/db.config.js")
const jwtVerify = require("../jwt/jwtVerify.js");

// PasswordItem model
class PasswordItem {
    constructor(passwordItem) {
        this.title = passwordItem.title;
        this.username = passwordItem.username;
        this.password = passwordItem.password;
        this.url = passwordItem.url;
        this.token = passwordItem.token;
    }

    static addPasswordItem(passwordItem, result) {
        jwtVerify(passwordItem.token, (err, decoded) => {
            if (err) {
                result(err, null);
                return;
            }
            dbConn.query(`INSERT INTO Password(Title, Username, Password, Url, IdUser) VALUES(?,?,?,?,?)`, [passwordItem.title, passwordItem.username, passwordItem.password, passwordItem.url, decoded.id], (err) => {
                if (err) {
                    result(err, null);
                    return;
                }
                else {
                    result(null, { "state": "success" });
                }
            });
        });

    }

}

module.exports = PasswordItem;