var current_user = "X";
//TODO:
// Fix bug where the AI just ignores if a space is taken
// and takes that space for itself, no matter what.

var game_table = [0,0,0,
                  0,0,0,
                  0,0,0];
// 0 = empty
// 1 = X
// 2 = O

$('button').click(function(){
  var tmp_id = $(this)[0].id;
  if(tmp_id == "select_users"){
    current_user = $(this).html();
    var removal = document.getElementById("selection");
    removal.parentNode.removeChild(removal);
  }else{
  // check if btn disabled.
    if(game_table[tmp_id] == 0){
      // disables button.
      game_table[tmp_id] = current_user;
      $(this).text(current_user);
      //console.log(tmp_id);
      check_win_condition();
      $('#turn').html("Computer's turn");
      run_ai();
    }else{
      console.log("Can't select this.");
    }
    console.log(game_table);
  }
});

function run_ai(){
  console.log("OH SHIT. IM THE AI.");
  // Calls the proprietary artificial intelligence function
  // to destroy it's enemy (you).
  run_probabilistic_directed_acyclic_graphical_model();
  
  // Check if the computer beat you.
  check_win_condition();
  // It's now your turn
  $('#turn').html("Your turn");
}

function check_win_condition(){
  var c = game_table;
  var winner = false;
  //console.log("Checking...");
  
  // Check if X wins.
  for(var i = 0; i < 2; i++){
    var d = "X";
    if(i == 0){
      d = "X";
    }else if(i == 1){
      d = "O";
    }
    
    if(c[0] == d && c[1] == d && c[2] == d){
      winner = true;
    }else if(c[3] == d && c[4] == d && c[5] == d){
      winner = true;
    }else if(c[6] == d && c[7] == d && c[8] == d){
      winner = true;
    }else if(c[0] == d && c[3] == d && c[6] == d){
      winner = true;
    }else if(c[1] == d && c[4] == d && c[7] == d){
      winner = true;
    }else if(c[2] == d && c[5] == d && c[8] == d){
      winner = true;
    }else if(c[0] == d && c[4] == d && c[8] == d){
      winner = true;
    }else if(c[2] == d && c[4] == d && c[6] == d){
      winner = true;
    }else{ // ok
      if(c.indexOf(0) < 0){
        console.log("TIE");
        current_user = "Noone";
        game_reset();
      }
      // check if all c are filled. If yes, it is a tie.
    }
    if(winner){
      current_user = d;
      console.log(current_user +" wins");
      alert(current_user +" wins");
      game_reset();
      throw new Error("stupidly forcing a stop, because break doesn't work?!");
    }
  }
}

function game_reset(){
  
  // Create a "reset" button and a "X|O wins".
  
  $("#lolhidden").html('['+current_user+" wins]<br />");
  
  var button = document.createElement("button");
  button.innerHTML = "reset";
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(button);
  
  button.addEventListener("click", function(){
    location.reload(true);
  });
}

function refresh_me(){
  location.reload(true);
}

function run_probabilistic_directed_acyclic_graphical_model(){
  var c = game_table;
  var rolling = true;
  var selection;
  var input;
  if(current_user == "X"){
    input = "O"
  }else if(current_user == "O"){
    input = "X";
  }else{
    console.log("SOMETHING WENT HORRIFYINGLY WRONG?!");
  }
  //console.log(input);
  
  var safety_counter = 0;
  //lolwat
  while(rolling){
    selection = Math.floor(Math.random() * 8);
    console.log("selection: " +selection);
    if(c[selection] !== 0){
      selection = Math.floor(Math.random() * 8) - 1;
    }else{
      rolling = false;
      game_table[selection] = input;
      $('#'+selection).text(input);
      console.log("selected: "+selection);
    }
  }
  
  
  console.log(selection);
}
