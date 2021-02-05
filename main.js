//Timer
const timer = document.getElementById('timer');
const title = document.getElementById('clock-title');

const sessions = document.getElementById('session-count');

const clockContainer = document.getElementById('clock-container');

//Controls
const play = document.getElementById('play');
const stopBtn = document.getElementById('stop');

//Tomato chart
const tomatoes = document.getElementById('tomatoes-container');



// const timer = {
//     pomodoro: 25,
//     shortBreak: 5,
//     longBreak: 15,
//     longBreakInterval: 4,
//   };
let interval;
let secondsRemaining = 74;

timer.innerHTML = `<span>01 : 14</span>`;

console.log(secondsRemaining % 60);

const getRemainingTime = (remainder)=>{
  
    const seconds = Math.floor(secondsRemaining % 60);
    const minutes = Math.floor( secondsRemaining / 60);

    return {seconds, minutes}
}


const go = ()=>{
    secondsRemaining--;
    const time = getRemainingTime(secondsRemaining);

    timer.innerHTML = `<span>${time.minutes} : ${time.seconds}</span>`;
        if(secondsRemaining <= 0){
            clearInterval(interval);
        }
}

const startClock = ()=>{

    interval = setInterval(() => {

        go();

      
    }, 1000);
}

const stop = ()=>{
    clearInterval(interval);
    secondsRemaining = 74;
    const time = getRemainingTime(secondsRemaining);
    timer.innerHTML = `<span>${time.minutes} : ${time.seconds}</span>`;

}

stopBtn.addEventListener('click', stop);
play.addEventListener('click', startClock);

