(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
console.log("loaded task4a.js");

var totalClicks = 0;
var dblClicks = 0;
var singleClicks = 0;
var start = 0;
var gindex = 0;
var timerMeasure = 0;
var tim;
var foldergroupA = ["cars", "cows", "red", "wallets", "shoes"];
var foldergroupB = ["dogs", "pie", "blue", "door", "flowers"];
var rightFolders= [];
var wrongFolders= [];
var labels = [];
var guesses = [];

//check if our div is present
  if($("#task_4a").length > 0){
    $("#folder_area_1").on('dblclick', registerDblClick);
    $("#folder_area_1").on('click', registerClick);
    $("#folder_area_2").on('dblclick', registerDblClick);
    $("#folder_area_2").on('click', registerClick);

    createFolders();
  }

  //Shuffles and creates tasks
  function createFolders(){

    foldergroupA.sort(function() { return 0.5 - Math.random() });
    foldergroupB.sort(function() { return 0.5 - Math.random() });

    for(var i = 0; i <= 4; i++){
      var choseSet = Math.floor((Math.random() * 2) + 1);

      if(choseSet == 1){
        rightFolders[i] = foldergroupA[i];
        wrongFolders[i] = foldergroupB[i];
      }else if(choseSet == 2){
        rightFolders[i] = foldergroupB[i];
        wrongFolders[i] = foldergroupA[i];
      }
    }
      console.log(rightFolders);
      console.log(wrongFolders);
      randomizeLabels(rightFolders, wrongFolders);
      updateLabels(rightFolders, wrongFolders);
  }

  function randomizeLabels(right,wrong){
    labels = right.concat(wrong);
    labels.sort(function() { return 0.5 - Math.random() });

    console.log(labels);
  }

  function updateLabels(right,wrong){
    var pos = Math.floor((Math.random() * 2) + 1);
    var rA = [right[start], wrong[start]];
    rA.sort(function() { return 0.5 - Math.random() });
    $("#selectedWord").html("");
    $("#selectedWord").html(right[start]);

      $("#task_4a #folder_label_1").html("");
      $("#task_4a #folder_label_1").html(rA[0]);
      $("#task_4a #folder_label_2").html("");
      $("#task_4a #folder_label_2").html(rA[1]);
  }

  function registerDblClick(evt){
    dblClicks++;

    if(dblClicks == 1){
        tim = setInterval(function(){ runTimer(10) }, 10);
    }
    var thislabel = $(this).next().html();
    console.log("thislabel: " + thislabel);
    console.log("start: " + start);
    console.log("rightFolders[start]: " + rightFolders[start]);

      if(thislabel == rightFolders[start]){
        guesses[start] = true;
      }else{
        guesses[start] = false;
      }

      if(start == 4){
        finishTask(guesses);
      }else{
        start++;
        updateLabels(rightFolders, wrongFolders);
      }

  }

  function finishTask(res){
    clearInterval(tim);
    console.log("time completed: " + timerMeasure);
    $('.folder-group').hide();
    $("#selectedWord").hide();
    totalClicks = dblClicks + singleClicks;

    console.log(res);
    console.log(rightFolders);

      var dt = {
        "taskId": "task4a",
        "totalClicks": totalClicks,
        "dblClicks": dblClicks,
        "singleClicks": singleClicks,
        "time_completed": timerMeasure,
        "guesses": res,
        "rightAnswers": rightFolders,
        "wrongAnswers": wrongFolders
      };

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

  function registerClick(evt){
    singleClicks++;
  }

  function runTimer(val){
    timerMeasure += val;
  }

},{}]},{},[1]);
