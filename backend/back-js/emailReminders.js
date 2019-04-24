const User = require('./user');
const Email = require('./email');
const fs = require('fs');

/**
 * Sends email remindes to all users who have project that are due today
 */
function sendProjectReminders() {
    User.find((err, users) => {
        if(err) {
            console.log(err);
            //error out if we fail to search users
            return;
        } else {
            var currentDate = new Date();
            //currentDate.setDate(currentDate.getDate() + 6);

            //go through each user and their projects and check if project due date matches todays date
            users.forEach(user => {
                var userProjects = [];

                user.projects.forEach(project => {
                    var dueDate = new Date(project.dueDate);
                    //currentDate.setDate(dueDate.getDate());
                    if( dueDate.getDate() == currentDate.getDate() &&
                        dueDate.getMonth() == currentDate.getMonth() &&
                        dueDate.getFullYear() == currentDate.getFullYear()) {
                            //keep track out which projects a user has due today
                            userProjects.push(project.title);
                        }
                });

                //if user has no projects, stop executing
                if(userProjects.length == 0) {
                    return;
                } 

                fs.readFile("credentials.json", function processClientSecrets(err, content) {
                    //if there an error loading credentials, stop process
                    if (err) {
                        console.log('Error loading client secret file: ' + err);
                        return;
                    }
                    // Authorize a client with the loaded credentials, then call the
                    // Gmail API.
                    //create email
                    var from = "smartcalteam@gmail.com";
                    var email = user.email;
                    var subject = "You have projects due today!";
                    var message = "Reminder: you have projects due today:\n";
                    userProjects.forEach(p => {
                        message += p + ", ";
                    });

                    //send email
                    message = message.substring(0, message.length-2);
                    Email.authorizeAPI(JSON.parse(content), Email.sendMessage, Email.createEmail(from, email, subject, message));
                });

            });
        }
    });
}

module.exports = sendProjectReminders;