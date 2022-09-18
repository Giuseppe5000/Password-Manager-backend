const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const jwtVerify = (token, callback) => {
    jwt.verify(token, config.secret, callback);
}


module.exports = jwtVerify;