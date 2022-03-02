var express = require ('express');
var cors = require('cors');
var mysql = require('mysql');
const router = express.Router();

const app = express();
var dbdata = require("./config.json");

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(8000, () => {
    console.log("NodeJS server running!");
});

app.use(cors({ origin:dbdata.frontend, credentials:true }));

var connection = mysql.createPool({
    host: dbdata.DB.host,
    user: dbdata.DB.username,
    password: dbdata.DB.password,
    port: dbdata.DB.port,
    database: dbdata.DB.database
});

connection.getConnection((err) => {
    if(err){
        throw new 'Error occured: ' + err;
    }
    console.log("pool created");
});

app.get('/login', (req, res) => {});