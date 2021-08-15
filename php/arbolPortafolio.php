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
    
    if(isset($_GET['usuario'])){
      //Mostrar portafolios de un usuario especifico
      $sql = $dbConn->prepare("SELECT p1,p2,p3,s1,s2,s3 FROM arbol WHERE patrocinado=:id");
      $sql->bindValue(':id', $_GET['usuario']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      if($sql->rowCount() != 0){
        echo json_encode( $sql->fetchAll() );
      }else{
        echo json_encode(false);
      }
      exit();
    }else{
      //Mostrar todos los usuarios
      $sql = $dbConn->prepare("SELECT * FROM portafolio");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetchAll()  );
      exit();
    }
  }else {
    //Mostrar un usuario especifico
    $sql = $dbConn->prepare("SELECT u1.username AS patrocinador, u2.username AS patrocinado, a.posicion, a.p1,a.p2,a.p3,a.fecha_p1,a.fecha_p2,a.fecha_p3,a.s1,a.s2,a.s3
    FROM usuario u1, usuario u2, arbol a
    WHERE u1.id=a.patrocinador AND u2.id=a.patrocinado AND a.patrocinado=:id");
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
          (username,password,apellido,nombre,documento,email,telefono,domicilio,posicion,banco,numero_cuenta)
          VALUES
          (:username,:password,:apellido,:nombre,:documento,:email,:telefono,:domicilio,:posicion,:banco,:numero_cuenta)";
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
	$id = $_GET['id_pedido'];
  $statement = $dbConn->prepare("DELETE FROM pedidos where id_pedido=:id_pedido");
  $statement->bindValue(':id', $id);
  $statement->execute();
	header("HTTP/1.1 200 OK");
	exit();
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $_PUT = file_get_contents('php://input');
    $array = json_decode($_PUT,true);
    $fields = getParams($array);
    $sql = "UPDATE arbol SET $fields WHERE patrocinado=:id";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement,$array);
    $statement->execute();
    header("HTTP/1.1 200 OK");
    exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>