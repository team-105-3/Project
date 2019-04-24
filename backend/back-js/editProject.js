const User = require('./user');

/**
 *
 * @param {*} data
 * @param {*} res
 */
function editProject(data, res) {
    var userKey = data.userKey;
    var projectKey = data.projectKey;

    User.findOne({key: userKey}, function (err, user) {
        if(err | !user) {
            return res.status(400).send(JSON.stringify({"status": 0}));
        } else {
            var projects = user.projects;
            var ind= -1;

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
            projects.push(data.newProj);
            user.projects = projects;
            console.log(user.projects);

            user.save(error => {
                if(error) {
                    return res.status(400).send(JSON.stringify({"status": 0}));
                }
                return res.status(201).send(JSON.stringify({"status": 1}));
            });
        }
    });
}

module.exports = editProject;