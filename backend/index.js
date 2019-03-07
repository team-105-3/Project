var express = require('express');
const app = express();
const bodyParser = require('body-parser');

var register = require("./back-js/register");
var login = require("./back-js/login");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.post("/register", function(req, res) {
    if(register(req.body)) {
        var p = {"status": 1};
        res.status(201).send(JSON.stringify(p));
    } else {
        var p = {"status": 0};
        res.status(400).send(JSON.stringify(p));
    }
});

app.post("/login", function(req, res) {
    var out = login(req.body);
    if(out == "bad_login") {
        var p = {"status": "bad-login"};
        res.status(400).send(JSON.stringify(p));
    } else {
        var p = {"status": out};
        res.status(201).send(JSON.stringify(p));
    }
});

app.listen(8081, function() {
    console.log("Listening on port 8081");
});