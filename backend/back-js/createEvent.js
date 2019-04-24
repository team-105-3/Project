const User = require('./user');

/**
 * Stores an event object created by user.
 * @param {*} data 
 * @param {*} res 
 */
function createEvent(data, res) {
    var key = data.key;
    var event = data.newEvent;

    //get user with matching key
    User.findOneAndUpdate({"key": key}, {$push: {events: event}}, function(err, u) {
        if(err) {
            //console.log(err);
            //if error in db search, return bad status
            return res.status(404).send(JSON.stringify({"status": 0}));
        } else {
            //console.log(u);
            u.save(err => {
                if(err) {
                    //console.log(err);
                    //if error saving in db, return bad status
                    return res.status(404).send(JSON.stringify({"status": 0}));
                } else {
                    //return good status if event successfully added
                    return res.status(201).send(JSON.stringify({"status": 1}));
                }
            });
        }
    });
}

module.exports = createEvent;