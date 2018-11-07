$(document).ready(function(){
  var api_link = "https://gist.githubusercontent.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8/raw/e9e12f154d71cf77fc32e94e990749a7383ca2d6/Twitch%2520sample%2520API%2520responses%2520in%2520array%2520form";
  $.getJSON(api_link, function(data){
    //console.log(data[4].message);
    var html = "";
    for(var i = 0; i < 5; i++){
      if(data[i].stream == null){
        if(data[i].status == 404){
          html += "<tr><td>No Logo</td>";
          html += "<td>[deleted or mispelled]</td>";
          html += "<td>"+data[i].message+"</td></tr>" 
        }else{
          //console.log(data[i].display_name);
          html += "<tr><td>No Logo</td>";
          html += "<td>"+data[i].display_name+"</td>";
          html += "<td>OFFLINE</td></tr>";
        }
      }else{
        html += "<tr><td><img src=\""+data[i].stream.logo+"\" width=\"50\"></td>";
        html += "<td><a href=\""+data[i].stream.url+"\" target=\"_blank\">";
        html += data[i].stream.display_name+"</a></td>"
        html += "<td>"+data[i].stream.status+"</td></tr>"
      }
    }
    $(".table").html(html);
  });
});
