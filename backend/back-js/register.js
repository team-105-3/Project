const User = require("./user");
const bcrypt = require('bcrypt');
const sha256 = require('sha-256-js');
const SALTROUNDS = 10;

/**
 * Checks if user is registered in database and adds them if they aren't
 * @param {Registration data as JSON} data 
 * @param {Request response} res 
 */
function register(data, res) {
    let user = User();

    //user info
    var firstName = data.f_name;
    var lastName = data.l_name;
    var email = data.email;
    var password = data.password;

    //user key for calendar requests
    var key = sha256(firstName + password + lastName + email);
    var resetKey = sha256(key+password);

    //console.log(firstName, lastName, email, password, key, resetKey);

    //finds users in database by email
    //if they don't exist, add them if they have good credentials
    //if they do exists don't add them, return bad status
    User.findOne({"email": email}, {id: 1}, function(err, uid) {
        var code = 0;
        var status = 0;
        if(err || uid) {
            console.log(`User ${uid} already exists`);
            code = 400;
            status = 0;
            return res.status(code).send(JSON.stringify({"status": status}));
        } else {
            bcrypt.hash(password, SALTROUNDS, function(err, hash) {
                if (err) return json({success: false, error: err});

                if (!firstName || !lastName || !email || !password) {
                    console.log("fields invalid");
                    code = 400;
                    status = 0;
                    return res.status(code).send(JSON.stringify({"status": status}));
                }
                user.f_name = firstName;
                user.l_name = lastName;
                user.email = email;
                user.password = hash;
                user.key = key;
                user.resetKey = resetKey;
                user.save(err => {
                    if (err) {
                        console.log("error in writing to db");
                        code = 404;
                        status = 0;
                        return res.status(code).send(JSON.stringify({"status": status}));
                    }
                    code = 201;
                    status = 1;
                    return res.status(code).send(JSON.stringify({"status": status}));
                });
            });
        }
    });
}

module.exports = register;