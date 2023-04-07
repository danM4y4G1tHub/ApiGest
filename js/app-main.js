window.addEventListener('scroll', function(){
    var navbar = document.getElementById('h-scroll');

    if( this.window.screenY > 300 ){
        navbar.style.background = 181816;
    }
});