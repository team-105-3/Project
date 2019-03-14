


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

    switch(dayOfWeek) {
        case 1: <!-- Sunday -->
            // code block
            break;
        case 2: <!-- Monday -->
            // code block
            break;
        case 3: <!-- Tuesday -->
            // code block
            break;
        case 4: <!-- Wednesday -->
            // code block
            break;
        case 5: <!-- Thursday -->
            // code block
            break;
        case 6: <!-- Friday -->
            // code block
            break;
        case 7: <!-- Saturday -->
            // code block
            break;
        default:
        // code block
    }

    document.getElementById("Sunday").innerHTML= "Sunday" + " " + month + "/" + currentDate;
}




