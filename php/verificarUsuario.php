<?php
include "config.php";
include "utils.php";


$dbConn =  connect($db);
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Expose-Headers: Content-Length, X-JSON");
header("Content-Type: application/json");
header("Access-Control-Max-Age: 60");
/*
  listar todos los usuarios
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (isset($_GET['username'])){
    //Mostrar un usuario especifico
    $sql = $dbConn->prepare("SELECT username FROM usuario WHERE username=:username");
    $sql->bindValue(':username', $_GET['username']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode( $sql->fetchAll()  );
    exit();
  }
}

//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>