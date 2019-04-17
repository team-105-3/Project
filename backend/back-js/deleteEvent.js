const User = require('./user');

function deleteEvent(data, res) {
    var userKey = data.userKey;
    var eventKey = data.eventKey;
    //console.log(userKey, eventKey);
    User.findOne({key: userKey}, function(err, user) {
        if(err | !user) {
            return res.status(400).send(JSON.stringify({"status": 0}));
        } else {
            var events = user.events;
            var ind= -1;
            for(var i = 0; i < events.length; i++) {
                if(events[i].id == eventKey) {
                    ind = i;
                    break;
                }
            }

            if(ind == -1) {
                return res.status(400).send(JSON.stringify({"status": 0}));
            }
            events.splice(ind, 1);

            user.events = events;

            user.save(error => {
                if(error) {
                    return res.status(400).send(JSON.stringify({"status": 0}));
                }
                return res.status(201).send(JSON.stringify({"status": 1}));
            });
        }
    });
    
}

module.exports = deleteEvent;