 const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const toggleBtn = document.getElementById('toggle-btn');

 const periodElement = document.getElementById('period');
 let is24Hour = false;

 function updateClock() {
    const now = new Date();  

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let period = ''; 

    if (!is24Hour) {
        period = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;  
    }

     hoursElement.innerText = h.toString().padStart(2, '0');
    minutesElement.innerText = m.toString().padStart(2, '0');
    secondsElement.innerText = s.toString().padStart(2, '0');

     if (periodElement) {
        periodElement.innerText = is24Hour ? '' : period;
    }
}

 updateClock(); 
setInterval(updateClock, 1000);  
toggleBtn.addEventListener('click', () => {
    is24Hour = !is24Hour;
    updateClock();
});