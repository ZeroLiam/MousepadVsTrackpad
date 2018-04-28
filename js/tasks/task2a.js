console.log("loaded task2a.js");
var overTimes = 0;
var outTimes = 0;
var msePx = 0;
var msePy = 0;
var stPoint = 0;
var timerMeasure = 0;
var tim;

if ($("#task_2a").length > 0) {
  $("#cwloops").html(stPoint);

  $("#circle-area1").mouseenter(function() {
      overTimes++;
    })
    .mouseleave(function() {
      outTimes++;
    });

  $("#cw-counter").mouseenter(function() {
    outTimes++;
  });


  $("#cwStpoint").mouseenter(function(evt) {

    var y = evt.pageY - $('#cwStpoint').offset().top;

    if(y >= 10){
      stPoint++;
      $("#cwloops").html(stPoint);

      if (stPoint == 1) {
        tim = setInterval(function() {
          runTimer(10)
        }, 10);
      }

      if (stPoint == 4) {
        finishTask();
      }
    }
  });

}

function finishTask() {
  $("#dirCW, #circle-area1").remove();

    $("#cwdone").css("color", "#ee0979");

  var dt = {
    "taskId": "task2a",
    "onArea": overTimes,
    "outArea": outTimes,
    "time_completed": timerMeasure
  };

  console.log(dt);

  $.ajax({
    url: 'http://localhost:3000/components/save_json.php',
    method: "POST",
    dataType: 'json',
    data: {
      'data': JSON.stringify(dt)
    },
    success: function(res) {
      console.log(res);
    },
    failure: function(err) {
      console.log(err);
    }
  });
}

function runTimer(val) {
  timerMeasure += val;
}
