const express = require ('express');
const app = express();
const cors = require('cors');

const connection = require('./connectionPooling');
const mysql = require('mysql');
const dbdata = require('./config.json');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: "cmpe273-etsy-clone",
    resave: false,
    saveUninitialized: true,
    activeDuration: 60 * 60  * 1000,
    duration: 5 * 60  * 1000
    // cookie: {
    //     expires: 60 * 60 * 24 * 1000
    // }
}))

app.use(cors({
    origin: dbdata.frontEnd,
    methods: ["GET", "POST"], 
    credentials: true 
   }));


const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.listen(8000, () => {
    console.log("NodeJS server running!");
});

app.use(cors({ origin:dbdata.frontEnd, credentials:true }));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
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
            var sql = "SELECT * from login_credentials WHERE Email = " + mysql.escape(req.body.email) + ";";
            conn.query(sql, function (err, result) {
                console.log("Result obj: " + result[0]);
                console.log("Email == " + req.body.email);
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    console.log("Error " + err);
                    res.end('Invalid Credentials!1');
                    console.log('Invalid Credentials1!');
                }
                else {
                    console.log("Result body: " + result);
                    if(result.length == 0){
                        console.log("Result Length = 0");
                    }
                    else if (!bcrypt.compareSync(req.body.password, result[0].Password)) {
                        res.writeHead(401, {
                            'Content-type': 'text/plain'
                        })
                        console.log('Invalid Credentials2!');
                        res.end('Invalid Credentials2!');
                    }
                    else {
                        console.log(result);
                        console.log("Cookie Message:" + result[0].Name);
                        req.session.user = result;
                        res.cookie('cookie', req.body.email, {
                            maxAge: 360000,
                            httpOnly: false,
                            path: '/'
                        });
                        // res.cookie('Accounttype', result[0].Accounttype, {
                        //     maxAge: 360000,
                        //     httpOnly: false,
                        //     path: '/'
                        // });
                        console.log("Session after login: " , req.session.user);
                        // console.log("Session: " + JSON.stringify(req.session.user));
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
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            console.log('Error in creating connection!');
            res.end('Error in creating connection!');
            console.log("Error");
        }
        else {
            const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
            var sql = 'INSERT INTO login_credentials (Email, Password, Name) VALUES (' +
            mysql.escape(req.body.email) + ', ' + mysql.escape(hashedPassword) + ', ' + mysql.escape(req.body.name) + ');';

            conn.query(sql, function (err, result) {
                    if (err) {
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        });
                        res.end('ERROR');
                        console.log("Error: " + err);
                    }
                    else{
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        })
                        console.log("Added the user successfully: " + req.body.email);
                    }
            });
        }
    });
});

app.get('/home', function (req, res){
    if(req.session.user){
        res.send({
            loggedIn: true,
            user_details: req.session.user
        })
    }else{
        res.send({
            loggedIn: false
        })
    }
    console.log("Session message: " + req.session.user + " IS UNDEFINED: " + (req.session.user == undefined));
});