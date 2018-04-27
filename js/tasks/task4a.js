console.log("loaded task4a.js");

var totalClicks = 0;
var dblClicks = 0;
var singleClicks = 0;
var start = 0;
var gindex = 0;
var xx = 0;
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
      // randomizeLabels(rightFolders, wrongFolders);
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
    //
    // console.log("right");
    // console.log(right);
    // console.log("wrong");
    // console.log(wrong);
    // console.log("rA");
    // console.log(rA);

      $("#task_4a #folder_label_1").html("");
      $("#task_4a #folder_label_1").html(rA[0]);
      $("#task_4a #folder_label_2").html("");
      $("#task_4a #folder_label_2").html(rA[1]);
  }

  function registerDblClick(evt){
    dblClicks++;
    var thislabel = $(this).next().html();
    console.log("thislabel: " + thislabel);
    console.log("start: " + start);
    console.log("xx: " + xx);
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
    $('.folder-group').hide();
    $("#selectedWord").hide();
    totalClicks = dblClicks + singleClicks;
    console.log("totalClicks: " + totalClicks);

    console.log(res);
    console.log(rightFolders);

      var dt = [{
        "taskId": "task4a",
        "totalClicks": totalClicks,
        "dblClicks": dblClicks,
        "singleClicks": singleClicks,
        "guesses": JSON.stringify(res),
        "rightAnswers": JSON.stringify(rightFolders),
        "wrongAnswers": JSON.stringify(wrongFolders)
      }];

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
