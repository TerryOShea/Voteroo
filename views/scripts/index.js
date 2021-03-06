var menu = document.querySelector('.menu'), 
    menuBtn = document.querySelector('.menu-btn'), 
    pageContainer = document.querySelector('.page-container'), 
    closeFlashBtn = document.querySelector('.close-flash-btn'), 
    message = document.querySelector('.message'),
    showing = false;

function toggleMenu() {
    if (showing) {
        menu.style.right = "-680px";
        pageContainer.style.right = "0px";
        showing = false;
    }
    else {
        menu.style.right = "0px"; 
        pageContainer.style.right = "250px";
        showing = true;
    }
}

menuBtn.addEventListener('click', toggleMenu);

window.addEventListener('resize', function() {
    if (showing) {
        toggleMenu();
    }
});
    
closeFlashBtn.addEventListener('click', function() {
    message.style.display = 'none';
})