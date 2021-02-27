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
    pomodoro: 1,
    session: 1 ,
    break: 5,
    long: 2,
    rounds: 0
}

let isRunning = false;
let sessionLeft = timers.session * 60;
let breakLeft = timers.break * 60;
let longBreakLeft = timers.long * 60;


window.onload = ()=>{
    sessionLength.textContent = timers.session ;
    breakLength.textContent = timers.break ;

   let timeLeft= getRemainingTime(timers.session * 60);
    timer.innerHTML = `<span>${timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}</span>`;

   sessions.textContent = `${timers.rounds}/4`

}





let interval;


const getRemainingTime = (timeLeft)=>{
  
     let remaining = timeLeft;

    const seconds = Math.floor(remaining % 60);
    const minutes = Math.floor( remaining / 60);

    return {seconds, minutes}
}


const go = (mode)=>{
    
    
    if(mode == "break"){
        const timeLeft = getRemainingTime(breakLeft);
        console.log(timeLeft)
        timer.innerHTML = `<span>${timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}</span>`;
        
        title.textContent = "Rest...";
    }

    if(mode == "session"){
        const timeLeft = getRemainingTime(sessionLeft);
        timer.innerHTML = `<span>${timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}</span>`;
        title.textContent = "Go!";
    }

    if(mode == "longBreak"){
        const timeLeft = getRemainingTime(longBreakLeft);
        timer.innerHTML = `<span>${timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}</span>`;
        title.textContent = "Long break";
    }
       
        
    }




//When play button is pressed...

const startClock = ()=>{

    interval = setInterval(() => {
      
        if(sessionLeft <= 0){

            if(timers.rounds == 4){
                go("longBreak");
                longBreakLeft--;

                if(longBreakLeft <=0){
                tomatoes.innerHTML = '';

                    sessionLeft = timers.session * 60;
                    longBreakLeft = timers.long * 60;

                    timers.rounds = 0;
                    sessions.textContent = `${timers.rounds}/4`;
                     clockContainer.classList.remove('rest');

                }
            }else{
                go("break");
                breakLeft--;
    
                if(breakLeft <=0){
                    sessionLeft = timers.session * 60;
                  clockContainer.classList.remove('rest');

                }
            }

           
        }else{
            go("session");
            sessionLeft--;

            if(sessionLeft <=0){
                timers.rounds++;
                sessions.textContent = `${timers.rounds}/4`;
                tomatoes.innerHTML += `<div class='tomato'><img src='./img/tomato.png'/></div>`;

                breakLeft = timers.break * 60;
                clockContainer.classList.add('rest');
            }
        }

      
    }, 100);

 
}

const stop = ()=>{

    clearInterval(interval);
    sessionLeft = timers.session * 60;
    breakLeft = timers.break * 60;
    const timeLeft = getRemainingTime(sessionLeft);

    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    title.textContent = "Ready?";

    timer.innerHTML = `<span>${timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? '0'+timeLeft.seconds : timeLeft.seconds}</span>`;
    
    timers.rounds = 0;
    sessions.textContent = `${timers.rounds}/4`
    
    isRunning = false;
    clockContainer.classList.remove('rest');
    
    clockContainer.classList.remove('animate');


}



stopBtn.addEventListener('click', stop);

playBtn.addEventListener('click', ()=>{
    if(isRunning ){
        clearInterval(interval);
        title.textContent = "Paused"

        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
      
        isRunning = false;
        clockContainer.classList.remove('animate');
       

    }else{
        title.textContent = "Go!"

        playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
        isRunning = true;
        startClock();
        clockContainer.classList.add('animate');
        
    }

});

addSession.addEventListener('click', ()=>{
    if(timers.session  < 60){
        timers.session++;
        sessionLength.textContent = timers.session;
    }
    
});

substractSession.addEventListener('click', ()=>{
    if(timers.session > 1){
        timers.session--;
        sessionLength.textContent = timers.session;

    }
});

addBreak.addEventListener('click', ()=>{
    if(timers.break < 20){
        timers.break++;
        breakLeft = timers.break * 60
        breakLength.textContent =  timers.break;

    }
});

substractBreak.addEventListener('click', ()=>{
    if(timers.break  > 1){
        timers.break--;
        breakLeft = timers.break * 60
        breakLength.textContent =  timers.break;
    }
  
});

