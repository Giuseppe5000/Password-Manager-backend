const User = require("../models/user.js");
const PasswordItem = require("../models/passwordItem.js");

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

// Add passwordItem
exports.addPasswordItem = (req, res) => {

  // Create PasswordItem 
  const passwordItem = new PasswordItem({
    title: req.body.title,
    username: req.body.username,
    password: req.body.password,
    url: req.body.url,
    token: req.headers['authorization']
  });

  PasswordItem.addPasswordItem(passwordItem, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "(addPasswordItem) Some error occurred"
      });
    else res.send(data);
  });

};
