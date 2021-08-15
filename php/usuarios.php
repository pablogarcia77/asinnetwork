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
    $sql = $dbConn->prepare("SELECT id,apellido,nombre,username,telefono,documento,banco,numero_cuenta,estado,email,domicilio,tipo,url_documento_frente,url_documento_dorso,registro,password FROM usuario");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode(  $sql->fetchAll()  );
    exit();
  }else {
    //Mostrar un usuario especifico
    $sql = $dbConn->prepare("SELECT id,apellido,nombre,username,telefono,documento,banco,numero_cuenta,estado,email,domicilio,tipo,url_documento_frente,url_documento_dorso,registro FROM usuario WHERE id=:id");
    $sql->bindValue(':id', $_GET['id']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode( $sql->fetchAll()  );
    exit();
  }
}

// Crear un nuevo pedido
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = $_POST;
    $sql = "INSERT INTO usuario
          (username,password,apellido,nombre,documento,url_documento_frente,url_documento_dorso,email,telefono,domicilio,banco,numero_cuenta,registro)
          VALUES
          (:username,:password,:apellido,:nombre,:documento,:url_documento_frente,:url_documento_dorso,:email,:telefono,:domicilio,:banco,:numero_cuenta,:registro)";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $userId = $dbConn->lastInsertId();
    if($userId)
    {
      $input['id'] = $userId;
      header("HTTP/1.1 200 OK");
      echo json_encode($input);
      exit();
	 }
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
  if (!isset($_GET['estado'])){
    $id = $_GET['id'];
    $statement = $dbConn->prepare("DELETE FROM usuario WHERE id=:id");
    $statement->bindValue(':id', $id);
    $statement->execute();
    header("HTTP/1.1 200 OK");
    exit();
  }else{
    $id = $_GET['id'];
    $estado = $_GET['estado'];
    $statement = $dbConn->prepare("UPDATE usuario SET estado=:estado WHERE id=:id");
    $statement->bindValue(':id', $id);
    $statement->bindValue(':estado', $estado);
    $statement->execute();
    header("HTTP/1.1 200 OK");
    exit();
  }
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $_PUT = file_get_contents('php://input');
    $array = json_decode($_PUT,true);
    $fields = getParams($array);
    $sql = "UPDATE usuario SET $fields WHERE id=:id";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement,$array);
    $statement->execute();
    header("HTTP/1.1 200 OK");
    exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>