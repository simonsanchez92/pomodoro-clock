//Timer
const timer = document.getElementById('timer');
const title = document.getElementById('clock-title');

const sessions = document.getElementById('session-count');

const clockContainer = document.getElementById('clock-container');

//Controls
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');

//Tomato chart
const tomatoes = document.getElementById('tomatoes-container');

//Session and break controllers
const addSession = document.getElementById('add-session');
const substractSession = document.getElementById('substract-session');
const sessionLength = document.getElementById("session-length");

const addBreak = document.getElementById('add-break');
const substractBreak = document.getElementById('substract-break');
const breakLength = document.getElementById("break-length");



let timers = {
    pomodoro: 1 * 60,
    session: 1 * 60,
    break: 5 * 60
}

let isRunning = false;

window.onload = ()=>{
    sessionLength.textContent = timers.session / 60;
    breakLength.textContent = timers.break / 60;

   let timeLeft= getRemainingTime(timers.session);
    timer.innerHTML = `<span>${timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}</span>`;
 

}


addSession.addEventListener('click', ()=>{
    if((timers.session /60) < 60){
        timers.session+=60;
        let timeLeft= getRemainingTime(timers.session);

        sessionLength.textContent = timeLeft.minutes;
    }
    
});

substractSession.addEventListener('click', ()=>{
    if((timers.session /60) > 1){
        timers.session-=60;

        let timeLeft= getRemainingTime(timers.session);

        sessionLength.textContent = timeLeft.minutes;
    }
});

addBreak.addEventListener('click', ()=>{
    if((timers.break / 60) < 60){
        timers.break+=60;

        let timeLeft= getRemainingTime(timers.break);

        breakLength.textContent = timeLeft.minutes;
    
    }
});

substractBreak.addEventListener('click', ()=>{
    if((timers.break / 60) > 1){
        timers.break-=60;
        let timeLeft= getRemainingTime(timers.break);

        breakLength.textContent = timeLeft.minutes;
    }
});












let interval;


const getRemainingTime = (timeLeft)=>{
  
    // let remaining = timeLeft * 60;

    const seconds = Math.floor(timeLeft % 60);
    const minutes = Math.floor( timeLeft / 60);

    return {seconds, minutes}
}


const go = ()=>{
    
  
        if(timers.pomodoro <= 0){

            timers.break--;
            const timeLeft = getRemainingTime(timers.break);
            timer.innerHTML = `<span>${timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}</span>`;
            
            title.textContent = "Rest...";

            // if(timeLeft.seconds <= 0){
            //     timers.pomodoro = timers.session * 60;
            //     // clearInterval(interval);
            //     // isRunning = false;
            // }
        }else{
            timers.pomodoro--;
            const timeLeft = getRemainingTime(timers.pomodoro);
            timer.innerHTML = `<span>${timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}</span>`;
            title.textContent = "Go!";
            
            // if(timeLeft.seconds <= 0){
            //     clearInterval(interval);
            //     isRunning = false;
            // }
        }

      

 
 
    // secondsRemaining--;
    // const time = getRemainingTime(secondsRemaining);


}


//When play button is pressed...

const startClock = ()=>{
    // playBtn.disabled = true;
    interval = setInterval(() => {
        if(timers.break <= 0){
            timers.break = +breakLength.textContent;
            timers.pomodoro = 7;
        }
        go();

      
    }, 1000);
}

const stop = ()=>{
   
    clearInterval(interval);
    timers.pomodoro = timers.session;
    const timeLeft = getRemainingTime(timers.pomodoro);

    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    title.textContent = "Ready?";

    timer.innerHTML = `<span>${timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}</span>`;
    isRunning = false;


}



stopBtn.addEventListener('click', stop);

playBtn.addEventListener('click', ()=>{
  
  
    if(isRunning ){
        clearInterval(interval);
        title.textContent = "Paused"

        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
      
        isRunning = false;
       

    }else{
        title.textContent = "Go!"

        playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
        isRunning = true;
        startClock();
        console.log(isRunning)
        
    }

});

