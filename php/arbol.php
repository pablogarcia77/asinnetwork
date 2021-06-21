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
  if (isset($_GET['usuario'])){
    //Mostrar todos los usuarios
    $sql = $dbConn->prepare("SELECT * FROM arbol WHERE patrocinado=:usuario");
    $sql->bindValue(':usuario', $_GET['usuario']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode(  $sql->fetchAll()  );
    exit();
  }else {
    //Mostrar un usuario especifico
    // $sql = $dbConn->prepare("SELECT u.id,u.username,a.posicion,a.patrocinador,a.p1,a.p2,a.p3,a.fecha_p1,a.fecha_p2,a.fecha_p3,a.s1,a.s2,a.s3,a.id as idArbol FROM usuario u, arbol a WHERE a.patrocinado=u.id AND a.patrocinador=:id ORDER BY a.posicion DESC");
    $sql = $dbConn->prepare("SELECT u.id,u.username,a.posicion,a.patrocinador,a.p1,a.p2,a.p3,a.fecha_p1,a.fecha_p2,a.fecha_p3,a.s1,a.s2,a.s3,a.precio_p1,a.precio_p2,a.precio_p3,a.porcentaje_p1,a.porcentaje_p2,a.porcentaje_p3,a.puntos_p1,a.puntos_p2,a.puntos_p3,a.id as idArbol FROM usuario u, arbol a WHERE a.patrocinado=u.id AND a.patrocinador=:id ORDER BY a.posicion DESC");
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
    $sql = "INSERT INTO arbol
            (patrocinador,patrocinado,posicion)
            VALUES
            (:patrocinador,:patrocinado,:posicion)";

    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $arbolId = $dbConn->lastInsertId();
    if($arbolId)
    {
      $input['id'] = $arbolId;
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
    $sql = "UPDATE arbol SET $fields WHERE id=:id";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement,$array);
    $statement->execute();
    header("HTTP/1.1 200 OK");
    exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>