const express = require("express");
const app = express();
const cors = require("cors");

const connection = require("./connectionPooling");
const mysql = require("mysql");
const dbdata = require("./config.json");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const path = require("path");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    secret: "cmpe273-etsy-clone",
    resave: false,
    saveUninitialized: true,
    activeDuration: 60 * 60 * 1000,
    duration: 5 * 60 * 1000,
    // cookie: {
    //     expires: 60 * 60 * 24 * 1000
    // }
  })
);

app.use(
  cors({
    origin: dbdata.frontEnd,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const bcrypt = require("bcrypt");
const { timeStamp } = require("console");
const saltRounds = 10;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(8000, () => {
  console.log("NodeJS server running!");
});

app.use(cors({ origin: dbdata.frontEnd, credentials: true }));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

connection.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("pool created");
  }
});

app.post("/login", function (req, res) {
  console.log("Inside login POST");
  console.log("Request Body: ", req.body);

  //Query

  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      //Login validation query
      var sql =
        "SELECT * from login_credentials WHERE Email = " +
        mysql.escape(req.body.email) +
        ";";
      conn.query(sql, function (err, result) {
        console.log("Result obj: " + result[0]);
        console.log("Email == " + req.body.email);
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          console.log("Error " + err);
          res.end("Invalid Credentials!1");
          console.log("Invalid Credentials1!");
        } else {
          console.log("Result body: " + result);
          if (result.length == 0) {
            console.log("Result Length = 0");
          } else if (
            !bcrypt.compareSync(req.body.password, result[0].Password)
          ) {
            res.writeHead(401, {
              "Content-type": "text/plain",
            });
            console.log("Invalid Credentials2!");
            res.end("Invalid Credentials2!");
          } else {
            console.log(result);
            console.log("Cookie Message:" + result[0].Name);
            req.session.user = result;
            res.cookie("cookie", result[0].ProfileId, {
              maxAge: 360000,
              httpOnly: false,
              path: "/",
            });
            res.cookie("ProfileDetails", JSON.stringify(result[0]), {
              maxAge: 360000,
              httpOnly: false,
              path: "/",
            });

            // res.cookie('Accounttype', result[0].Accounttype, {
            //     maxAge: 360000,
            //     httpOnly: false,
            //     path: '/'
            // });
            console.log("Session after login: ", req.session.user);
            console.log("Session: " + JSON.stringify(req.session.user));
            res.writeHead(200, {
              "Content-type": "text/plain",
            });
            console.log("Login successful!");
            res.end("Login successful!");
          }
        }
      });
    }
  });
});

app.post("/signup", function (req, res) {
  console.log("Inside signup POST");
  console.log("Request Body: ", req.body);

  // const Email = mysql.escape(req.body.Email);
  // const Name = mysql.escape(req.body.Name);
  // const Password = mysql.escape(req.body.Password);

  //Query

  connection.getConnection(function (err, conn) {
    if (err) {
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      console.log("Error in creating connection!");
      res.end("Error in creating connection!");
      console.log("Error");
    } else {
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      var sql =
        "INSERT INTO login_credentials (Email, Password, Name) VALUES (" +
        mysql.escape(req.body.email) +
        ", " +
        mysql.escape(hashedPassword) +
        ", " +
        mysql.escape(req.body.name) +
        ");";

      conn.query(sql, function (err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("ERROR");
          console.log("Error: " + err);
        } else {
          res.writeHead(200, {
            "Content-type": "text/plain",
          });
          console.log("Added the user successfully: " + req.body.email);
        }
      });
    }
  });
});

app.get("/home", function (req, res) {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user_details: req.session.user,
    });
  } else {
    res.send({
      loggedIn: false,
    });
  }
  // console.log(
  //   "Session message: " +
  //     req.session.user +
  //     " IS UNDEFINED: " +
  //     (req.session.user == undefined)
  // );
});

app.get("/getProducts", function (req, res) {
  console.log("Getting images for Home page");
  connection.getConnection(function (err, conn) {
    if (err) {
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      console.log("Error in creating connection!");
      res.end("Error in creating connection!");
      console.log("Error");
    } else {
      var sql = "SELECT * from products;";
      conn.query(sql, function (err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("ERROR");
          console.log("Error: " + err);
        } else {
          res.writeHead(200, {
            "Content-type": "text/plain",
          });
          // console.log(result);
          for (const [key, item] of Object.entries(result)) {
            var file = item.ImageName;
            var filetype = file.split(".").pop();
            console.log(file);
            var filelocation = path.join(__dirname + "/../src/uploads", file);
            var img = fs.readFileSync(filelocation);
            var base64img = new Buffer(img).toString("base64");
            item.ItemImage = "data:image/" + filetype + ";base64," + base64img;
          }
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

app.get("/productDetails", function (req, res) {
  console.log("Inside item  GET");
  console.log("Request Body ItemId: " + req.query.ItemId);
  const ItemId = req.query.ItemId;
  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      //Login validation query

      var sql = "SELECT * from products WHERE ItemId = " + mysql.escape(ItemId);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving single item data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving single item data");
        } else {
          // console.log(result[0].password);
          //   console.log("Items Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          for (const [key, item] of Object.entries(result)) {
            var file = item.ImageName;
            var filetype = file.split(".").pop();
            console.log(file);
            var filelocation = path.join(__dirname + "/../src/uploads", file);
            var img = fs.readFileSync(filelocation);
            var base64img = new Buffer(img).toString("base64");
            item.ItemImage = "data:image/" + filetype + ";base64," + base64img;
          }
          // result[0].ItemId = ItemId;
          //   console.log(result);
          console.log("SIDDDDDDD: " + JSON.stringify(result));
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

app.post("/profile", function (req, res) {
  console.log("Inside profile POST");
  console.log("Profile Id: " + JSON.stringify(req.body.ProfileId));
  console.log("Request Body: " + JSON.stringify(req.body));

  connection.getConnection(function (err, conn) {
    if (err) {
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      console.log("Error in creating connection!");
      res.end("Error in creating connection!");
      console.log("Error");
    } else {
      var sql =
        "UPDATE login_credentials SET Email = '" +
        req.body.Email +
        "', Name = '" +
        req.body.Name +
        "', DOB = '" +
        req.body.DOB +
        "', About = '" +
        req.body.About +
        "', Country = '" +
        req.body.Country +
        "', City = '" +
        req.body.City +
        "', Address = '" +
        req.body.Address +
        "', Gender = '" +
        req.body.Gender +
        "', ProfileImage = '" +
        req.body.ProfileImage +
        "', Phonenumber = '" +
        req.body.Phonenumber +
        "' WHERE ProfileId = " +
        req.body.ProfileId +
        ";";

      conn.query(sql, function (err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("ERROR");
          console.log("Error: " + err);
        } else {
          res.writeHead(200, {
            "Content-type": "text/plain",
          });
          console.log(
            "Updated the details successfully for profile id: " +
              req.body.ProfileId
          );
        }
      });
    }
  });
});

app.post("/purchase", function (req, res) {
  console.log("Inside purchase POST");
  // console.log(
  //   "Request body: " +
  //     JSON.stringify("TEST: " + JSON.stringify(req.body[0].length))
  // );
  res.send("Success");
  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      var OrderId = uuidv4();
      var records = [];
      var datetime = new Date();
      // var ProfileId = 2;
      for (var i = 0; i < req.body[0].length; i++) {
        var image = req.body[0][i].ItemName + ".jpg";
        records.push([
          req.body[0][0].ProfileId,
          OrderId,
          req.body[0][i].ItemId,
          req.body[0][i].ItemName,
          image,
          req.body[0][i].ShopId,
          req.body[0][i].quantity,
          req.body[0][i].Price,
          datetime.toISOString().slice(0, 10),
        ]);
        console.log(records);
      }
      var sql =
        "INSERT INTO orderdetails (ProfileId, OrderId, ItemId, ItemName, ImageName, ShopName, Quantity, Price, PurchaseDate) VALUES ?";
      conn.query(sql, [records], function (err, result) {
        if (err) {
          // res.writeHead(400, {
          //   "Content-Type": "text/plain",
          // });
          // res.end("ERROR");
          console.log("Error: " + err);
        } else {
          // res.writeHead(200, {
          //   "Content-type": "text/plain",
          // });
          console.log("Added" + result.affectedRows + "row!");
        }
      });
    }
  });
});

app.post("/history", function (req, res) {
  console.log("Inside item  GET");
  const Id = parseInt(req.body.ProfileId);
  console.log("Request Body: " + Id);
  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      // res.writeHead(400, {
      //   "Content-type": "text/plain",
      // });
      res.end("Error in creating connection!");
    } else {
      //Login validation query
      var sql = "SELECT * from orderdetails WHERE ProfileId = " + Id + ";";
      conn.query(sql, function (err, result) {
        if (err) {
          // res.writeHead(400, {
          //   "Content-Type": "text/plain",
          // });
          res.end("ERROR");
          console.log("Error: " + err);
        } else {
          // res.writeHead(200, {
          //   "Content-type": "text/plain",
          // });
          for (const [key, item] of Object.entries(result)) {
            var file = item.ImageName;
            var filetype = file.split(".").pop();
            console.log(file);
            var filelocation = path.join(__dirname + "/../src/uploads", file);
            var img = fs.readFileSync(filelocation);
            var base64img = new Buffer(img).toString("base64");
            item.ItemImage = "data:image/" + filetype + ";base64," + base64img;
          }
          res.send(result);
        }
      });
    }
  });
});
