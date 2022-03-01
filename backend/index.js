var express = require ('express');
var cors=require('cors');
const app = express();

var mysql = require('mysql');

var dbdata = require('./config.json');
app.use(cors({origin:dbdata.frontend,credentials:true}));
var connection = mysql.createPool({
    host:dbdata.DB.host,
    username:dbdata.DB.username,
    password:dbdata.DB.password,
    port:dbdata.DB.port,
    database:dbdata.DB.database
});
console.log(dbdata.DB);
connection.getConnection((err) => {
    if(err){
        throw 'Error occured: ' + err;
    }
    console.log("pool created");
});