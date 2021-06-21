<?php

// MAIL PHP
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
 
$mail = new PHPMailer(true);


    $apellido = $_POST['apellido'];
    $nombre = $_POST['nombre'];
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];
    $documento = $_POST['documento'];
    $email = $_POST['email'];
    $domicilio = $_POST['domicilio'];
    $telefono = $_POST['telefono'];
    $patrocinador = $_POST['patrocinador'];
    $portafolios = $_POST['portafolios'];
    $posicion = $_POST['posicion'];
    $banco = $_POST['banco'];
    $cuenta = $_POST['numeroCuenta'];
    $barrio = $_POST['barrio'];
    $localidad = $_POST['localidad'];
    $provincia = $_POST['provincia'];
    $cp = $_POST['cp'];


    $mensaje = 'Hola '.$nombre.' '.$apellido.' bienvenido a Asin Network Argentina.';
    $asunto = 'Registro de usuario nuevo';
    mail($email,$asunto,$mensaje,"From: samuel@asinnetwork.net");

    
    $mail->isSMTP();
    $mail->Host = 'c2180634.ferozo.com';  // Host de conexión SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'no-reply@c2180634.ferozo.com';                 // Usuario SMTP
    $mail->Password = 'XmFY8PAPlQ';                           // Password SMTP
    $mail->SMTPSecure = 'tls';                            // Activar seguridad TLS
    $mail->Port = 587;                                    // Puerto SMTP

    $mail->setFrom('samuel@asinnetwork.net');		// Mail del remitente
    $mail->addAddress('asinventas@gmail.com');     // Mail del destinatario
    $mail->addCC('usuarios@asinnetwork.net');

    $mail->isHTML(true);
    $mail->Subject = 'Alta de usuario - Asin Network Argentina';  // Asunto del mensaje
    $mail->Body    = '
        Se registro un nuevo usuario con los siguientes datos
        Nombre: '.$nombre.'<br>
        Apellido: '.$apellido.'<br>
        Usuario: '.$usuario.'<br>
        Password: '.$password.'<br>
        Documento: '.$documento.'<br>
        Email: '.$email.'<br>
        Calle: '.$domicilio.'<br>
        Barrio: '.$barrio.'<br>
        Localidad: '.$localidad.'<br>
        CP: '.$cp.'<br>
        Provincia: '.$provincia.'<br>
        Telefono: '.$telefono.'<br>
        Patrocinador: '.$patrocinador.'<br>
        Portafolios adquiridos: '.$portafolios.'<br>
        Posicion de la nueva cuenta: '.$posicion.'<br>
        Banco: '.$banco.'<br>
        Numero de Cuenta bancaria: '.$cuenta;    // Contenido del mensaje (acepta HTML)

    $mail->AltBody = 'Se registro un nuevo usuario con los siguientes datos
        Nombre: '.$nombre.'
        Apellido: '.$apellido.'
        Usuario: '.$usuario.'
        Password: '.$password.'
        Documento: '.$documento.'
        Email: '.$email.'
        Calle: '.$domicilio.'<br>
        Barrio: '.$barrio.'<br>
        Localidad: '.$localidad.'<br>
        CP: '.$cp.'<br>
        Provincia: '.$provincia.'<br>
        Telefono: '.$telefono.'
        Patrocinador: '.$patrocinador.'
        Portafolios adquiridos: '.$portafolios.'
        Posicion de la nueva cuenta: '.$posicion.'
        Banco: '.$banco.'
        Numero de Cuenta bancaria: '.$cuenta;    // Contenido del mensaje alternativo (texto plano)

    $mail->send();

?>