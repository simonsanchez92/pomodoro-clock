

//Timer
const timer = document.getElementById('timer');
const title = document.getElementById('clock-title');

//Controls
const play = document.getElementById('play');
const stop = document.getElementById('stop');






let deadline = new Date(Date.now() + 1000 * 10);
let remaining = 1000 *  10;

let perf =  performance.now();


const getRemainingTime = (remainder)=>{
    // const milisecondsLeft = deadline - new Date(Date.now());

    const milisecondsLeft = new Date(Date.now() + remainder) - new Date(Date.now());
    const seconds = Math.floor((milisecondsLeft/1000) % 60);
    const minutes = Math.floor( (milisecondsLeft/1000/60) % 60 );

    return {minutes, seconds, milisecondsLeft}
}

console.log(getRemainingTime(remaining));

let timeInterval;
const startClock = ()=>{

    title.innerText = 'Focus!';

   // Initialize the clock - avoid delay
    const time = getRemainingTime(remaining);
    
    timer.innerHTML = `${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}`;


    timeInterval = setInterval(() => {
     
        remaining-= 1000;

        const time = getRemainingTime(remaining);
        timer.innerHTML = `${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}`;
        
        console.log(time)

        if (time.milisecondsLeft < 0) {
          clearInterval(timeInterval);
        //   timer.innerHTML = `00:09`;
          rest();
          }
    }, 1000);

}

const rest = ()=>{
    title.innerText = 'Rest!';
    
    // deadline = new Date(Date.now() + 1000 * 10);
    remaining = 1000 * 10;
    timeInterval = setInterval(() => {
        
        remaining-= 1000;

        const time = getRemainingTime(remaining);
        timer.innerHTML = `${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}`;
     
        if (time.milisecondsLeft < 0) {
          clearInterval(timeInterval);
        //   timer.innerHTML = `00:09`;
        //   deadline = new Date(Date.now() + 1000 * 10);
            remaining = 1000 * 10;
          startClock();
          }
    }, 1000);
}

stop.addEventListener('click', ()=>{
    clearInterval(timeInterval);
    timer.innerHTML = `25:00`;
    title.innerText = 'Ready!';

    // deadline = new Date(Date.now() + 1000 * 60 * 25);
})



play.addEventListener('click', startClock);


