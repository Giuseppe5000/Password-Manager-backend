const User = require("../models/user.js");

// Login
exports.login = (req, res) => {

  // Create user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    token: req.headers["x-access-token"]
  });

  User.login(user, (err, data) => {
    if (err)
      res.status(500).send({
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
    token: req.headers["x-access-token"]
  });

  User.register(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "(Register) Some error occurred"
      });
    else res.send(data);
  });

};

// Logged?
exports.logged = (req, res) => {

  // Create user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    token: req.headers['authorization']
  });

  User.logged(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "(Logged) Some error occurred"
      });
    else res.send(data);
  });

};