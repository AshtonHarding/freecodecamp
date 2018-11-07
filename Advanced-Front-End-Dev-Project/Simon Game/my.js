var strict = false; //on\off
var game = false; //on\off
var started = false; //on\off
var user_time = false; 
var counter = 1;
var user_round = 0;

var sound_clip = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
                  'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
                  'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
                  'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];

//TODO: Add sound for when user clicks
//TODO: Add sound for computer clicks

var computer_selection = [];
/* 0 = green, 1 = red, 2 = yellow, 3 = blue. */
var user_selection = [];

$('button').click(function(){
  var tmp_id = $(this)[0].id;
  if(tmp_id == "strict"){
    update_strict();
  }else if(tmp_id == "turnOnOff"){
    update_game();
  }
  
  if(tmp_id == "restart"){
    refresh_me();
  }
  
  /* ? */
  if(game && !user_time){
    if(tmp_id == "begin"){
      started = true;
      play_mode();
    }
  }
  if(game && started && user_time){
    if(tmp_id == "red"){
      new Audio(sound_clip[1]).play();
      user_selection.push(1);
      // CHECK FIRST
      setTimeout(check_user(1), 500);
//      check_user(1);
    }else if(tmp_id == "green"){
      new Audio(sound_clip[0]).play();
      user_selection.push(0);
      setTimeout(check_user(0), 500);
    }else if(tmp_id == "yellow"){
      new Audio(sound_clip[2]).play();
      user_selection.push(2);
      setTimeout(check_user(2), 500);
    }else if(tmp_id == "blue"){
      new Audio(sound_clip[3]).play();
      user_selection.push(3);
      setTimeout(check_user(3), 500);
    }
  }
  
});

function update_strict(){
  if(strict){
    strict = false;
    $('#strict').html("Off");
    document.getElementById("strict").style.background = "#c00";
  }else{
    strict = true;
    $('#strict').html("On");
    document.getElementById("strict").style.background = "#0c0";
  }
}

function update_game(){
  if(game){
    game = false;
    document.getElementById("turnOnOff").style.background = "#c00";
    $('#turnOnOff').html("Off");
  }else{
    game = true;
    document.getElementById("turnOnOff").style.background = "#0c0";
    $('#turnOnOff').html("On");
  }
}

/* play mode */
// select colors, randomly.
// wait for user to push the correct order.
function play_mode(){
  // reset user input
  user_round = 0;
  user_selection = [];
  // Generate next color.
  new_val = Math.floor(Math.random() * 4);
  computer_selection.push(new_val);
  console.log(computer_selection);
  var i = 0;
  var interval = setInterval(function(){
    animate_me(computer_selection[i], 1);
    i++;
    if(i >= computer_selection.length){
      clearInterval(interval);
    }
  }, 600);
  // Now for the user to select.
  $('#counter').html(counter);
  counter++
  user_time = true;
}


function animate_me(color, x){
  if(color === 0){
    new Audio(sound_clip[color]).play();
    $('#green').delay(400 * x)
    .animate({opacity: 0.1}, 200)
    .animate({opacity: 1}, 200);
  }
  if(color == 1){
    new Audio(sound_clip[color]).play();
    $('#red').delay(400 * x)
    .animate({opacity: 0.1}, 200)
    .animate({opacity: 1}, 200);
  }
  if(color == 2){
    new Audio(sound_clip[color]).play();
    $('#yellow').delay(400 * x)
    .animate({opacity: 0.1}, 200)
    .animate({opacity: 1}, 200);
  }
  if(color == 3){
    new Audio(sound_clip[color]).play();
    $('#blue').delay(400 * x)
    .animate({opacity: 0.1}, 200)
    .animate({opacity: 1}, 200);
  }
}


function check_user(color){
  var correct = true;
  
  
  if(user_selection[user_round] == undefined){
    // fixes a bug where it becomes a single variable.
    user_selection[user_round].push(user_selection);
  }
  if(user_selection[user_round] !== computer_selection[user_round]){
    if(strict){
      alert("As you were in strict mode, upon making a mistake: You lose, the game is now fully reset.");
      refresh_me();
    }
    console.log("WRONG");
    user_selection = [];
    user_round = 0;
    play_pattern_again();
  }else{
    
    if(user_round+1 == computer_selection.length){
      if(user_round+1 == 20){
        console.log("YOU WIN");
        if(strict){
          alert("Nice! You won on strict mode!");
        }else{
          alert("Nice job! Now try it on strict mode!");
        }
        refresh_me();
      }
      user_time = false;
      play_mode();
      console.log("on");
    }
    user_round++;
  }
}

function play_pattern_again(){
    var i = 0;
    var interval = setInterval(function(){
      animate_me(computer_selection[i], 1);
      i++;
      if(i >= computer_selection.length){
        clearInterval(interval);
      }
    }, 600);
  
}

function check_win_condition(){
  var win = true;
  if(user_selection.length == 20){
    for(var x = 0; x <= 20; x++){
      if(user_selection[i] !== computer_selection[i]){
        win = false;
      }
    }
    if(win){
      you_win();
    }else{
      console.log("loser");
    }
  }
}

function you_win(){
  alert("You win!");
}

function refresh_me(){
  location.reload(true);
}
