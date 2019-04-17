const User = require('./user');

function deleteEvent(data, res) {
    var userKey = data.userKey;
    var eventKey = data.eventKey;
    //console.log(userKey, eventKey);
    User.findOne({key: userKey}, function(err, user) {
        if(err | !user) {
            return res.status(400).send(JSON.stringify({"status": 1}));
        } else {
            var events = user.events;
            //for
        }
    });
    
}

module.exports = deleteEvent;