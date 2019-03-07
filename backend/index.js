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

const register = require("./back-js/register");
const login = require("./back-js/login");
const User = require("./back-js/user");

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
    let user = User();

    const {f_name, l_name, email, password} = req.body;

    User.findOne({"email": email}, {_id: 1}, function(err, uid)  {
        if (err || uid) {
            console.log(`User ${uid} already exists`);
            return res.status(404).send(JSON.stringify({"status": 0}));
        } else {
            bcrypt.hash(password, SALTROUNDS, function(err, hash) {
                if (err) return json({success: false, error: err});

                if (!f_name || !l_name || !email || !password) {
                    console.log("fields invalid");
                    return res.status(404).send(JSON.stringify({"status": 0}));
                }
                user.f_name = f_name;
                user.l_name = l_name;
                user.email = email;
                user.password = hash;
                user.save(err => {
                    if (err) {
                        console.log("error in writing to db");
                        return res.status(404).send(JSON.stringify({"status": 0}));
                    }
                    return res.status(201).send(JSON.stringify({"status": 1}));
                });
            });
        }
    });
});

router.post("/login", function(req, res) {
    const {email, password} = req.body;
    console.log(req.body);

    User.findOne({"email": email}, {"password": 1}, function (err, hash) {
        if (err) {
            console.log(`password for account tied to ${email} not found`);
            return res.status(400).send(JSON.stringify({"status": 0}));
        } else {
            if (hash == null) {
                return res.status(401).send(JSON.stringify({"status": "bad-login"}));
            }
            bcrypt.compare(password, hash.password, function(err, same) {
                if (err) {
                    console.log(`error in comparing password hashes: ${err}`);
                    return res.status(400).send(JSON.stringify({"status": 0}));
                }
                if (same == true) {
                    return res.status(201).send(JSON.stringify({"status": 1}));
                }
                console.log(`password invalid`);
                return res.status(401).send(JSON.stringify({"status": "bad-login"}));
            });
        }
    });
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