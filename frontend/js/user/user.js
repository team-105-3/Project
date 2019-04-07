/**
 * User class to contain all projects and events
 */
function User() {
    this.events = [];
    this.projects = [];
    this.currentEvents = [];
    this.currentUserDate = new Date();
}

/**
 * Pushes a new event into the user class object
 */
User.prototype.addEvent = function(event) {
    this.events.push(event);
    this.update();
}

/**
 * Checks if an event recurs / lands on given day
 */
User.prototype.isEventOnDay = function(date, event) {
    var s_parts = event.startDate.split('/');
    var currentDate = new Date(parseInt(s_parts[2]), parseInt(s_parts[0]-1), parseInt(s_parts[1]));

    if(!event.recurring) {
        return datesEqual(currentDate, date);
    }

    var e_parts = event.endDate.split('/');
    var eventEndDate = new Date(parseInt(e_parts[2]), parseInt(e_parts[0] - 1), parseInt(e_parts[1]));

    var multiplier = event.recurrency;

    while(eventEndDate > currentDate && date > currentDate) {
        if(datesEqual(currentDate, date)) {
            return true;
        } else {
            if(event.timeframe == 1) {
                currentDate.setDate(currentDate.getDate() + 1 * multiplier);
            } else if (event.timeframe == 2) {
                currentDate.setDate(currentDate.getDate() + 14 * multiplier);
            } else if (event.timeframe == 3) {
                currentDate.setMonth(currentDate.getMonth() + 1 * multiplier);
            } else if (event.timeframe == 4) {
                currentDate.setFullYear(currentDate.getFullYear() + 1 * multiplier);
            }
        }
    }

    return false;
}

/**
 * Returns all of a users events on a given day
 */
User.prototype.getAllEventsOnDay = function(date) {
    var dailyEvents = [];

    this.events.forEach(event => {
        if(this.isEventOnDay(date, event)) {
            dailyEvents.push(event);
        }
    });

    return dailyEvents;
}

/**
 * Returns all of a users events for a given week based on given day
 */
User.prototype.getEventsForWeek = function(date) {
    var dateCopy = new Date(date);
    var firstDay = new Date(dateCopy.setDate(dateCopy.getDate() - dateCopy.getDay()));

    var currentDate = new Date(firstDay);

    var weeklyEvents = [];

    for(var i = 0; i < 7; i++) {
        var dailyEvents = [];
        currentDate.setDate(currentDate.getDate() + Math.min(i, 1));
        dailyEvents = this.getAllEventsOnDay(currentDate);
        weeklyEvents.push(dailyEvents);
    }

    return weeklyEvents;
}

/**
 * Update a users weekly events based on given date
 */
User.prototype.update = function() {
    this.currentEvents = this.getEventsForWeek(this.currentUserDate);
    //console.log(this.currentEvents);
}

/**
 * Determines if two dates are equal in value (same day, month, year)
 * @param {*} date1 
 * @param {*} date2 
 */
function datesEqual(date1, date2) {
    return date1.getDate() == date2.getDate() 
        && date1.getMonth() == date2.getMonth()
        && date1.getFullYear() == date2.getFullYear();
}

/**
 * Pushes a new project into the user class object
 */
User.prototype.addProject = function(project) {
    this.projects.push(project);
}

User.prototype.decDate = function() {
    this.currentUserDate.setDate(this.currentUserDate.getDate() - 7);
}

User.prototype.incDate = function() {
    this.currentUserDate.setDate(this.currentUserDate.getDate() + 7);
}
/**
 * Requests all of a users events from the server and loads them into the user class object
 */
function getAllEvents(callback) {
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
                                        element.description, element.recurrency, 
                                        element.timeframe);
                
                user.addEvent(event);
            });
        }
        callback();
    }
    loadEventsRequest.send(JSON.stringify({"key": new URL(window.location.href).searchParams.get('key')}));
    //$('#loading').modal('show');
}

/**
 * Requests all of a users projects from the server and loads them into the user class object
 */
function getAllProjects(callback) {
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
                let project = new Project(  element.title, element.startDate, 
                                            element.dueDate, element.expectedTimeHours,
                                            element.expectedTimeMinutes, element.description);
                
                user.addProject(project);
            });
        }
        callback();
    }
    projRequest.send(JSON.stringify({"key": new URL(window.location.href).searchParams.get('key')}));
    //$('#loading').modal('show');
}