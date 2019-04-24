const User = require('./user');

/**
 * Creates stores user create project
 * @param {*} data 
 * @param {*} res 
 */
function createProject(data, res) {
    var key = data.key;
    var project = data.newProject;

    //check for matching key
    User.findOneAndUpdate({"key": key}, {$push: {projects: project}}, function(err, u) {
        if(err) {
            //console.log(err);
            //error out if failed search
            return res.status(404).send(JSON.stringify({"status": 0}));
        } else {
            //console.log(u);
            u.save(err => {
                if(err) {
                    //console.log(err);
                    //error out if it fails to save user data
                    return res.status(404).send(JSON.stringify({"status": 0}));
                } else {
                    //return good response is project successfully added
                    return res.status(201).send(JSON.stringify({"status": 1}));
                }
            });
        }
    });
}

module.exports = createProject;