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

    $("#formRegistro").bind("submit",function(){
        
        $.ajax({
            type:'post',
            url: 'registro.php',
            data:$(this).serialize(),
            success: function(b){
                $('#error').html(b);
                $('#modalRegistro').modal('open');
            }
        });
        return false;  
    });

    
    
});

function subirFrente(){
    var formData = new FormData();
    var imagen = $('#frenteDNI')[0].files[0];
    var ayn = $('#apellido').val() + "_" + $('#nombre').val();
    formData.append('frenteDNI',imagen);
    formData.append('ayn',ayn);
    $.ajax({
        url: 'subirDNI.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(b){
        }
    });
    return false;
}

function subirDorso(){
    var formData = new FormData();
    var imagen = $('#dorsoDNI')[0].files[0];
    var ayn = $('#apellido').val() + "_" + $('#nombre').val();
    formData.append('dorsoDNI',imagen);
    formData.append('ayn',ayn);
    $.ajax({
        url: 'subirDNI.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(b){
        }
    });
    return false;
}