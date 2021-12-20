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
    if(!isset($_GET['username'])){
      //Mostrar todos los usuarios
      $sql = $dbConn->prepare("SELECT id,apellido,nombre,username,telefono,documento,banco,numero_cuenta,estado,email,domicilio,tipo,url_documento_frente,url_documento_dorso,registro,bloqueado,password FROM usuario WHERE estado=1");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetchAll()  );
      exit();
    }else{
      // Find by username (register validation)
      $sql = $dbConn->prepare("SELECT username FROM usuario WHERE username=:username");
      $sql->bindValue(':username', $_GET['username']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetch()  );
      exit();
    }
  }else {
    //Mostrar un usuario especifico
    $sql = $dbConn->prepare("SELECT id,apellido,nombre,username,telefono,documento,banco,numero_cuenta,estado,email,domicilio,tipo,url_documento_frente,url_documento_dorso,registro,bloqueado FROM usuario WHERE id=:id");
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
  $id = $_GET['id'];
  if(!isset($_GET['bloqueado'])){
    $statement = $dbConn->prepare("DELETE FROM usuario WHERE id=:id");
  }else{
    $statement = $dbConn->prepare("UPDATE usuario SET bloqueado=:bloqueado WHERE id=:id");
    $statement->bindValue(':bloqueado', $_GET['bloqueado']);
  }
  $statement->bindValue(':id', $id);
  // $statement->bindValue(':estado', $estado);
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