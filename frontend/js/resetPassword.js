function resetPassword() {
    var key = document.getElementById('key').value;
    var newPassword = document.getElementById('newPassword').value;

    document.getElementById('bad-key').style.display = "none";
    document.getElementById('succ').style.display = "none";

    if(emptyString(key) || emptyString(newPassword)) {
        document.getElementById('no-key').style.display = "block";
        return;
    } else {
        document.getElementById('no-key').style.display = "none";
    }


    var request = new XMLHttpRequest();

    var url = connectUrl + "/resetPassword/";

    var params = {
        "key": key,
        "newPass": newPassword
    }

    //open up a post requst to defined url
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");

    //we will be getting a text response from server
    request.responseType = "json";

    //when we have gotten a response from the server, print it to the console
    request.onload = function() {
        var status = request.response.status;
        if(status == 0) {
            document.getElementById('bad-key').style.display = "block";
        } else {
            document.getElementById('succ').style.display = "block";
        }
    }

    request.send(JSON.stringify(params));
}