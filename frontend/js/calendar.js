$.fn.modal.Constructor.prototype.enforceFocus = function () {};

//////////////////////////////////
/// PROJECT AND EVENT CREATION ///
//////////////////////////////////


/**
 * Creates an event and sends it to the server.
 */
function createCalendarEvent() {
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
    }

    request.send(JSON.stringify(sendObj));
    //$('#loading').modal('show');

}

/**
 * Creates a project and sends it to the server
 */
function createCalendarProject() {
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
 * CURRENTLY BROKEN
 * 
 * TODO: fix margins / padding calculation so events are lined up correctly with the time they set for
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

            var cell = document.getElementById("weekly-calendar").rows[startHour].cells[i+1];

            cell.setAttribute('rowspan', totalHours + ((endMin > 0)?1:0));
            cell.style.padding = "0px"; 
            cell.style.margin = "0px";
            //cell.style.paddingTop = (startMin / 60) * 100 + "px";
            var eventDivContainer = document.createElement('div');
            eventDivContainer.style.paddingTop = startMin / 3 + "%";
            if(endMin == 0) {
                eventDivContainer.style.paddingBottom = "0%";
            } else {
                eventDivContainer.style.paddingBottom = totalHours * 10 + ((60 - endMin) / 3) + "%";
            }
            eventDivContainer.className = 'event-container';
            
            var eventDiv = document.createElement('div');
            //eventDiv.style.height = "50%";
            eventDiv.className = 'event';
            

            eventDiv.onclick = function() { console.log(event); }

            var title = document.createTextNode(event.title);
            eventDiv.appendChild(title);
            eventDivContainer.appendChild(eventDiv);
            cell.childNodes[0].appendChild(eventDivContainer);
        });
    }
}

//clears the calendar of all events and projects, resets the cells
function clearAllEventsAndProjects() {
    $('.event').remove();
    $('.project').remove();
    $('td').attr('rowspan', 1);
    $('.event-container').remove();
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