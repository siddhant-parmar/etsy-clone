var express = require ('express');
var cors = require('cors');
var mysql = require('mysql');
const router = express.Router();

// import { BodyParser } from 'body-parser';

const app = express();
var dbdata = require("./config.json");
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(8000, () => {
    console.log("NodeJS server running!");
});

app.use(bodyParser.json());
app.use(cors({ origin:dbdata.frontend, credentials:true }));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin: http://localhost:3000");
//     next();
//   });

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

app.post('/login', function (req, res) {

    console.log('Inside login POST');

    // BodyParser(req.body)

    console.log('Request Body: ', req.body);

    //Query

    connection.getConnection(function (err, conn) {
        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            //Login validation query
            var sql = 'SELECT * from login_credentials WHERE username = ' + mysql.escape(req.body.Email);
            conn.query(sql, function (err, result) {

                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Invalid Credentials!1');
                }
                else {
                    if (result.length == 0 || req.body.Password != result[0].Password) {
                        res.writeHead(401, {
                            'Content-type': 'text/plain'
                        })
                        console.log(result[0]);
                        console.log('Invalid Credentials!2');
                        res.end('Invalid Credentials!3');
                    }
                    else {
                        console.log(result);
                        // res.cookie('cookie', result[0].Firstname, {
                        //     maxAge: 360000,
                        //     httpOnly: false,
                        //     path: '/'
                        // });
                        // res.cookie('Accounttype', result[0].Accounttype, {
                        //     maxAge: 360000,
                        //     httpOnly: false,
                        //     path: '/'
                        // });
                        // req.session.user = result[0];
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        })
                        console.log('Login successful!');
                        res.end('Login successful!');
                    }

                }
            });
        }
    });
});

app.post('/signup', function (req, res){

    console.log('Inside signup POST');

    // BodyParser(req.body)

    console.log('Request Body: ', req.body);

    //Query

    connection.getConnection(function (err, conn) {
        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            //Login validation query
            var sql = "INSERT INTO login_credentials (Email, Name, Password) VALUES (" + mysql.escape(req.body.Email) + ", " + mysql.escape(req.body.Fname) + ", " + mysql.escape(req.body.Password) + ");";

            conn.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('ERROR');
                }
                else{
                    if (result.length == 0 || req.body.Email != result[0].Email) {
                        res.writeHead(401, {
                            'Content-type': 'text/plain'
                        })
                        console.log(result[0]);
                        console.log('Invalid Credentials!2');
                        res.end('Invalid Credentials!3');
                    }
                    else{
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        })
                        console.log(result[0]);
                    }
                }
            });
        }
    });
});