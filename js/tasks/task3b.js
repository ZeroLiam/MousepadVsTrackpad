"use strict";
console.log("loaded task3b.js");

if($("#task_3b").length > 0){
    drawvolumecontroller(20,35,8);
}
//length: how many bars
//height: height of the tallest bar
//nowselected: which bar is selected
function drawvolumecontroller(length,height,nowselected){
    document.getElementById("volumcontroller").innerHTML = "";
    for (var i=0;i<length;i++){
        var magassag;
        magassag = 7 + Math.round((1.4)*(length - i)); //where 40 is the container height
        var margintop;
        margintop = height-magassag;
        if (margintop <= 0) {margintop=0;}
        if (i >= nowselected){		//background-color valtozik ameddig epp ki van jelolve
            document.getElementById("volumcontroller").innerHTML = document.getElementById("volumcontroller").innerHTML+'<div  onmouseup="volumeControlChanged('+i+')" style="background-color:#898989;height:'+magassag+'px;margin-top:'+margintop+'px;" class="volumecontrollerbar"></div>';
        } else {
            document.getElementById("volumcontroller").innerHTML = document.getElementById("volumcontroller").innerHTML+'<div  onmouseup="volumeControlChanged('+i+')" style="height:'+magassag+'px;margin-top:'+margintop+'px;" class="volumecontrollerbar"></div>';
        }
    }
}

function volumeControlChanged(newVolume){
    drawvolumecontroller(20,35,newVolume);
    document.getElementById("volumeindicator").innerHTML = newVolume;
//	alert(newvolume);
}
