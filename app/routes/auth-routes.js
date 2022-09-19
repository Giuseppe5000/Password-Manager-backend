const cookieParser = require('cookie-parser');
module.exports = app => {
    const authController = require("../controllers/authController.js");

    let router = require("express").Router();
    router.use(cookieParser());

    // Auth routes
    router.post("/login", authController.login);
    router.post("/register", authController.register);


    app.use('/auth', router);
};