module.exports = app => {
    const authController = require("../controllers/authController.js");

    let router = require("express").Router();

    // User routes
    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/logged", authController.logged);


    app.use('/auth', router);
};