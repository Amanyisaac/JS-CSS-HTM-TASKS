 let title = document.querySelector('.title'); 
let ul = document.querySelector('ul');
let reload = document.querySelector('.reload');

window.onload = function() {
    if (window.navigator.onLine) {
        Online();
    } else {
        Offline();
    }
}

 window.addEventListener('online', function() {
    Online();
});
window.addEventListener('offline', function() {
    Offline();
});

function Online() {
    title.innerHTML = "You are Online";  
    title.style.color = "green";         
    ul.classList.add('hide');
    reload.classList.add('hide');
}

function Offline() {
    title.innerHTML = "You are Offline";  
    title.style.color = "#666";          
    ul.classList.remove('hide');
    reload.classList.remove('hide');
}

reload.onclick = function() {
    window.location.reload();
}