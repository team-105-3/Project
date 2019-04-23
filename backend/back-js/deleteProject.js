const User = require('./user');

function deleteProject(data, res) {
    var userKey = data.userKey;
    var projectKey = data.projectKey;
    //console.log(userKey, eventKey);
    User.findOne({key: userKey}, function(err, user) {
        if(err | !user) {
            return res.status(400).send(JSON.stringify({"status": 0}));
        } else {
            var projects = user.projects;
            var ind = -1;

            for(var i = 0; i < projects.length; i++) {
                if(projects[i].id == projectKey) {
                    ind = i;
                    break;
                }
            }

            if(ind == -1) {
                return res.status(400).send(JSON.stringify({"status": 0}));
            }

            projects.splice(ind, 1);
            user.projects = projects;

            user.save(error => {
                if(error) {
                    return res.status(400).send(JSON.stringify({"status": 0}));
                }
                return res.status(201).send(JSON.stringify({"status": 1}));
            });
        }
    });

}

module.exports = deleteProject;