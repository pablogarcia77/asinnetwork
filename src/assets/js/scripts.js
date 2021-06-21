$(document).ready(function(){
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        duration: 200,
        indicators: true
    },setTimeout(autoplay,4500));

    function autoplay(){
        $('.carousel.carousel-slider').carousel('next');
        setTimeout(autoplay,4500);
    }

    $('select').formSelect();
    $('.parallax').parallax();
    $('.modal').modal();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown({
        coverTrigger: false
    });
});