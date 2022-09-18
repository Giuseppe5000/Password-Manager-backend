module.exports = app => {
    const userController = require("../controllers/userController");

    let router = require("express").Router();

    // User routes
    //router.get("/passwords", userController.passwords);
    // router.post("/addPasswords", userController.addPasswords);


    app.use('/user', router);
};