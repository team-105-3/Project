const User = require('./user');
const sha256 = require('sha-256-js');
const bcrypt = require('bcrypt');
const SALTROUNDS = 10;

/**
 * Resets users password
 * @param {*} data 
 * @param {*} res 
 */
function resetPassword(data, res) {
    var rKey = data.key;
    var newPassword = data.newPass;

    //query users for matching reset key
    User.findOne({"resetKey": rKey}, {"password": 1, "resetKey": 1}, function(err, user) {
        if(err || !user) {
            console.log("cant find user");
            return res.status(404).send(JSON.stringify({"status": 0}));
        } else {
            //update password to new password
            bcrypt.hash(newPassword, SALTROUNDS, function(err, hash) {
                if(err) {
                    console.log('Hashing error');
                    return res.status(404).send(JSON.stringify({"status": 0}));
                } else {
                    user.password = hash;
                    user.resetKey = sha256(user.key + newPassword); //update reset key
                    user.save(err => {
                        if(err) {
                            return res.status(404).send(JSON.stringify({"status": 0}));
                        } else {
                            return res.status(201).send(JSON.stringify({"status": 1}));
                        }
                    });
                }
            });
        }
    });
}

module.exports = resetPassword;