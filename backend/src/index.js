const express = require ('express');
const app = express();
const cors = require('cors');

const connection = require('./connectionPooling');
const mysql = require('mysql');
const dbdata = require('./config.json');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(8000, () => {
    console.log("NodeJS server running!");
});

app.use(bodyParser.json());

app.use(cors({ origin:dbdata.frontEnd, credentials:true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

connection.getConnection((err) => {
    if(err){
        throw new 'Error occured: ' + err;
    }
    console.log("pool created");
});

// app.post('/login', function (req, res) {

//     console.log('Inside login POST');
//     console.log('Request Body: ', req.body);

//     //Query

//     connection.getConnection(function (err, conn) {
//         if (err) {
//             console.log('Error in creating connection!');
//             res.writeHead(400, {
//                 'Content-type': 'text/plain'
//             });
//             res.end('Error in creating connection!');
//         }
//         else {

//             //Login validation query
//             var sql = 'SELECT * from login_credentials WHERE Email = ' + mysql.escape(req.body.Email);
//             conn.query(sql, function (err, result) {

//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     });
//                     console.log('Invalid Credentials1!');
//                     res.end('Invalid Credentials1!');
//                 }
//                 else {
//                     if (result.length == 0 || req.body.Password != result[0].Password) {
//                         res.writeHead(401, {
//                             'Content-type': 'text/plain'
//                         })
//                         console.log('Invalid Credentials2!');
//                         res.end('Invalid Credentials2!');
//                     }
//                     else {
//                         console.log(result);
//                         // res.cookie('cookie', result[0].Firstname, {
//                         //     maxAge: 360000,
//                         //     httpOnly: false,
//                         //     path: '/'
//                         // });
//                         // res.cookie('Accounttype', result[0].Accounttype, {
//                         //     maxAge: 360000,
//                         //     httpOnly: false,
//                         //     path: '/'
//                         // });
//                         // req.session.user = result[0];
//                         res.writeHead(200, {
//                             'Content-type': 'text/plain'
//                         })
//                         console.log('Login successful!');
//                         res.end('Login successful!');
//                     }

//                 }
//             });
//         }
//     });
// });

app.post('/login', function (req, res) {

    console.log('Inside login POST');
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
            var sql = 'SELECT * from login_credentials WHERE Email = ' + mysql.escape(req.body.Email);
            conn.query(sql, function (err, result) {

                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Invalid Credentials!');
                }
                else {
                    if (result.length == 0 || !bcrypt.compare(req.body.Password, result[0].Password)) {
                        res.writeHead(401, {
                            'Content-type': 'text/plain'
                        })
                        console.log('Invalid Credentials!');
                        res.end('Invalid Credentials!');
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
                        // res.writeHead(200, {
                        //     'Content-type': 'text/plain'
                        // })
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
    console.log('Request Body: ', req.body);

    // const Email = mysql.escape(req.body.Email);
    // const Name = mysql.escape(req.body.Name);
    // const Password = mysql.escape(req.body.Password);

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
            const hashedPassword = bcrypt.hash(req.body.Password, saltRounds);
            conn.query("INSERT INTO login_credentials (Email, Name, Password) VALUES (?,?,?);", [mysql.escape(req.body.Email), mysql.escape(req.body.Name), mysql.escape(hashedPassword)], 
            function (err, result) {
                    if (err) {
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        });
                        res.end('ERROR');
                    }
                    else{
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        })
                        console.log("Added the user successfully: " + req.body.Email);
                    }
            });
        }
    });
});