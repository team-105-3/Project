//3rd party libraries
var express = require('express');
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const logger = require("morgan");
const bodyParser = require('body-parser');
var cors = require('cors');
cors({credentials: true, origin: true});
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const cron = require('node-cron');

//our libraries
const register = require("./back-js/register");
const login = require("./back-js/login");
const User = require("./back-js/user");
const createEvent = require('./back-js/createEvent');
const getEvents = require('./back-js/getEvents');
const createProject = require('./back-js/createProject');
const getProjects = require('./back-js/getProjects');
const sendPasswordRecovery = require('./back-js/passwordRecovery');
const resetPassword = require('./back-js/resetPassword');
const sendProjectReminders = require('./back-js/emailReminders')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly ' + 'https://www.googleapis.com/auth/gmail.send'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), listLabels);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}
  
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
        });
    });
}
  
/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.labels.list({
        userId: 'me',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const labels = res.data.labels;
        if (labels.length) {
            console.log('Labels:');
            labels.forEach((label) => {
                console.log(`- ${label.name}`);
            });
        } else {
            console.log('No labels found.');
        }
    });
}

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

router.post("/recoverPassword", function(req, res) {
    sendPasswordRecovery(req.body, res);
});

router.post("/resetPassword", function(req, res) {
    resetPassword(req.body, res);
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

cron.schedule("0 7 * * *", function() {
    console.log('Sent email reminders for today');
    sendProjectReminders();
});

app.use(cors());
app.use("/", router);
app.listen(8081, function() {
    console.log("Listening on port 8081");
});