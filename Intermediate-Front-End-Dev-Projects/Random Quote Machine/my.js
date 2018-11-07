$(document).ready(function(){
  var quoteToShare = "";
  $("#newQuote").on("click", function(){
  // Clears current div
    $('.quote').empty();
  // Open json file
    $.getJSON("https://gist.githubusercontent.com/JohannesHoppe/e364206e1d149e8816ea14dafe2ae43f/raw/2b1f760e11b8c65d57ca7f06728e0234a81b906a/quotes.json",
             function(json){
      var quoteToPlace = "";
      // Generate random number
      var num = Math.floor((Math.random() * 50) + 1);
      // Select quote based on that random number.
      quoteToPlace += json.quotes[num].text;
      quoteToPlace += " - " +json.quotes[num].author;
      //console.log(quoteToPlace);
      quoteToShare = quoteToPlace;
      $(".quote").html(quoteToPlace);
    });
    // https://pastebin.com/raw/8PznRpXv
  });
  $(".twitter-share-button").on("click", function(){
    // Get text inside quote
    //console.log(quoteToShare);
    $(this).attr("href", 'https://twitter.com/intent/tweet?text=' + quoteToShare);
  });
});
