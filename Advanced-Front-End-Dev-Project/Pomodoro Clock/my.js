var started = false;
var session_length = 25;
var break_length = 5;
var set_type = "session";

function countdown(minutes) {
      var seconds = 60;
      var mins = minutes
      function tick() {
        if(!started){
           return false;
        }
          var counter = document.getElementById("current_time");
          var current_minutes = mins-1
          seconds--;
          counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
          if( seconds > 0 ) {
              var escape = setTimeout(tick, 1000);
          } else {
              if(mins > 1){
                  countdown(mins-1);           
              }
          }
        if(counter.innerHTML == "0:00"){
          if(set_type == "session"){
            $('#set_type').html("break:");
            $('#current_time').html(break_length);
            set_type = "break";
          }else{
            $('#set_type').html("session:");
            $('#current_time').html(session_length);
            set_type = "session";
          }
        }
      }
      tick();
}

function start(){
  started = true;
  if(set_type == "session"){
    countdown(session_length);
  }else{
    countdown(break_length);
  }
}

function stop(){
  started = false;
  return;
}

$('button').click(function(){
  var tmp_val = $(this).val();
  var tmp_id = $(this)[0].id;
    
  if(tmp_id == "break"){
    if(tmp_val == "+"){
      // turn up session length
      console.log("increasing session time");
      break_length += 1;
      $('#break_length').html(break_length);
    }else{
      // turn down session length
      if(break_length > 1){
        break_length -= 1;
        console.log("decreasing break time");
        $('#break_length').html(break_length);
      }else{
        console.log("cannot go lower than 1");
      }
    }
  }else if(tmp_id == "session"){
    if(tmp_val == "+"){
      // turn up session length
      console.log("increasing session time");
      session_length += 1;
      $('#session_length').html(session_length);
      $('#current_time').html(session_length);
    }else{
      // turn down session length
      if(session_length > 1){
        session_length -= 1;
        console.log("decreasing session time");
        $('#session_length').html(session_length);
        $('#current_time').html(session_length);
      }else{
        console.log("cannot go lower than 1");
      }
    }
  }else if(tmp_id == "current"){
    if(!started){
      // not started.
      $('#current').html("Pause");
      start();
    }else{
      $('#current').html("Start");
      stop();
    }
  }
});
