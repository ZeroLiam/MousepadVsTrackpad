var fs = require('fs');

console.log("loaded task4b.js");
var totalClicks = 0;
var dblClicks = 0;
var singleClicks = 0;

//check if our div is present
  if($("#task_4b").length > 0){
    $("#balloon").on('dblclick', registerDblClick);
    $("#balloon").on('click', registerClick);
  }

function registerDblClick(evt){
  console.log($(this).outerHeight());
  console.log($(this).outerWidth());

  dblClicks++;
  var increase = 50;
  $(this).css("height", $(this).outerHeight() + increase + "px");
  $(this).css("width", $(this).outerWidth() + increase + "px");
  totalClicks++;

  if($(this).outerHeight() >= 450){
    $(this).hide();
    console.log("totalClicks: " + totalClicks);
    console.log("dblClicks: " + dblClicks);
    console.log("singleClicks: " + singleClicks);
  }
}

function registerClick(evt){
  totalClicks++;
  singleClicks++;
}
