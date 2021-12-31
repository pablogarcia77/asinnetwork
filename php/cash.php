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
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
  return 0;    
} 
/*
  listar todos los usuarios
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (!isset($_GET['id'])){
    //Mostrar todos los usuarios
    $sql = $dbConn->prepare("SELECT * FROM usuario_cash");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode(  $sql->fetchAll()  );
    exit();
  }else {
    //Mostrar un usuario especifico
    $sql = $dbConn->prepare("SELECT * FROM usuario_cash WHERE id_usuario=:id");
    $sql->bindValue(':id', $_GET['id']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode( $sql->fetchAll() );
    exit();
  }
}

// Crear un nuevo pedido
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  $input = $_POST;
  $sql = "INSERT INTO usuario_cash
        (id_usuario,cash,fecha)
        VALUES
        (:id_usuario,:cash,:fecha)";
  $statement = $dbConn->prepare($sql);
  bindAllValues($statement, $input);
  $statement->execute();
  $userId = $dbConn->lastInsertId();
  if($userId){
    $input['id'] = $userId;
    header("HTTP/1.1 200 OK");
    echo json_encode($input);
    exit();
  }
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
  $id = $_GET['id'];
  $statement = $dbConn->prepare("DELETE FROM usuario_cash WHERE id=:id");
  $statement->bindValue(':id', $id);
  $statement->execute();
  header("HTTP/1.1 200 OK");
  echo json_encode(true);
  exit();
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
  $_PUT = file_get_contents('php://input');
  $array = json_decode($_PUT,true);
  $fields = getParams($array);
  $sql = "UPDATE usuario_cash SET $fields WHERE id=:id";
  $statement = $dbConn->prepare($sql);
  bindAllValues($statement,$array);
  $statement->execute();
  header("HTTP/1.1 200 OK");
  exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>