const User = require("../models/user.js");

// Passwords
exports.passwords = (req, res) => {

  // Create user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    token: req.headers['authorization']
  });

  User.passwords(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "(Passwords) Some error occurred"
      });
    else res.send(data);
  });

};

// Add password
exports.addPassword = (req, res) => {

  // Create user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    token: req.headers['authorization']
  });

  User.addPassword(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "(addPasswords) Some error occurred"
      });
    else res.send(data);
  });

};
