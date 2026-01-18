const btn = document.getElementById('theme-btn');
 btn.addEventListener('click', function() {
     document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-theme')) {
         btn.innerText = "Switch to Light Mode  ";
    } else {
         btn.innerText = "Switch to Dark Mode  ";
    }
});
 