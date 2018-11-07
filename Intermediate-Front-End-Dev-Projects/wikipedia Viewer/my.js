$(document).ready(function(){
  // Run.
});

function searchFunction(){
  var user_input = document.getElementById('query').value;
  var baseWikiURL = "https://en.wikipedia.org/w/api.php?";
  var wikiSearch = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+user_input+"&callback=JSON_CALLBACK";  
  $.ajax({
    url: wikiSearch,
    data: { action: 'query',  list: 'search', srsearch: user_input, format: 'json', prop: 'pageimages', prop: 'revisions', rvprop: 'content', formatversion: 1, gsrlimit: 9},
    dataType: 'jsonp',
    success: function ( x ){
      var html = "";
      for(var i = 0; i < 9; i++){
        // x.query => can get page somehow.
        // x.query.search[i] => Everything else.
        //console.log(x.query);
        var the_title = x.query.search[i].title;
        var the_snippet = x.query.search[i].snippet;
        // TODO: Fix the number issue, the links are very wrong/off... - ash
        var array = [];
        $.each(x.query, function(key, val){
          $.each(val, function(key1, val1){
            array.push(key1);
          });
        });
        // Remove the last 11 in the array.
        array.splice(9, 11);
        // Rearrange the ids properly. No idea why they don't work already. 
        // but whatever.
        // New note: It doesn't specifically SAY to link to the wiki articles.
        // so... I guess I completed it yesterday and spent all this time for
        // not reason... >.> Side note: The wiki API is a pain in the ass.
        // Seriously, half of the specifications only work in a browser
        // and not in codepen. I think we should have to buy our own cheap
        // VM and run sites in that way instead of using codepen.
        var arr_hold = array;
        /*
        array = []
        array[0] = arr_hold[7];
        array[1] = arr_hold[8];
        array[2] = arr_hold[0];
        array[3] = arr_hold[5];
        array[4] = arr_hold[3];
        array[5] = arr_hold[4];
        array[6] = arr_hold[2];
        array[7] = arr_hold[1];
        array[8] = arr_hold[6];
        */
        /* test order: 
        current{ ["856", "1344", "2116", "2117", "501016", "646886", "6963544", "18978754", "36071326"]}
        apple{ 18978754, 36071326, 856, 646886, 2117, 501016, 2116, 1344, 6963544 } */
        // Note: This ^ only works for apple. *sigh*
        //console.log(array);
        //var link = "https://en.wikipedia.org/?curid=" + array[i];
        //html += "<a href=\"" + link + "\">";
        html += "<table><tr><td>" + the_title;
        html += "</td></tr>";
        html += "<tr><td>" + the_snippet;
        html += "...</td></tr></table>";
        //html += "</a><br/>";
      }
      $(".table").html(html);
    }
  });
}
