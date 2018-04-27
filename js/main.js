console.log("main.js loaded");

//hide all elements
hideAllButtons();

function hideAllButtons(){
  //Hide elements
  $('#nextSession').hide();
  $('#endSession').hide();
  $('#sessionA').hide();
  $('#sessionB').hide();
}

//Shuffles and creates tasks
function createTasks(evt){
  var setA = ["1a", "2a", "3a", "4a", "5a"];
  var setB = ["1b", "2b", "3b", "4b", "5b"];
  var randomSet = [];

  setA.sort(function() { return 0.5 - Math.random() });
  setB.sort(function() { return 0.5 - Math.random() });

  for(var i = 0; i <= 4; i++){
    var choseSet = Math.floor((Math.random() * 2) + 1);

    if(choseSet == 1){
      randomSet[i] = "task_" + setA[i];
      randomSet[i + 5] = "task_" + setB[i];
    }else if(choseSet == 2){
      randomSet[i] = "task_" + setA[i];
      randomSet[i + 5] = "task_" + setB[i];
    }
  }
    console.log(randomSet);

    window.setTimeout(function(){
      loadTasks(randomSet);
    }, 100);
    window.setTimeout(function(){
      $('#nextSession').show();
    }, 1000);
}

//Loads the task in its corresponding section
function loadTasks(arr){
  //scrolls the body to the task sections
  $("html, body").animate({
        scrollTop: $("header").outerHeight() - $("nav").outerHeight()
    }, 1000);

  //loads the tasks
  for(var ind = 0; ind < arr.length; ind++){
    $("#task" + (ind + 1)).load("../components/" + arr[ind] + ".html #" + arr[ind]);
  }
    $('#sessionA').show();
}

//Loads next session of tasks
function loadNextSession(evt){
  $('#sessionA').hide();
  $('#nextSession').hide();
  $('#startTest').hide();

    //scrolls the body to the task sections
    $("html, body").animate({
          scrollTop: $("header").outerHeight() - $("nav").outerHeight()
      }, 1000);

  $('#sessionB').show();
  $('#endSession').show();
}

//Finishes the test
function endSession(evt){
  //hide all elements
  hideAllButtons();
  //scrolls the body to the task sections
  $("html, body").animate({
        scrollTop: 0
  }, 1000);

  endSessionMsg("Thank you for your cooperation!");
}

function endSessionMsg(msg){
  $("#endMsg").html(msg);
}
