$.fn.modal.Constructor.prototype.enforceFocus = function () {};

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
 * Clears all entries in every form.
 */
function clearAllEntries() {
    var entries = document.querySelectorAll('.entry');
    entries.forEach(element => {
        element.value = '';
    });
var background = document.body.style.backgroundColor;

function clock()
{
    var d = new Date();
    var date = d.getDate();
    var year = d.getFullYear();
    var month = d.getMonth();
    var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    month = monthArr[month];
    document.getElementById("date").innerHTML=month+" "+year;
}

function displayDate()
{
    var currentDate = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var dayOfWeek = new Date().getDay()+1;
    var weekarr= ["Sun", "Mon", "Tues", "Wedn", "Thurs", "Fri", "Sat"];
    switch(dayOfWeek) {
        case 1: //<!-- Sunday -->
            var i = 0;
            var trackDay = 0;
            for(i =0; i < 7; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                document.getElementById(day).innerHTML= weekarr[trackDay] + " " + month + "/" + date;
                trackDay += 1;
            }

            break;
        case 2: //<!-- Monday -->

            var i = 0;
            var trackDay = 0;
            for(i =-1; i < 6; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                document.getElementById(day).innerHTML= weekarr[trackDay] + " " + month + "/" + date;
                trackDay += 1;
            }


            break;
        case 3: //<!-- Tuesday -->
            // code block

            var i = 0;
            var trackDay = 0;
            for(i =-2; i < 5; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                document.getElementById(day).innerHTML= weekarr[trackDay] + " " + month + "/" + date;
                trackDay += 1;
            }



            break;
        case 4: //<!-- Wednesday -->
            // code block


            var i = 0;
            var trackDay = 0;
            for(i =-3; i < 4; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                document.getElementById(day).innerHTML= weekarr[trackDay] + " " + month + "/" + date;
                trackDay += 1;
            }

            break;
        case 5: //<!-- Thursday -->
            // code block
            var i = 0;
            var trackDay = 0;
            for(i =-4; i < 3; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                document.getElementById(day).innerHTML= weekarr[trackDay] + " " + month + "/" + date;
                trackDay += 1;
            }

            break;
        case 6: //<!-- Friday -->
            // code block


            var i = 0;
            var trackDay = 0;
            for(i =-5; i < 2; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                document.getElementById(day).innerHTML= weekarr[trackDay] + " " + month + "/" + date;
                trackDay += 1;
            }



            break;
        case 7: //<!-- Saturday -->
            // code block


            var i = 0;
            var trackDay = 0;
            for(i =-6; i < 1; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                document.getElementById(day).innerHTML= weekarr[trackDay] + " " + month + "/" + date;
                trackDay += 1;
            }

            break;
        default:
        // code block
    }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.backgroundColor = background;
}