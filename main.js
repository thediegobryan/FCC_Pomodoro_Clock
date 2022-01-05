const breakLength = document.getElementById("break-length");
const breakDecrement = document.getElementById("break-decrement");
const breakIncrement = document.getElementById("break-increment");
const timeLeft = document.getElementById("time-left");
const startStop = document.getElementById("start_stop");
const reset = document.getElementById("reset");
const sessionLength = document.getElementById("session-length");
const sessionDecrement = document.getElementById("session-decrement");
const sessionIncrement = document.getElementById("session-increment");
const timerLabel = document.getElementById("timer-label");
const audioClip = document.getElementById("beep");


////////////////////////////////////
//default states
////////////////////////////////////
let breakValue = 5;
let sessionValue = 25;
let clockTime = sessionValue * 60; //ClockTime is in SECONDS
let startTimer = false; //StartTimer indicates if timer is on
let loopStatus =  "Session"; //loop status will indicate if break or session is running if timer is on


//Break Adjustment Buttons
function breakAdjustment(value){
    if(breakValue < 60 && breakValue > 1){
        breakValue = breakValue + value;
        breakLength.innerText = breakValue;
    } else if (breakValue == 60 && value < 0){
        breakValue = breakValue + value;
        breakLength.innerText = breakValue;
    } else if (breakValue == 1 && value > 0){
        breakValue = breakValue + value;
        breakLength.innerText = breakValue;
    }
    if(loopStatus == "Break" && startTimer == false){
        clockTime = breakValue * 60;
        formatTime(clockTime);
    }
}

//Session adjustment Buttons
function sessionAdjustment(value){
    if(sessionValue < 60 && sessionValue > 1){
        sessionValue = sessionValue + value;
        sessionLength.innerText = sessionValue;
    } else if (sessionValue == 60 && value < 0){
        sessionValue = sessionValue + value;
        sessionLength.innerText = sessionValue;
    } else if (sessionValue == 1 && value > 0){
        sessionValue = sessionValue + value;
        sessionLength.innerText = sessionValue;
    }
    if(loopStatus == "Session" && startTimer == false){
        clockTime = sessionValue * 60;
        formatTime(clockTime);
    }
}

//function to format the time in the Display
function formatTime(time){
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    timeLeft.innerText = (minutes < 10 ? "0" + minutes: minutes) + ":" + (seconds < 10 ? "0" + seconds: seconds);
}

//Reset Button function
function resetButton(){
    breakValue = 5;
    breakLength.innerText = breakValue;
    sessionValue = 25;
    sessionLength.innerText = sessionValue;
    clockTime = sessionValue * 60;
    formatTime(clockTime);
    startTimer = false;
    loopStatus =  "Session";
    timerLabel.innerText = "Session";
    audioClip.pause();
    audioClip.currentTime = 0;
}

var start = Date.now();
setInterval(function() {
    var delta = Date.now() - start; // milliseconds elapsed since start
    if(delta >= 1000){
        start = Date.now();
        if(startTimer == true){
            runningClock();
        }
    }
}, 50); // update very frequently

//clock logic
function runningClock(){
    if(loopStatus == "Session" && clockTime > 0){
        clockTime -= 1;
        formatTime(clockTime);
        if(clockTime == 0){
            audioClip.play();
        }
    } else if (loopStatus == "Session" && clockTime == 0){
        clockTime = breakValue * 60;
        formatTime(clockTime);
        timerLabel.innerText = "Break";
        loopStatus = "Break";
    } else if(loopStatus == "Break" && clockTime > 0){
        clockTime -= 1;
        formatTime(clockTime)
        if(clockTime == 0){
            audioClip.play();
        }
    } else if (loopStatus == "Break" && clockTime == 0){
        clockTime = sessionValue * 60;
        formatTime(clockTime);
        timerLabel.innerText = "Session";
        loopStatus = "Session";
    } 
}

function startButton(){
    startTimer =  !startTimer;
    //console.log(startTimer);
    start = Date.now();
}