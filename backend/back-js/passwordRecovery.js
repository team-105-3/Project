var Email = require('./email');
var User = require('./user');
var fs = require('fs');

/**
 * Sends a user an email with info on how to reset their password
 * @param {*} data 
 * @param {*} res 
 */
function sendPasswordRecovery(data, res) {
    var email = data.email;

    //query users for matching email
    User.findOne({"email": email}, {"resetKey": 1}, function(err, user) {
        if(err || !user) {
            console.log('No email found.');
            return res.status(404).send(JSON.stringify({"status": 0}));
        } else {
            //load our GMail API creedentials
            fs.readFile("credentials.json", function processClientSecrets(err, content) {
                if (err) {
                    console.log('Error loading client secret file: ' + err);
                    return res.status(404).send(JSON.stringify({"status": 0}));
                }
                // Authorize a client with the loaded credentials, then call the
                // Gmail API.
                //Create password recovery email for user
                var from = "smartcalteam@gmail.com";
                var subject = "SmartCal Password Recovery";
                var message = "Copy and paste this key to reset your password: " + user.resetKey;
                Email.authorizeAPI(JSON.parse(content), Email.sendMessage, Email.createEmail(from, email, subject, message));
                return res.status(201).send(JSON.stringify({"status": 1}));
            });
        }
    });
}

module.exports = sendPasswordRecovery;