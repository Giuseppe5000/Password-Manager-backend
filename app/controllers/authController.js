const User = require("../models/user.js");

// Login
exports.login = (req, res) => {

  // Create user
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  User.login(user, (err, data) => {
    if (err)
      res.status(404).send({
        message:
          err.message || "(Login) Some error occurred"
      });
    else res.send(data);
  });
  
};

// Register
exports.register = (req, res) => {

  // Create user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  User.register(user, (err, data) => {
    if (err)
      res.status(404).send({
        message:
          err.message || "(Register) Some error occurred"
      });
    else res.send(data);
  });

};