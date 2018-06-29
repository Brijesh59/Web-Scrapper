import downloadCSV from "./csvGenerator.js";
import enableFastFeedback from "./enableFastFeedback.js";

export var airportList = [];

$(document).ready(function(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var airports = response.airports; // array

        for(var i = 0; i < airports.length; i++){
          airportList[i] = airports[i].lable;
        }
      }
  };
  xhr.open("GET", "flight-data.json", true);
  xhr.send();

  var form = $('#formValidate');
  enableFastFeedback(form);
  $("#sourceSpan").css('display','none');
  $("#destinationSpan").css('display','none');
  $("#dateSpan").css('display','none');
  $("#adultsSpan").css('display','none');

});

document.getElementById('formValidate').addEventListener('submit',submitData);

function submitData(e){
  e.preventDefault();
  var url;
  var source = document.getElementById('source').value;
  var sourceAirport = source;
  var destination = document.getElementById('destination').value;
  var destinationAirport = destination;
  var dateObject = document.getElementById('date').value;
  dateObject = dateObject.replace(/\-/g, '');
  var adult = document.getElementById('adults').value;
  var child = document.getElementById('child').value;
  var infant = document.getElementById('infant').value;
  var classOfTarvelling = document.getElementById('classOfTarvelling').value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(xhttp.responseText);
          var airports = response.airports; // array

          var flag1 = 0, flag2 = 0, counter=100, native='D';
          for(var i = 0; i < airports.length; i++){
            if(airports[i].lable === source || airports[i].city == source || airports[i].value == source && flag1==0){
              source = airports[i].value;
              flag1 += 1;
            }
            if(airports[i].lable === destination || airports[i].city == destination || airports[i].value == destination && flag2==0){
              destination = airports[i].value;
              flag2 += 1;
            }
            if(airports[i].country !== "India"){
              counter=0;
              native = 'I';
            }
            if(flag1 == 1 && flag2 == 1){
              break;
            }
          }
          url = `https://developer.goibibo.com/api/search/?app_id=1a4fd4f0&app_key=7ecaf9b3c20a02e0b531b383074c34d7&format=json&source=${source}&destination=${destination}&dateofdeparture=${dateObject}&seatingclass=${classOfTarvelling}&adults=${adult}&children=${child}&infants=${infant}&counter=${counter}`;

          var form = $('#formValidate');

          var flag;
          flag = enableFastFeedback(form);
          if(flag==0){
            postdata(url,source,sourceAirport,destination,destinationAirport,dateObject,adult,child,infant,classOfTarvelling,native);
          }
        }
    };
    xhttp.open("GET", "flight-data.json", true);
    xhttp.send();
}

export var stockData = [];

function postdata(url,source,sourceAirport,destination,destinationAirport,dateObject,adult,child,infant,classOfTarvelling,native){
  $( "form" ).remove();
  $('.spinner').css('display','block');


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        var fliteData = response.data.onwardflights; // array
        var count=0;
        try {
          var len = fliteData.length;
        }
        catch(err) {
          $( ".spinner" ).remove();
          $( "#lists" ).css('color','red');
          $( "#lists" ).css('margin-left','25%');
          document.getElementById("lists").innerHTML = "<h4>Something went wrong!<br/>Please Check your input values.<h4>";
        }

        for(var i=0; i<fliteData.length; i++ ){
            if( destination==fliteData[i].destination){
              count = count+1;
              var $lists = $("#lists");

              let div = document.createElement('div');
              let ul = document.createElement('ul');
              let li1 = document.createElement('li');
              let li2 = document.createElement('li');
              let li3 = document.createElement('li');
              let li4 = document.createElement('li');
              let li5 = document.createElement('li');
              let li6 = document.createElement('li');
              let li7 = document.createElement('li');
              let li8 = document.createElement('li');
              let li9 = document.createElement('li');
              let footer = document.createElement('div');
              let button1 = document.createElement('button');
              let button3 = document.createElement('button');

              var departureDate = fliteData[i].depdate.slice(0,10);
              var arrivalDate = fliteData[i].arrdate.slice(0,10);

              li1.textContent = `Airline: ${fliteData[i].airline}`;
              li2.textContent = `Source:  ${fliteData[i].origin}`;
              li3.textContent = `Destination: ${fliteData[i].destination}`;
              li4.textContent = `Departure Date: ${departureDate}`;
              li5.textContent = `Departure Time: ${fliteData[i].deptime}`;
              li6.textContent = `Arrival Date: ${arrivalDate}`;
              li7.textContent = `Arrival Time: ${fliteData[i].arrtime}`;
              li9.textContent = `Duration: ${fliteData[i].duration}`;
              li8.textContent = `No of Stops: ${fliteData[i].stops}`;
              button1.textContent = `Rs. ${fliteData[i].fare.grossamount}`;
              button3.textContent = 'Book Now';

              div.className = "card #F7F6F2";
              ul.className = "card-content #5AB77D";
              footer.className = "card-action";

              ul.appendChild(li1);
              ul.appendChild(li2);
              ul.appendChild(li3);
              ul.appendChild(li4);
              ul.appendChild(li5);
              ul.appendChild(li6);
              ul.appendChild(li7);
              ul.appendChild(li9);
              ul.appendChild(li8);
              footer.appendChild(button1);
              footer.appendChild(button3);

              li1.className = "card-title";
              li2.className = "new badge";
              li3.className = "new badge";
              li4.className = "new badge";
              li5.className = "new badge";
              li6.className = "new badge";
              li7.className = "new badge";
              li8.className = "new badge";
              li9.className = "new badge";
              button1.className = "btn green darken-1";
              button3.className = "btn red lighten-1 linkToPage";

              ul.appendChild(footer);
              div.appendChild(ul);

              $('.spinner').remove();
              lists.appendChild(div);

              let objectForCsv = {
                'Airline': fliteData[i].airline,
                'Source' :  fliteData[i].origin,
                'Destination': fliteData[i].destination,
                'Departure Date': departureDate,
                'Departure Time': fliteData[i].deptime,
                'Arrival Date': arrivalDate,
                'Arrival Time': fliteData[i].arrtime,
                'No of Stops': fliteData[i].stops,
                'Duration': fliteData[i].duration,
                'Price': fliteData[i].fare.grossamount
              }
              stockData.push(objectForCsv);

              var newUrl = `https://www.goibibo.com/flights/air-${fliteData[i].origin}-${fliteData[i].destination}-${dateObject}--${adult}-${child}-${infant}-${classOfTarvelling}-${native}/`;
              $('.linkToPage').on('click',function(){
                window.open(newUrl, '_blank');
              })
            }
        }
        if(count==0){
          $('.spinner').remove();
          $('#lists').css('color','red');
          $('#lists').css('margin-left','-8%');
          document.getElementById('lists').innerHTML = "<h4>Sorry No Flights Found!<h4>";
        }
      }
      else
        console.log("error");
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

$(".csv").click(function(){
  downloadCSV({ filename: "stock-data.csv" });
});

$(".about").click(function(){
  let header = `<h3>About</h3>`;
  let about = `<p>This web app uses an API to fetch flight data and stores the data of flights, fare information, duration etc. in csv file, which is available to download on click of a button.</p>`;
  document.querySelector(".rightBody").innerHTML = header + '<hr width="87%"/>' +about;
});
