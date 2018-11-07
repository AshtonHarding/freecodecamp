$(document).ready(function(){
  if(navigator.geolocation){
    // Get user location
    navigator.geolocation.getCurrentPosition(function(position){
      var loc_lat = position.coords.latitude;
      var loc_long = position.coords.longitude;
      // Updates location.
      $("#location").html(loc_lat + "," + loc_long);
      myFunction(loc_lat, loc_long);
    
      // currently.summary || currently[1].
      // currently.temperature || currently[7]
    });
  }  
  
  /* Display different image, based on weather
    for example: Raining = Raindrops, etc.
  */
  
  /* Button that toggles between F / C. */
  $('#toggleTemp').on("click", function(){
    $("#F").toggle();
    $("#C").toggle();
  });
});

function myFunction(loc_lat, loc_long){
  var api_key = "153beaf99665e0c36924cab2e6c11b61";
  var api_site = "https://crossorigin.me/https://api.darksky.net/forecast/" + api_key + "/" + loc_lat + "," + loc_long;
  /* Get data */
  //console.log(api_site); //SUCCESS!
  $.getJSON(api_site, function(forecast){
    //console.log(forecast.currently.summary); // does this work yet?
    // variables to update
    var temp_F = Math.round(forecast.currently.temperature);
    var temp_C = (5 / 9) * (temp_F - 32);
    var status = forecast.currently.summary;
    var w_icon = forecast.currently.icon;
  
    // Set each variable in it's proper location
    $("#F").empty();
    $("#F").html(temp_F);
    $("#C").empty();
    $("#C").html(temp_C);
    $("#type").empty();
    $("#type").html(status);
    
    // This one does the icons.
    var icons = new Skycons({"color": "orange"});
    icons.set("icon1", w_icon);
    icons.play;

    }
  );
}
