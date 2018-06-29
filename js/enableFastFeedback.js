import { airportList } from "./script.js";

function enableFastFeedback(form){
  var sourceInput = form.find("#source");
  var destinationInput = form.find("#destination");
  var dateInput = form.find("#date");
  var adultsInput = form.find("#adults");
  var childInput = form.find("#child");
  var infantInput = form.find("#infant");
  var checkNoOfValidations = 0;
  var flagSource=1, flagDestination=1,flagDate=1,flagAdult=1,flagChild=1,flagInfant= 1, flagMax1=1, flagMax2=1;
  var noOfInfants, noOfAdults;
  var totalPassengers = 0;

  sourceInput.blur(function(){
    var source = $(this).val();
    var sourceValidate = 0;
    for(var i=0; i < airportList.length;i++){
      if(airportList[i]==source){
        sourceValidate = 1;
        break;
      }
    }
    if(sourceValidate != 1){
      // do validation stuff here
      $("#sourceSpan").css('display','inline-block');
      document.getElementById('sourceSpan').innerHTML = "Please Enter a valid Source";
    }
    else{
      $("#sourceSpan").css('display','none');
    }
  });

  destinationInput.blur(function(){
    var destination = $(this).val();
    var destinationValidate = 0;
    for(var i=0;i<airportList.length;i++){
      if(airportList[i]==destination){
        destinationValidate = 1;
        break;
      }
    }
    if(destinationValidate != 1){
      $("#destinationSpan").css('display','inline-block');
      document.getElementById('destinationSpan').innerHTML = "Please Enter a valid Destination";
    }
    else{
      $("#destinationSpan").css('display','none');
    }
  });

  var today = new Date();
  var dd = today.getDate(); var dd_tomm = dd + 1;
  var mm = today.getMonth()+1; //January is 0
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+ dd;
  }
  if(mm<10) {
    mm = '0'+ mm;
  }
  today = yyyy + '' + mm + '' + dd;
  var date;
  date = $("#date").val();
  date = date.replace(/\-/g,"");
  dateInput.blur(function(){
    date = $("#date").val();
    date = date.replace(/\-/g,"");
    if(date <= today){
      $("#dateSpan").css('display','inline-block');
      document.getElementById('dateSpan').innerHTML = "Please Enter a valid Date";
    }
    else{
      $("#dateSpan").css('display','none');
    }
  });

  adultsInput.blur(function(){
    var adult = $(this).val();
    if(adult ==""){
      $("#adultsSpan").css('display','inline-block');
      document.getElementById('adultsSpan').innerHTML = "Please enter a Value";
    }
    else if(adult<1){
      $("#adultsSpan").css('display','inline-block');
      document.getElementById('adultsSpan').innerHTML = "Please enter a valid value";
    }
    else if(adult > 9){
      $("#adultsSpan").css('display','inline-block');
      document.getElementById('adultsSpan').innerHTML = "Max. Passengers can be 9";
    }
    else{
      $("#adultsSpan").css('display','none');
    }

    if(( Number($("#adults").val()) + Number($("#infant").val()) + Number($("#child").val())) > 9){
      $("#submitSpan").css('display','inline-block');
    }
    else{
      $("#submitSpan").css('display','none');
    }
  });

  childInput.blur(function(){
    var child = $(this).val();
    if(child ==""){
      $("#childSpan").css('display','inline-block');
      document.getElementById('childSpan').innerHTML = "Please enter a Value";
    }
    else if(child > 9 || child < 0){
      $("#childSpan").css('display','inline-block');
      document.getElementById('childSpan').innerHTML = "Max. Passengers can be 9";
    }
    else{
      $("#childSpan").css('display','none');
    }

    if(( Number($("#adults").val()) + Number($("#infant").val()) + Number($("#child").val())) > 9){
      $("#submitSpan").css('display','inline-block');
    }
    else{
      $("#submitSpan").css('display','none');
    }
  });

  infantInput.blur(function(){
    var infant = $(this).val();
    if(infant ==""){
      $("#infantSpan").css('display','inline-block');
      document.getElementById('infantSpan').innerHTML = "Please enter a Value";
    }
    else if(infant > 9 || infant < 0){
      $("#infantSpan").css('display','inline-block');
      document.getElementById('infantSpan').innerHTML = "Max. Passengers can be 9";
    }
    else if(Number(infantInput.val()) > Number(adultsInput.val())){
      $("#infantSpan").css('color','red');
      $("#infantSpan").css('display','inline-block');
      document.getElementById('infantSpan').innerHTML = "Number of infants cannot be more than adults";
    }
    else{
      $("#infantSpan").css('display','none');
    }

    if(( Number($("#adults").val()) + Number($("#infant").val()) + Number($("#child").val())) > 9){
      $("#submitSpan").css('display','inline-block');
    }
    else{
      $("#submitSpan").css('display','none');
    }
  });


  if(sourceInput.val()==""){
    $("#sourceSpan").css('display','inline-block');
  }
  if(destinationInput.val()==""){
    $("#destinationSpan").css('display','inline-block');
  }

  if(dateInput.val() == ""){
    $("#dateSpan").css('display','inline-block');
  }

  if(adultsInput.val() == ""){
    $("#adultsSpan").css('display','inline-block');
  }

  // final result to send
  var check = 0;
  for(var i=0; i < airportList.length;i++){
    if(airportList[i]==sourceInput.val()){
      check += 1;
      flagSource = 0;
    }
    if(airportList[i]==destinationInput.val()){
      check += 1;
      flagDestination = 0;
    }
    if(check==2){
      break;
    }
  }

  if(date > today){
    flagDate = 0;
  }

 for(var i=1; i<=9;i++){
      if(adultsInput.val()==i){
        flagAdult=0;
        break;
      }
  }
  check = 0;
  for(var i=0; i<=9;i++){
    if(childInput.val()==i){
      flagChild=0;
      check +=1;
    }
    if(infantInput.val()==i){
      flagInfant=0;
      check +=1;
    }
    if(check==2){
      break;
    }
  }
  var maxPassengers = Number(adultsInput.val())+ Number(childInput.val()) + Number(infantInput.val());
  if(maxPassengers <= 9){
    flagMax1 = 0;
  }
  else{
    flagMax1 = 1;
  }
  if(adultsInput.val() != ""){
    if(adultsInput.val() == infantInput.val() || adultsInput.val() > infantInput.val()){
      flagMax2 = 0;
    }
  }
  var totalFlags = flagSource+flagDestination+flagDate+flagAdult+flagChild+flagInfant+flagMax1+flagMax2;
  return totalFlags;
}

export default enableFastFeedback;
