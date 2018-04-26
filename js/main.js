console.log("main.js loaded");
// var setA = ["1a", "2a", "3a", "4a", "5a"];
// var setB = ["1b", "2b", "3b", "4b", "5b"];
// var randomSet = [];
//
//     window.setTimeout(function(){
//       // tasks.sort(function() { return 0.5 - Math.random() });
//       setA.sort(function() { return 0.5 - Math.random() });
//       setB.sort(function() { return 0.5 - Math.random() });
//
//       for(var i = 0; i <= 4; i++){
//         var choseSet = Math.floor((Math.random() * 2) + 1);
//
//         if(choseSet == 1){
//           randomSet[i] = setA[i];
//           randomSet[i + 5] = setB[i];
//         }else if(choseSet == 2){
//           randomSet[i] = setA[i];
//           randomSet[i + 5] = setB[i];
//         }
//       }
//         console.log(randomSet);
//     },1000);

$(document).ready(function(){
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
    }, 2000);

    // $("#task1a").load("../components/task1.html #task-1a");
    // $("#task2a").load("../components/task2.html #task-2a");
});

function loadTasks(arr){
  // console.log("#" + arr[0]);
  // $("#task1" ).load("../components/task_1a.html #task_1a");
  for(var ind = 0; ind < arr.length; ind++){
    $("#task" + (ind + 1)).load("../components/" + arr[ind] + ".html #" + arr[ind]);
  }
}
