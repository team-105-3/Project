function recoverPassword() {
    var email = document.getElementById('email').value;

    if(emptyString(email) || !validateEmail(email)) {
        document.getElementById('no-email').style.display="block";
        document.getElementById('bad-email').style.display = "none";
        return;
    } else {
        document.getElementById('no-email').style.display="none";
    }

    var request = new XMLHttpRequest();

    var url = connectUrl + "/recoverPassword/";

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        var status = request.response.status;
        if(status == 0) {
            document.getElementById('bad-email').style.display = "block";
        } else {
            window.location.href = "../html/resetPassword.html";
        }
    }

    request.send(JSON.stringify({"email": email}));
}