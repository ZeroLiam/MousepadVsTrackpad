console.log("loaded task1b.js");

var totalClicks = 0;
var wrongClicks = 0;
var rightClicks = 0;
var timerMeasure = 0;
var tim;
$("#sq2").hide();

if($("#task_1b").length > 0){
  $("#sq2").css('top', 0 + "px");
  $("#sq2").css('left', 0 + "px");
  $("#sq2").show();
  $("#square-ring2").on('click', wrongClick);
  $("#sq2").on('click', rightClick);
}

function randomizeSquares(){
  var ranh = Math.floor((Math.random() * (450 - 80)) + 1);
  var ranw = Math.floor((Math.random() * (650 - 110)) + 1);
  $("#sq2").css('top', ranh + "px");
  $("#sq2").css('left', ranw + "px");

  var position = $("#sq2").position();

  console.log("$(#sq2) top: " + position.top);
  console.log("$(#sq2) left: " + position.left);
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
  $("#sqdone2").css("color", "#ee0979");
  $("#sq2").hide();
  $("#square-ring2").off('click', wrongClick);
  $("#sq2").off('click', rightClick);

  clearInterval(tim);

  var dt = {
    "taskId": "task1b",
    "totalClicks": totalClicks,
    "rightClicks": rightClicks,
    "wrongClicks": wrongClicks
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
