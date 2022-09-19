const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.verify = (token, callback) => {
    jwt.verify(token, config.secret, callback);
};

exports.sign = (id, time) =>{
    return jwt.sign(id, config.secret, time);
};
