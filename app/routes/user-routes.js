module.exports = app => {
    const userController = require("../controllers/userController");

    let router = require("express").Router();

    // User routes
    router.get("/passwords", userController.passwords);
    router.post("/addPassword", userController.addPassword);


    app.use('/user', router);
};