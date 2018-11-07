/* $("DIV").html(VARIABLE); */
var inputArray = [];
var expression;

$('button').click(function(){
  var tmp = $(this).val();
  
  if(tmp == "AC" || tmp == "CE"){
    // clear inputArray.
    inputArray = [];
    $("#answer").html("ANSWER");
    $("#history").html("history");  
  }
  
  if(tmp == "="){
    // Execute value
    expression = eval(expression.join(""));
    console.log(expression);
    $("#answer").html(expression);
    //console.log(solve);
  }
  /*
  if(!isNaN(tmp)){
    inputArray.push($(this).val());
  } */
  // tmp == "AC" || tmp == "CE"
  if(tmp !== "AC" && tmp !== "CE" && tmp !== "="){
    inputArray.push($(this).val());
  }
  
  expression = inputArray;
  $("#history").html(inputArray);  
  //$("#answer").html(expression);  
});
