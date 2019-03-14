


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
    var weekarr= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    switch(dayOfWeek) {
        case 1: <!-- Sunday -->
            var i = 0;
            var trackDay = 0;
            for(i =0; i < 7; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                document.getElementById(day).innerHTML= weekarr[trackDay] + " " + month + "/" + date;
                trackDay += 1;
            }

            break;
        case 2: <!-- Monday -->

            var i = 0;
            var trackDay = 0;
            for(i =-1; i < 6; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                document.getElementById(day).innerHTML= weekarr[trackDay] + " " + month + "/" + date;
                trackDay += 1;
            }


            break;
        case 3: <!-- Tuesday -->
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
        case 4: <!-- Wednesday -->
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
        case 5: <!-- Thursday -->
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
        case 6: <!-- Friday -->
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
        case 7: <!-- Saturday -->
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




