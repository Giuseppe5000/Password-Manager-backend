const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "https://password-manager-8280f.web.app/"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/routes.js")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});