/**
 * User class to contain all projects and events
 */
function User() {
    this.events = [];
    this.projects = [];
}

/**
 * Pushes a new event into the user class object
 */
User.prototype.addEvent = function(event) {
    this.events.push(event);
}

User.prototype.isEventOnDay = function(date, event) {
    var s_parts = event.startDate.split('/');
    var eventStartDate = new Date(s_parts[2], s_parts[0]-1, s_parts[1]);

    var e_parts = event.endDate.split('/');
    var eventEndDate = new Date(e_parts[2], e_parts[0] - 1, e_parts[1]);

    

}

/**
 * Pushes a new project into the user class object
 */
User.prototype.addProject = function(project) {
    this.projects.push(project);
}

/**
 * Requests all of a users events from the server and loads them into the user class object
 */
function getAllEvents() {
    let loadEventsRequest = new XMLHttpRequest();
    let url = connectUrl + "/getEvents/";
    loadEventsRequest.open('POST', url);
    loadEventsRequest.setRequestHeader("Content-type", "application/json");
    loadEventsRequest.responseType = "json";
    loadEventsRequest.onload = function() {
        //$('#loading').modal('hide');
        var status = loadEventsRequest.response.status;
        if(status == 0) {
            console.log("System is broken. Invalid key. Try refreshing...");
        } else {
            status.forEach(element => {
                let event = new Event(  element.title, element.startTime, 
                                        element.endTime, element.recurring, 
                                        element.startDate, element.endDate, 
                                        element.description);
                
                user.addEvent(event);
            });
        }
    }
    loadEventsRequest.send(JSON.stringify({"key": new URL(window.location.href).searchParams.get('key')}));
    //$('#loading').modal('show');
}

/**
 * Requests all of a users projects from the server and loads them into the user class object
 */
function getAllProjects() {
    let projRequest = new XMLHttpRequest();
    let url = connectUrl + "/getProjects/";
    projRequest.open('POST', url);
    projRequest.setRequestHeader("Content-type", "application/json");
    projRequest.responseType = "json";
    projRequest.onload = function() {
        //$('#loading').modal('hide');
        var status = projRequest.response.status;
        if(status == 0) {
            console.log("System is broken. Invalid key. Try refreshing...");
        } else {
            status.forEach(element => {
                let project = new Project(  element.title, element.startTime, 
                                            element.endTime, element.date, 
                                            element.description);
                
                user.addProject(project);
            });
        }
    }
    projRequest.send(JSON.stringify({"key": new URL(window.location.href).searchParams.get('key')}));
    //$('#loading').modal('show');
}