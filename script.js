

//Timer
const timer = document.getElementById('timer');
const title = document.getElementById('clock-title');

//Controls
const play = document.getElementById('play');
const stop = document.getElementById('stop');






let deadline = new Date(Date.now() + 1000 * 10);

const getRemainingTime = ()=>{
    const milisecondsLeft = deadline - new Date(Date.now());
    const seconds = Math.floor((milisecondsLeft/1000) % 60);
    const minutes = Math.floor( (milisecondsLeft/1000/60) % 60 );

    return {minutes, seconds, milisecondsLeft}
}



let timeInterval;
const startClock = ()=>{

    title.innerText = 'Focus!';

   // Initialize the clock - avoid delay
    const time = getRemainingTime();
    timer.innerHTML = `${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}`;


    timeInterval = setInterval(() => {

        const time = getRemainingTime();
        timer.innerHTML = `${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}`;
        console.log(time)

        if (time.milisecondsLeft < 0) {
          clearInterval(timeInterval);
          timer.innerHTML = `00:09`;
          rest();
          }
    }, 1000);

}

const rest = ()=>{
    title.innerText = 'Rest!';
    
    deadline = new Date(Date.now() + 1000 * 10);

    timeInterval = setInterval(() => {

        const time = getRemainingTime();
        timer.innerHTML = `${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}`;
     
        if (time.milisecondsLeft < 0) {
          clearInterval(timeInterval);
          timer.innerHTML = `00:09`;
          deadline = new Date(Date.now() + 1000 * 10);

          startClock();
          }
    }, 1000);
}

stop.addEventListener('click', ()=>{
    clearInterval(timeInterval);
    timer.innerHTML = `25:00`;
    title.innerText = 'Ready!';

    deadline = new Date(Date.now() + 1000 * 60 * 25);
})



play.addEventListener('click', startClock);


