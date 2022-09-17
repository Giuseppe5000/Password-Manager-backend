const express = require('express')
const mysql = require('mysql')
let cookieParser = require('cookie-parser');
const cors = require('cors')

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
})

connection.connect();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["https://password-manager-8280f.web.app/"]
}));
app.use(cookieParser(process.env.SECRET));

app.post('/login', (req, res) => {
    connection.query(`SELECT Username, Password FROM User WHERE Username=? AND Password=?`, [req.body.username, req.body.password], (err, rows, fields) => {
        if (rows[0]){
            res.cookie('name', req.body.username).send('cookie set');
        }
        else {
            res.sendStatus(404);
        }
    })
})

app.post('/register', (req, res) => {
    connection.query(`INSERT INTO User(Username, Password) VALUES(?,?)`, [req.body.username, req.body.password], (err, result) => {
        if (err) {
            res.json({ "state": "failed" });
        }
        else {
            res.json({ "state": "success" });
        }
    })
})


app.get('/accessData', (req, res) => {
    res.json({"OK":req.cookies})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
