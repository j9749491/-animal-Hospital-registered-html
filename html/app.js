var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var routes = require('./routes/index');
var session = require('express-session');
var mysql = require('mysql');
//建立連線
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'html'
});

connection.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});





var app = express();

app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/css', express.static('css'));

app.use(function(req, res, next) {
    req.connection = connection;
    next();
});

app.use('/', routes);

app.get("/", function(request, response) {
  response.render("index");
});

app.use(function(request, response) {
  response.status(404).render("404");
});

http.createServer(app).listen(3000, function() {
  console.log("Cat app started on port 3000.");
});

