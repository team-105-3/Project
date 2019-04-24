const User = require("./user");
const bcrypt = require('bcrypt');

/**
 * Logs user into system
 * returns bad login, or users calendar key as request response
 * @param {Login data} data 
 * @param {Request response} res 
 */
function login(data, res) {
    var email = data.email;

    User.findOne({"email": email}, {"password": 1, "key": 1}, function (err, uInfo) {
        if (err) {
            //if bad password for email, error out
            console.log(`password for account tied to ${email} not found`);
            return res.status(400).send(JSON.stringify({"status": "bad-login"}));
        } else {
            if (uInfo == null) {
                //if unable to fine user, error out
                return res.status(401).send(JSON.stringify({"status": "bad-login"}));
            }
            //console.log(uInfo, data.password);
            //compare encrpyted passwords
            bcrypt.compare(data.password, uInfo.password, function(err, same) {
                if (err) {
                    //if hashing fails, error out
                    console.log(`error in comparing password hashes: ${err}`);
                    return res.status(400).send(JSON.stringify({"status": "bad-login"}));
                }
                if (same == true) {
                    //if same password, user has logged in succesfully
                    return res.status(201).send(JSON.stringify({"status": uInfo.key}));
                }
                console.log(`password invalid`);
                //if non-matching passwords, error out.
                return res.status(401).send(JSON.stringify({"status": "bad-login"}));
            });
        }
    });
}

module.exports = login;