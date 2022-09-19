module.exports = app => {
    const userController = require("../controllers/userController");

    let router = require("express").Router();

    // User routes
    router.get("/passwords", userController.passwords);
    router.post("/addPasswordItem", userController.addPasswordItem);
    router.get("/legged", userController.logged);


    app.use('/user', router);
};