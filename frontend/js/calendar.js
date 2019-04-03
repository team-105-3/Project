var date = new Date().getDate();
console.log(date);
var week = new Date().getDay();
var month = new Date().getMonth();
var year = new Date().getFullYear();
var currentDate = date;
console.log("currentDate = " + currentDate)

var weekarr= ["Sun", "Mon", "Tues", "Wedn", "Thurs", "Fri", "Sat"];
var monthArr = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
var month30 = ["April", "June", "September", "November"];
var month31 = ["January", "March", "May", "July", "August", "October", "December"];

function view_switcher(){
    var header = document.getElementById("myDIV");
    var btns = header.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++){
        btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
}

function clock(){
    month = monthArr[month];
    document.getElementById("date").innerHTML=month+" "+year;
}

function fixweek(date,month){
    if(month=="February"){
        if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
            if(date > 29){
                date = 1;
                month = "March";
            }
        }
        else{
            if(date > 28){
                date = 1;
                month = "March";
            }
        }
    }
    else if(month31.includes(month)){
        if(date > 31){
            date = 1;
            month = monthArr[monthArr.findIndex(month) + 1];
        }
    }
    else{
        if(date > 30){
            date = 1;
            console.log(month);
            console.log(monthArr.findIndex(month));
            month = monthArr[monthArr.findIndex(month) + 1];
        }
    }
}

function createweek()
{
    console.log(currentDate);
    switch(week) {
        case 0: <!-- Sunday -->
            var i = 0;
            var trackDay = 0;
            for(i =0; i < 7; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                fixweek(date,month);
                document.getElementById(day).innerHTML= weekarr[trackDay] + "<br />" + month + "/" + date;
                trackDay += 1;
            }
            break;

        case 1: <!-- Monday -->

            var i = 0;
            var trackDay = 0;
            for(i =-1; i < 6; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                fixweek(date,month);
                document.getElementById(day).innerHTML= weekarr[trackDay] + "<br />" + month + "/" + date;
                trackDay += 1;
            }
            break;

        case 2: <!-- Tuesday -->
            // code block
            var i = 0;
            var trackDay = 0;
            for(i =-2; i < 5; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                fixweek(date,month);
                document.getElementById(day).innerHTML= weekarr[trackDay] + "<br />" + month + "/" + date;
                trackDay += 1;
            }
            break;

        case 3: <!-- Wednesday -->
            // code block
            var i = 0;
            var trackDay = 0;
            for(i =-3; i < 4; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                fixweek(date,month);
                document.getElementById(day).innerHTML= weekarr[trackDay] + "<br />" + month + "/" + date;
                trackDay += 1;
            }
            break;

        case 4: <!-- Thursday -->
            // code block
            var i = 0;
            var trackDay = 0;
            for(i =-4; i < 3; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                fixweek(date,month);
                document.getElementById(day).innerHTML= weekarr[trackDay] + "<br />" + month + "/" + date;
                trackDay += 1;
            }
            break;

        case 5: <!-- Friday -->
            // code block
            var i = 0;
            var trackDay = 0;
            for(i =-5; i < 2; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                fixweek(date,month);
                document.getElementById(day).innerHTML= weekarr[trackDay] + "<br />" + month + "/" + date;
                trackDay += 1;
            }
            break;

        case 6: <!-- Saturday -->
            // code block
            var i = 0;
            var trackDay = 0;
            for(i =-6; i < 1; i++) {
                var day = weekarr[trackDay];
                var date = currentDate + i;
                fixweek(date,month);
                document.getElementById(day).innerHTML= weekarr[trackDay] + "<br />" + month + "/" + date;
                trackDay += 1;
            }
            break;

        default:
        // code block
    }
}

function displayDate(number)
{
    currentDate = currentDate+ (number*7);
    console.log(date);
    console.log("currentDate = " + currentDate)

    createweek();
    
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}