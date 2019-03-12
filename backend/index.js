//3rd party libraries
var express = require('express');
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const logger = require("morgan");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const SALTROUNDS = 10;
var cors = require('cors');
cors({credentials: true, origin: true});


//our libraries
const register = require("./back-js/register");
const login = require("./back-js/login");
const User = require("./back-js/user");
const createEvent = require('./back-js/createEvent');
const getEvents = require('./back-js/getEvents');
const createProject = require('./back-js/createProject');
const getProjects = require('./back-js/getProjects');


const dbRoute = "mongodb://127.0.0.1:27017/test";

mongoose.connect(
    dbRoute,
    {useNewUrlParser: true}
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to db"));
db.on("error", console.error.bind(console, "db connection error"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(logger("dev"));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

router.get("/getUsers", function (req, res) {
    User.find((err, data) => {
        if (err) return res.status(404).send(JSON.stringify({"status": 1}));
        return res.json({success: true, data: data});
    });
});

router.post("/register", function(req, res) {
    register(req.body, res);
});

router.post("/login", function(req, res) {
    login(req.body, res);
});

router.post("/createEvent", function(req, res) {
    createEvent(req.body, res);
});

router.post("/createProject", function(req, res) {
    createProject(req.body, res);
});

router.post("/getEvents", function(req, res) {
    getEvents(req.body, res);
});

router.post("/getProjects", function(req, res) {
    getProjects(req.body, res);
});

router.post('/deleteAllUsers', function (req, res) {
    const { key } = req.body;
    if (key == process.env.DEL_USERS) {
        User.deleteMany({}, function (err) {
            if (err) return res.status(400).send(JSON.stringify({"status": 0}));
            else return res.status(200).send(JSON.stringify({"status": 1}));
        });
    } else {
        return res.status(401).send(JSON.stringify({"status": 0}));
    }
});

app.use(cors());
app.use("/", router);
app.listen(8081, function() {
    console.log("Listening on port 8081");
});