$.fn.modal.Constructor.prototype.enforceFocus = function () {};

//////////////////////////////////
/// PROJECT AND EVENT CREATION ///
//////////////////////////////////


/**
 * Creates an event and sends it to the server.
 */
function createCalendarEvent(callback) {
    var title = document.getElementById('e_title').value;
    var startTime = document.getElementById('est').value;
    var endTime = document.getElementById('eet').value;
    var recurring = document.getElementById('recurring').checked;
    var startDate = document.getElementById('esd').value;
    var endDate = document.getElementById('ed').value;
    var desc = document.getElementById('e_desc').value;

    var rec = document.getElementById('rec').value;
    var timeframe = document.getElementById('timeframe').value;

    console.log(rec, timeframe);

    var fail = false;
    if(emptyString(title) || emptyString(startTime) || emptyString(endTime) || emptyString(startDate)) {
        fail = true;
    }

    if(recurring && (emptyString(endDate) || rec == "Choose..." || timeframe == "Choose...")) {
        fail = true;
    }

    var startTime2Min = standard2Military(startTime);
    var tst = startTime2Min[0] * 60 + startTime2Min[1];
    var endTime2Min = standard2Military(endTime);
    var est = endTime2Min[0] * 60 + endTime2Min[1];

    if(est < tst) {
        fail = true;
    }

    $('#createEventModal').modal('toggle');
    clearAllEntries();

    if(fail) {
        $('#eventCreationFail').modal('toggle');
        return;
    }

    var event = new Event(title, startTime, endTime, recurring, startDate, endDate, desc, rec, timeframe);

    var idKey = new URL(window.location.href).searchParams.get('key');

    var sendObj = {key: idKey, newEvent: event};


    //create ajax request
    var request = new XMLHttpRequest();

    var url = connectUrl + "/createEvent/";

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        //$('#loading').modal('hide');
        var status = request.response.status;
        if(status == 1) {
            console.log("successfully created event");
            user.addEvent(event);
        } else {
            console.log('failed to create event');
        }
        callback();
    }

    request.send(JSON.stringify(sendObj));
    //$('#loading').modal('show');

}

function saveEventChanges(callback) {
    var eventKey = document.getElementById('id-holder').innerHTML;
    var title = document.getElementById('e_title_edit').value;
    var startTime = document.getElementById('est_edit').value;
    var endTime = document.getElementById('eet_edit').value;
    var recurring = document.getElementById('recurring_edit').checked;
    var startDate = document.getElementById('esd_edit').value;
    var endDate = document.getElementById('ed_edit').value;
    var desc = document.getElementById('e_desc_edit').value;
    var rec = document.getElementById('rec_edit').value;
    var timeframe = document.getElementById('timeframe_edit').value;

    console.log(rec, timeframe);

    var fail = false;
    if(emptyString(title) || emptyString(startTime) || emptyString(endTime) || emptyString(startDate)) {
        fail = true;
    }

    if(recurring && (emptyString(endDate) || rec == "Choose..." || timeframe == "Choose...")) {
        fail = true;
    }

    $('#editEventModal').modal('toggle');
    clearAllEntries();

    if(fail) {
        $('#eventCreationFail').modal('toggle');
        return;
    }

    var event = new Event(title, startTime, endTime, recurring, startDate, endDate, desc, rec, timeframe);

    var idKey = new URL(window.location.href).searchParams.get('key');

    var sendObj = {userKey: idKey, eventKey: eventKey, newEvent: event};


    //create ajax request
    var request = new XMLHttpRequest();

    var url = connectUrl + "/editEvent/";

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        //$('#loading').modal('hide');
        var status = request.response.status;
        if(status == 1) {
            console.log("successfully edited event");
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

            events[ind] = event;

            user.events = events;
        } else {
            console.log('failed to edit event');
        }
        callback();
    }

    request.send(JSON.stringify(sendObj));
    //$('#loading').modal('show');
}

function deleteEvent(callback) {
    //get users key
    var userKey = new URL(window.location.href).searchParams.get('key');
    var eventKey = document.getElementById('id-holder').innerHTML;

    var data = {
        userKey: userKey,
        eventKey: eventKey
    }

    //create ajax request
    var request = new XMLHttpRequest();

    var url = connectUrl + "/deleteEvent/";

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        //$('#loading').modal('hide');
        var status = request.response.status;
        if(status == 1) {
            console.log("successfully deleted event");
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
        } else {
            console.log('failed to delete event');
        }
        callback();
    }

    request.send(JSON.stringify(data));


    //console.log(userKey, eventKey);
}

/**
 * Creates a project and sends it to the server
 */
function createCalendarProject(callback) {
    var title = document.getElementById('p_title').value;
    var startDate = document.getElementById('pst').value;
    var dueDate = document.getElementById('pet').value;
    var expTimeHours = document.getElementById('p_hours').value;
    var expTimeMin = document.getElementById('p_min').value;
    var desc = document.getElementById('p_desc').value;

    var fail = false;
    if(emptyString(title) || emptyString(startDate) || emptyString(dueDate) || emptyString(expTimeHours) || emptyString(expTimeMin)) {
        fail = true;
    }

    $('#createProjectModal').modal('toggle');
    clearAllEntries();

    if(fail) {
        $('#projectCreationFail').modal('toggle');
        return;
    }

    var timeRemaining = parseInt(expTimeHours * 60) + parseInt(expTimeMin);
    var project = new Project(title, startDate, dueDate, expTimeHours, expTimeMin, desc, timeRemaining);

    var idKey = new URL(window.location.href).searchParams.get('key');

    var sendObj = {key: idKey, newProject: project};


    //create ajax request
    var request = new XMLHttpRequest();

    var url = connectUrl + "/createProject/";

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        //$('#loading').modal('hide');
        var status = request.response.status;
        if(status == 1) {
            console.log("Successfully created project");
            user.addProject(project);
        } else {
            console.log("Failed to create project");
        }

        callback();
    }

    request.send(JSON.stringify(sendObj));
    //$('#loading').modal('show');
}

function saveProjectChanges(callback) {
    var projectKey = document.getElementById('id-holder').innerHTML;
    var title = document.getElementById('p_title_edit').value;
    var startDate = document.getElementById('pst_edit').value;
    var dueDate = document.getElementById('pet_edit').value;
    var expTimeHours = document.getElementById('p_hours_edit').value;
    var expTimeMin = document.getElementById('p_min_edit').value;
    var desc = document.getElementById('p_desc_edit').value;

    var fail = false;
    if(emptyString(title) || emptyString(startDate) || emptyString(dueDate) || emptyString(expTimeHours)) {
        fail = true;
    }

    $('#editProjectModal').modal('toggle');
    clearAllEntries();

    if(fail) {
        $('#projectCreationFail').modal('toggle');
        return;
    }

    console.log(projectKey);
    var project = new Project(title, startDate, dueDate, expTimeHours, expTimeMin, desc, parseInt(expTimeHours * 60) + parseInt(expTimeMin));

    var idKey = new URL(window.location.href).searchParams.get('key');

    var sendObj = {userKey: idKey, projectKey: projectKey, newProj: project};


    //create ajax request
    var request = new XMLHttpRequest();

    var url = connectUrl + "/editProject/";

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        //$('#loading').modal('hide');
        var status = request.response.status;
        if(status == 1) {
            console.log("successfully edited project");
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

            projects[ind] = project;

            user.projects = projects;
        } else {
            console.log('failed to edit project');
        }
        callback();
    };

    request.send(JSON.stringify(sendObj));
    //$('#loading').modal('show');
}

function deleteProject(callback) {
    //get users key
    var userKey = new URL(window.location.href).searchParams.get('key');
    var projectKey = document.getElementById('id-holder').innerHTML;

    var data = {
        userKey: userKey,
        projectKey: projectKey
    }

    //create ajax request
    var request = new XMLHttpRequest();

    var url = connectUrl + "/deleteProject/";

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        //$('#loading').modal('hide');
        var status = request.response.status;
        if(status == 1) {
            console.log("successfully deleted project");
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

            user.projects = projects;
        } else {
            console.log('failed to delete project');
        }
        callback();
    };

    request.send(JSON.stringify(data));
}

/**
 * Clears all entries in every form for event and project creation
 */
function clearAllEntries() {
    var entries = document.querySelectorAll('.entry');
    entries.forEach(element => {
        element.value = '';
    });
    var background = document.body.style.backgroundColor;
}

///////////////////////////////////////////
/// UI AND EVENT / PROJECT CALCULATIONS ///
///////////////////////////////////////////

const weekarr = ["Sun&nbsp;", "Mon&nbsp;", "Tues", "Wed&nbsp;", "Thurs", "Fri&nbsp;", "Sat&nbsp;"];
const montharr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Displays todays date in upper left corner
 * @param {*} user 
 */
function displayDate(user) {
    var currentDate = user.currentUserDate;
    var month = currentDate.getMonth();
    var dayOfWeek = currentDate.getDay();
    document.getElementById('todays-date').innerHTML = weekarr[dayOfWeek] + ", " + montharr[month] + " " + currentDate.getDate() + ", " + currentDate.getFullYear(); 
}

/**
 * Generates the calendar table, much easier to modify all rows/columns/cells than having a huge table in html file
 */
function createCalendarTable() {
    $('#days-of-week').append('<th scope="row">Schedule</th>');
    for(var i = 0; i < 7; i++) {
        $('#days-of-week').append('<th style="text-align:center;" scope="col" id="' + weekarr[i].split('&')[0] + '">' + weekarr[i] + '</th>');
    } 
    for(var i = 0; i < 24; i++) {
        var k = ((i==12||i==0)?12:(i%12));
        var content = '<tr>';
        content += '<td scope="row">' + ((k<10)?'0':'') + k + ':00' + ((i<12)?'AM':'PM') + '</td>';
        for(var l = 0; l < 7; l++) {
            content += '<td class="cal-cell"><div class="cell-wrapper"></div></td>';
        }
        content += '</tr>';
        $('#weekly-calendar').append(content);
    }
}

/**
 * Displays the events for this week in the calendar
 *  
 * @param {user class containing events to display} user 
 */
function displayUsersEvents(user) {
    //get all of a users events for the current week
    var events = user.currentEvents;

    for(var i = 0; i < 7; i++) {
        var daysEvents = events[i];
        daysEvents.forEach(event => {
            var startTime = standard2Military(event.startTime);
            var startHour = startTime[0];
            var startMin = startTime[1];

            var endTime = standard2Military(event.endTime);
            var endHour = endTime[0];
            var endMin = endTime[1];

            var totalHours = endHour - startHour;

            var totalSlots = totalHours + ((endMin > 0)?1:0);

            for(j = 0; j < totalSlots; j++) {
                var cell = document.getElementById("weekly-calendar").rows[startHour + j].cells[i+1];
                cell.style.padding = "0px"; 
                cell.style.margin = "0px";
                var eventDivContainer = document.createElement('div');
                eventDivContainer.className = 'event-container';
            
                var eventDiv = document.createElement('div');
                //eventDiv.style.height = "50%";
                eventDiv.id = event.title + "-" + i;
                eventDiv.className = 'event ' + eventDiv.id;

                eventDiv.title = event.title + " from " + event.startTime + " to " + event.endTime + ".";
                eventDiv.setAttribute('data-toggle', 'tooltip');
                eventDiv.setAttribute('data-placement', 'top');

                //rules of the road
                if(j == 0) {
                    eventDivContainer.style.paddingTop = startMin / 3 + "%";
                    if(startMin == 0) {
                        eventDivContainer.style.paddingTop = '1px';
                    }
                }

                if(j == totalSlots - 1) {
                    if(endMin == 0) {
                        eventDivContainer.style.paddingBottom = "1px";
                    } else {
                        eventDivContainer.style.paddingBottom = totalHours * 10 + ((60 - endMin) / 3) + "%";
                    }
                }

                if(j > 0) {
                    eventDiv.style.borderTopLeftRadius = '0px';
                    eventDiv.style.borderTopRightRadius = '0px';
                    cell.style.borderTopWidth = '0px';
                }
                
                if(totalSlots > 1 && j < totalSlots - 1) {
                    eventDiv.style.borderBottomLeftRadius = '0px';
                    eventDiv.style.borderBottomRightRadius = '0px';
                    cell.style.borderBottomWidth = '0px';
                }

                eventDiv.onclick = function() { 
                    //fill in edit modal with info
                    $('#editEventModal').modal('toggle');
                    $('#e_title_edit').val(event.title);
                    $('#est_edit').val(event.startTime);
                    $('#eet_edit').val(event.endTime);
                    $('#recurring_edit').prop('checked', event.recurring);
                    $('#esd_edit').val(event.startDate);
                    if(event.recurring) {
                        $('#ed_edit').prop('disabled', false);
                        $('#ed_edit').val(event.endDate);
                        $('#rec_edit').prop('disabled', false);
                        $('#rec_edit').val(event.recurrency);
                        $('#timeframe_edit').prop('disabled', false);
                        $('#timeframe_edit').val(event.timeframe);
                    }
                    $('#e_desc_edit').val(event.description);
                    //store events id for backend usage
                    $('#id-holder').text(event.id);
                }

                //in order to play the game, ya gotta know the rules
                eventDiv.onmouseover = function() {
                    var e = document.getElementsByClassName(this.id);
                    Array.prototype.forEach.call(e, function(el) {
                        el.style.webkitFilter = "brightness(80%)";    
                    });
                }

                eventDiv.onmouseleave = function() {
                    var e = document.getElementsByClassName(this.id);
                    Array.prototype.forEach.call(e, function(el) {
                        el.style.webkitFilter = "brightness(100%)";    
                    });
                }

                //break it down, then build it back up
                var title = document.createTextNode(event.title);
                eventDiv.appendChild(title);
                eventDivContainer.appendChild(eventDiv);
                cell.childNodes[0].appendChild(eventDivContainer);
            }
        });
    }
}

/**
 * Calculates where to allocate projects for a certain day
 * 
 * @param {*} user 
 * @param {*} date 
 */
function calcProjectTimeSlotsForDay(user, date) {
    var dayEvents = user.getAllEventsOnDay(date);
    var dayProjects = user.getAllProjectsOnDay(date);
    var allotTimes = [];

    //calculate number of minutes to work on each project on day : FLOOR( remainting minutes / num days till due )
    dayProjects.forEach(proj => {
        var time_r = Math.floor(proj.timeRemaining);
        var days_r = Math.round((new Date(proj.dueDate) - date) / (1000*60*60*24));
        allotTimes.push((time_r / days_r));
    });

    //sort dayEvents so lower start times are first in array
    dayEvents.sort(function(a, b) {
        var sA = standard2Military(a.startTime);
        var sB = standard2Military(b.startTime);

        return (sA[0] * 60 + sA[1]) - (sB[0] * 60 + sB[1]);
    });

    var timeSlots = [];
    //if no events on day then count whole day (8 am -> 11 pm) as a time slot
    if(dayEvents.length == 0) {
        timeSlots.push((standard2Military('11:00 PM')[0] * 60) - (standard2Military('8:00 AM')[0] * 60));
    }

    //calculate amount of time between each event
    //if first event of day, calculate time between 8:00 AM and start time of first event
    //for every other event, calculate time between last events end time, and next events start time
    //for last event, calculate time between 11:00 PM and end time of last event
    //all of the time slots are in the order they appear in the calendar
    for(var i = 0; i < dayEvents.length; i++) {
        if(i == 0) { //first event and 8:00 AM
            var end = standard2Military(dayEvents[i].startTime);
            var start = standard2Military("8:00 AM");

            var diff = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);
            timeSlots.push(diff);
        } else { //comparing events
            var end = standard2Military(dayEvents[i].startTime);
            var start = standard2Military(dayEvents[i-1].endTime);

            var diff = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);
            timeSlots.push(diff);
        }
    }

    //final edge case (last event end time to 11:00 PM)
    if(dayEvents.length != 0) {
        var lastEventEnd = standard2Military(dayEvents[dayEvents.length - 1].endTime);
        var elevenPM = standard2Military("11:00 PM");

        var lastDiff = (elevenPM[0] * 60 + elevenPM[1]) - (lastEventEnd[0] * 60 + lastEventEnd[1]);
        timeSlots.push(lastDiff);
    }

    //combine projects with alloted times
    var projectWithAllotedTimes = [];
    for(var i = 0; i < allotTimes.length; i++) {
        projectWithAllotedTimes.push({project: dayProjects[i], allotTime: allotTimes[i]});
    }

    //sort by alloted times (descending order so bigger projects come first)
    projectWithAllotedTimes.sort(function(a, b) {
        return b.allotTime - a.allotTime;
    });

    //place sorted values back into original arrays
    for(var i = 0; i < projectWithAllotedTimes.length; i++) {
        dayProjects[i] = projectWithAllotedTimes[i].project;
        allotTimes[i] = projectWithAllotedTimes[i].allotTime;
    }

    //place projects into time slots
    var projectsWithTimeSlotsAndTotalTime = []; //eww
    //array for offsets to prevent projects overlapping
    var offsets = new Array(timeSlots.length).fill(0);
    for(var i = 0; i < dayProjects.length; i++) {
        for(var j = 0; j < timeSlots.length; j++) {
            //check if alloted time is greater than 30 min
            //check if alloted time will fit into time slot (automatically handles negative timeslots)
            if(allotTimes[i] >= 30 && allotTimes[i] <= timeSlots[j]) {
                var et;
                if(j == 0) {
                    et = "8:00 AM";
                } else {
                    et = dayEvents[j - 1].endTime;
                }

                projectsWithTimeSlotsAndTotalTime.push({project: dayProjects[i], 
                                                        allotTime: allotTimes[i],
                                                        startTime: et,
                                                        offset: offsets[j]
                                                    });
                timeSlots[j] -= allotTimes[i];
                offsets[j] += allotTimes[i];
                for(var k = 0; k < user.projects.length; k++) {
                    if(user.projects[k].id == dayProjects[i].id) {
                        user.projects[k].timeRemaining -= allotTimes[i];
                    }
                }
                break;
            }
        }
    }
    return projectsWithTimeSlotsAndTotalTime;   
}

function displayUserProjects(user) {
    var startDate = getBeginningOfWeek(user.currentUserDate);
    for(var i = 0; i < 7; i++) {
        var ddd = new Date(startDate);
        ddd.setDate(ddd.getDate() + i);
        var dailyProjects = calcProjectTimeSlotsForDay(user, ddd);
        dailyProjects.forEach(projectObj => {
            var startTime = standard2Military(projectObj.startTime);
            var startHour = startTime[0] + Math.floor(projectObj.offset / 60);
            var startMin = startTime[1] + (projectObj.offset % 60);

            var startTimeMin = startHour * 60 + startMin;

            var endHour = Math.floor((startTimeMin + projectObj.allotTime) / 60);
            var endMin =  Math.floor((startTimeMin + projectObj.allotTime) % 60);

            var totalHours = endHour - startHour;

            var totalSlots = totalHours + ((endMin > 0)?1:0);

            for(j = 0; j < totalSlots; j++) {
                var cell = document.getElementById("weekly-calendar").rows[startHour + j].cells[i+1];
                cell.style.padding = "0px"; 
                cell.style.margin = "0px";
                var projDivContainer = document.createElement('div');
                projDivContainer.className = 'project-container';
            
                var projDiv = document.createElement('div');
                //eventDiv.style.height = "50%";
                projDiv.id = projectObj.project.title + "-" + i;
                projDiv.className = 'project ' + projDiv.id;

                var prst = projectObj.startTime;
                projDiv.title = projectObj.project.title + " from " + prst + " to " + mil2std(endHour, endMin) + ".";
                projDiv.setAttribute('data-toggle', 'tooltip');
                projDiv.setAttribute('data-placement', 'top');

                //rules of the road
                if(j == 0) {
                    projDivContainer.style.paddingTop = startMin / 3 + "%";
                    if(startMin == 0) {
                        projDivContainer.style.paddingTop = '1px';
                    }
                }

                if(j == totalSlots - 1) {
                    if(endMin == 0) {
                        projDivContainer.style.paddingBottom = "1px";
                    } else {
                        projDivContainer.style.paddingBottom = totalHours * 10 + ((60 - endMin) / 3) + "%";
                    }
                }

                if(j > 0) {
                    projDiv.style.borderTopLeftRadius = '0px';
                    projDiv.style.borderTopRightRadius = '0px';
                    cell.style.borderTopWidth = '0px';
                }
                
                if(totalSlots > 1 && j < totalSlots - 1) {
                    projDiv.style.borderBottomLeftRadius = '0px';
                    projDiv.style.borderBottomRightRadius = '0px';
                    cell.style.borderBottomWidth = '0px';
                }

                projDiv.onclick = function() { 
                    //fill in edit modal with info
                    $('#editProjectModal').modal('toggle');
                    $('#p_title_edit').val(projectObj.project.title);
                    $('#pst_edit').val(projectObj.project.startDate);
                    $('#pet_edit').val(projectObj.project.dueDate);
                    $('#p_hours_edit').val(projectObj.project.expectedTimeHours);
                    $('#p_min_edit').val(projectObj.project.expectedTimeMinutes);
                    $('#p_desc_edit').val(projectObj.project.description)
                    //store events id for backend usage
                    $('#id-holder').text(projectObj.project.id);
                }

                //in order to play the game, ya gotta know the rules
                projDiv.onmouseover = function() {
                    var e = document.getElementsByClassName(this.id);
                    Array.prototype.forEach.call(e, function(el) {
                        el.style.webkitFilter = "brightness(80%)";    
                    });
                }

                projDiv.onmouseleave = function() {
                    var e = document.getElementsByClassName(this.id);
                    Array.prototype.forEach.call(e, function(el) {
                        el.style.webkitFilter = "brightness(100%)";    
                    });
                }

                //break it down, then build it back up
                var title = document.createTextNode(projectObj.project.title);
                projDiv.appendChild(title);
                projDivContainer.appendChild(projDiv);
                cell.childNodes[0].appendChild(projDivContainer);
            }
        });
    }
}

//clears the calendar of all events and projects, resets the cells
function clearAllEventsAndProjects() {
    $('.event').remove();
    $('.project').remove();
    $('td').attr('rowspan', 1);
    $('.event-container').remove();
    $('.project-container').remove();
    $('.cal-cell').css({'border-top-width': '1px', 'border-bottom-width': '1px'});
}

//Converts standard 12 hour time to 24 hour time
function standard2Military(str) {
    var hour = parseInt(str.split(':')[0]);
    var o = str.split(":")[1].split(" ");
    var min = parseInt(o[0]);
    var AMPM = o[1];
    if(AMPM === 'AM' && hour == 12) {
        hour = 0;
    } else if(AMPM == 'PM' && hour == 12) {
        hour == 12;
    } else {
        hour = (AMPM === 'AM' && hour < 12)?hour:hour+12;
    }
    return [hour, min];   
}

function mil2std (hour, min) {
    var stdhour = hour % 12;
    var ampm = (hour < 12)?"AM":"PM";
    return stdhour + ":" + min + " " + ampm;
}

//highlights the current day on the top of the calendar that corresponds to the current day in top left corner
function highlightDate(user) {
    for(var i = 0; i < weekarr.length; i++) {
        document.getElementById(weekarr[i].split('&')[0]).style.backgroundColor = "white";
    }
    document.getElementById(weekarr[user.currentUserDate.getDay()].split('&')[0]).style.backgroundColor = "lightskyblue";
}

function resetProjects(user) {
    user.projects.forEach(p => {
        p.timeRemaining = (parseInt(p.expectedTimeHours * 60)) + parseInt(p.expectedTimeMinutes);
    })
}

//function to be called everytime user does something that updates UI
function updateUI() {
    user.update(); //update current user projects and events
    displayDate(user); //display correct date in top left
    clearAllEventsAndProjects(); //reset calendar
    resetProjects(user);
    displayUsersEvents(user); //display all events in calendar
    displayUserProjects(user);
    console.log(user); //log user status (for debugging)
    highlightDate(user); //highlight current date in top bar
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}

/**
 * Gets the date for the beginning of given dates week (sunday)
 * @param {date to get week start of} date 
 */
function getBeginningOfWeek(date) {
    var dateCopy = new Date(date);
    return new Date(dateCopy.setDate(dateCopy.getDate() - dateCopy.getDay()));
}