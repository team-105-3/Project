function register() {
    //get inputted data
    var firstName = document.getElementById("fname").value.trim();
    var lastName = document.getElementById("lname").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();

    //validate the data
    if(validateInfo(firstName, lastName, email, password)) {
        return;
    }

    //send data to server
    var params = {
        "f_name": firstName,
        "l_name": lastName,
        "email": email,
        "password": password
    }


    //create ajax request
    var request = new XMLHttpRequest();

    var url = connectUrl + "/register/";

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        $('#loading').modal('hide');
        var status = request.response.status;
        if(status == 1) {
            window.location.href = "./login.html?q=1";
        } else {
            window.location.href = "./login.html?q=0";
        }
    }

    request.send(JSON.stringify(params));
    $('#loading').modal('show');
}

/**
 * Validates all of a users registration info.
 * Also sets warnings on registration page to let user know what info needs to be fixed.
 * Returns false if all registration info is valid, true if atleast one invalid argument.
 * @param {Users first name} firstName 
 * @param {Users last name} lastName 
 * @param {Users email address} email 
 * @param {Users password} password 
 */
function validateInfo(firstName, lastName, email, password) {
    var r = false;

    //check to make sure all data is there
    if(!validateName(firstName, lastName)) {
        document.getElementById("name-warning").style.display = "block";
        r = true;
    } else {
        document.getElementById("name-warning").style.display = "none";
    }

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

    return r;
}

