const User = require('./user');

/**
 * Gets all of a users projects
 * @param {*} data 
 * @param {*} res 
 */
function getProjects(data, res) {
    var key = data.key;

    User.findOne({"key": key}, function(err, u) {
        if(err || !u) {
            return res.status(400).send(JSON.stringify({"status": 0}));
        } else {
            return res.status(201).send(JSON.stringify({"status": u.projects}));
        }
    });
    
}

module.exports = getProjects;