const User = require('./user');

function createEvent(data, res) {
    var key = data.key;
    var event = data.newEvent;

    User.findOneAndUpdate({"key": key}, {$push: {events: event}}, function(err, u) {
        if(err) {
            //console.log(err);
            return res.status(404).send(JSON.stringify({"status": 0}));
        } else {
            //console.log(u);
            u.save(err => {
                if(err) {
                    //console.log(err);
                    return res.status(404).send(JSON.stringify({"status": 0}));
                } else {
                    return res.status(201).send(JSON.stringify({"status": 1}));
                }
            });
        }
    });
}

module.exports = createEvent;