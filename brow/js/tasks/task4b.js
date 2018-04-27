(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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



    var dt = [{
      "taskId": "task4b",
      "totalClicks": totalClicks,
      "dblClicks": dblClicks,
      "singleClicks": singleClicks
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
}

function registerClick(evt){
  totalClicks++;
  singleClicks++;
}

},{}]},{},[1]);
