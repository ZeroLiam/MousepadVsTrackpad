console.log("loaded task1a.js");
var totalClicks = 0;
var wrongClicks = 0;
var rightClicks = 0;
var timerMeasure = 0;
var tim;
$("#sq1").hide();

if($("#task_1a").length > 0){
  $("#sq1").css('top', 0 + "px");
  $("#sq1").css('left', 0 + "px");
  $("#sq1").show();
  $("#square-ring").on('click', wrongClick);
  $("#sq1").on('click', rightClick);
}

function randomizeSquares(){
  var ranh = Math.floor((Math.random() * (450 - 80)) + 1);
  var ranw = Math.floor((Math.random() * (650 - 110)) + 1);
  $("#sq1").css('top', ranh + "px");
  $("#sq1").css('left', ranw + "px");

  var position = $("#sq1").position();

  console.log("$(#sq1) top: " + position.top);
  console.log("$(#sq1) left: " + position.left);
}

function wrongClick(evt){
  wrongClicks++;
  checkTaskLifespan();
  randomizeSquares();
  console.log($(this));

  totalClicks++;
}

function rightClick(evt){
  rightClicks++;
  checkTaskLifespan();
  randomizeSquares();
  console.log($(this));

  totalClicks++;
}

function finishTask(){
  $("#sqdone").css("color", "#ee0979");
  $("#sq1").hide();
  $("#square-ring").off('click', wrongClick);
  $("#sq1").off('click', rightClick);

  clearInterval(tim);

  var dt = {
    "taskId": "task1a",
    "totalClicks": totalClicks,
    "rightClicks": rightClicks,
    "wrongClicks": wrongClicks,
    "time_completed": timerMeasure
  };

  console.log(dt);

  $.ajax
      ({
          url: 'http://localhost:3000/components/save_json.php',
          method: "POST",
          dataType : 'json',
          data: {'data' : JSON.stringify(dt)},
          success: function (res) {console.log(res); },
          failure: function(err) {console.log(err);}
      });
}

function checkTaskLifespan(){
  if(totalClicks == 1){
    tim = setInterval(function(){ runTimer(10) }, 10);
  }

  if(rightClicks == 10){
    finishTask();
  }
}

function runTimer(val){
    timerMeasure += val;
  }
