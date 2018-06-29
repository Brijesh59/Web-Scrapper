  var obj = {};

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      var airports = response.airports;

      for(var i = 0; i < airports.length; i++){
        var lable = airports[i].lable;
        obj[lable] = '';
        obj = Object.assign(obj,{});
      }
    }
  };
  xhttp.open("GET", "flight-data.json", true);
  xhttp.send();

  $(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: obj,
    });
    $('select').formSelect();
  });
