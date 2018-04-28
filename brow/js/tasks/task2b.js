(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
console.log("loaded task2b.js");
var overTimes = 0;
var outTimes = 0;
var msePx = 0;
var msePy = 0;
var stPoint = 0;
var timerMeasure = 0;
var tim;

if ($("#task_2b").length > 0) {
  $("#ccwloops").html(stPoint);

  $("#circle-area2").mouseenter(function() {
      overTimes++;
    })
    .mouseleave(function() {
      outTimes++;
    });

  $("#ccw-counter").mouseenter(function() {

    outTimes++;
  });


  $("#ccwStpoint").mouseenter(function(evt) {

    var y = evt.pageY - $('#ccwStpoint').offset().top;

    if(y <= 10){
      stPoint++;
      $("#ccwloops").html(stPoint);

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
  $("#dirCCW, #circle-area2").remove();

  $("#ccwdone").css("color", "#ee0979");

  var dt = {
    "taskId": "task2b",
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

},{}]},{},[1]);
