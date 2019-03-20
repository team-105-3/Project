function register() {
    //get inputted data
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();

    var r = false;

    if(!validateEmail(email)) {
        document.getElementById("email-warning").style.display = "block";
        r = true;
    } else {
        document.getElementById("email-warning").style.display = "none";
    }

    if(!validatePassword(password)) {
        document.getElementById("password-warning").style.display = "block";
        r = true;
    } else {
        document.getElementById("password-warning").style.display = "none";
    }

    if(r) {return;}

    //send data to server
    var params = {
        "email": email,
        "password": password
    }
    
    //create ajax request
    var request = new XMLHttpRequest();

    var url = connectUrl + "/login/";

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        $('#loading').modal('hide');
        var key = request.response.status;
        if(key == "bad-login") {
            document.getElementById('bad-login').style.display = "block";
        } else {
            window.location.href = "./calendar.html?key=" + key;
        }
    }

    request.send(JSON.stringify(params));
    $('#loading').modal('show');
}

