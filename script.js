

//Timer
const timer = document.getElementById('timer');

//Controls
const play = document.getElementById('play');
const pause = document.getElementById('pause');






let deadline = new Date(Date.now() + 1000 * 60 * 25)
// console.log(new Date(Date.now() + 1000 * 60 * 25)- new Date(Date.now()))

// const getRemainingTime = (deadline)=>{
    
//     const milisecondsLeft = deadline - new Date(Date.now());
//     const seconds = Math.ceil((milisecondsLeft/1000) % 60);
//     const minutes = Math.floor( (milisecondsLeft/1000/60) % 60 );
    
//     return {minutes, seconds, milisecondsLeft}
// }
console.log(1283972123123123123 - new Date(Date.now()))

let timeInterval;

const startClock = ()=>{

        

    clearInterval(timeInterval);
    timeInterval = setInterval(() => {
        
        const milisecondsLeft = deadline - new Date(Date.now());
        const seconds = Math.ceil((milisecondsLeft/1000) % 60);
        const minutes = Math.floor( (milisecondsLeft/1000/60) % 60 );
        

        console.log((milisecondsLeft))
        timer.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ?  '0'+ seconds  : seconds}`;
       

        if (milisecondsLeft <= 0) {
          clearInterval(timeInterval);
          timer.innerHTML = `00:00`;
          }


    }, 1000);
   

      
}

pause.addEventListener('click', ()=>{
    clearInterval(timeInterval);

    
  

    
})



play.addEventListener('click', startClock);


