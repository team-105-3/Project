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

    $('#createEventModal').modal('toggle');
    clearAllEntries();

    if(fail) {
        $('#createEventModal').on('hidden.bs.modal', function() {
            $('#eventCreationFail').modal('toggle');
        });
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

    $('#createEventModal').modal('toggle');
    clearAllEntries();

    if(fail) {
        $('#createEventModal').on('hidden.bs.modal', function() {
            $('#eventCreationFail').modal('toggle');
        });
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
            // user.addEvent(event);
        } else {
            console.log('failed to edit event');
        }
        //callback();
    };

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
        $('#createProjectModal').on('hidden.bs.modal', function() {
            $('#projectCreationFail').modal('toggle');
        });
        return;
    }

    var project = new Project(title, startDate, dueDate, expTimeHours, expTimeMin, desc);

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

//clears the calendar of all events and projects, resets the cells
function clearAllEventsAndProjects() {
    $('.event').remove();
    $('.project').remove();
    $('td').attr('rowspan', 1);
    $('.event-container').remove();
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

//highlights the current day on the top of the calendar that corresponds to the current day in top left corner
function highlightDate(user) {
    for(var i = 0; i < weekarr.length; i++) {
        document.getElementById(weekarr[i].split('&')[0]).style.backgroundColor = "white";
    }
    document.getElementById(weekarr[user.currentUserDate.getDay()].split('&')[0]).style.backgroundColor = "lightskyblue";
}

//function to be called everytime user does something that updates UI
function updateUI() {
    user.update(); //update current user projects and events
    displayDate(user); //display correct date in top left
    clearAllEventsAndProjects(); //reset calendar
    displayUsersEvents(user); //display all events in calendar
    console.log(user); //log user status (for debugging)
    highlightDate(user); //highlight current date in top bar
}