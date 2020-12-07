

//Timer
const timer = document.getElementById('timer');
const title = document.getElementById('clock-title');

const clockContainer = document.getElementById('clock-container');

//Controls
const play = document.getElementById('play');
const stop = document.getElementById('stop');

//Tomato chart
const tomatoes = document.getElementById('tomatoes-container');

const sessions = document.getElementById('session-count');




let remaining = 1000 * 5;
let sessionCount = 0;




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
    clockContainer.classList.add('animate');
   // Initialize the clock - avoid delay
    const time = getRemainingTime(remaining);
    
    timer.innerHTML = `<span>${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}</span>`;


    timeInterval = setInterval(() => {
     
        remaining-= 1000;

        const time = getRemainingTime(remaining);
        timer.innerHTML = `<span>${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}</span>`;
        
        console.log(time)

        if (time.milisecondsLeft < 0) {
          clearInterval(timeInterval);
        //   timer.innerHTML = `00:09`;
      clockContainer.classList.remove('animate');

          sessionCount++;
          
          addTomato();
          
          rest();
          }
    }, 1000);

}

const rest = ()=>{

    if(sessionCount === 4){
      longPause();

    }else{
      title.innerText = 'Rest!';
    
      // deadline = new Date(Date.now() + 1000 * 10);
      remaining = 1000 * 5;
      timeInterval = setInterval(() => {
          
          remaining-= 1000;
  
          const time = getRemainingTime(remaining);
        timer.innerHTML = `<span>${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}</span>`;
          
          if (time.milisecondsLeft < 0) {
            clearInterval(timeInterval);
         
              remaining = 1000 * 5;
              if(sessionCount < 4){
                startClock();
              }
            
            }
      }, 1000);
    }

    
}

const longPause = ()=>{
  remaining = 1000 * 15;
 
  clockContainer.classList.add('long-rest');

  title.innerText = 'Long rest!';

  timeInterval = setInterval(() => {
        
    remaining-= 1000;

    const time = getRemainingTime(remaining);
    timer.innerHTML = `<span>${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ?  '0'+ time.seconds  : time.seconds}</span>`;
    
    if (time.milisecondsLeft < 0) {
      clearInterval(timeInterval);
      
      clockContainer.classList.remove('long-rest');

       remaining = 1000 * 5;
       sessionCount = 0;
       tomatoes.innerHTML = '';
       sessions.innerText = `${sessionCount}/4`;
      startClock();

      }
}, 1000);
}

const addTomato = ()=>{


  if(sessionCount <= 4){
    sessions.innerText = `${sessionCount}/4`;

    const newTomato = document.createElement('div');
    newTomato.classList.add('tomato');
    newTomato.innerHTML = `<img src='./img/tomato.png'/>`
    tomatoes.appendChild(newTomato);

  
  }
 
}

stop.addEventListener('click', ()=>{
    clearInterval(timeInterval);
    timer.innerHTML = `25:00`;
    title.innerText = 'Ready?';

    //Reset all values
    sessionCount = 0;
    sessions.innerText = `${sessionCount}/4`;
    tomatoes.innerHTML = '';
    clockContainer.classList.remove('animate');
    

})



play.addEventListener('click', startClock);


