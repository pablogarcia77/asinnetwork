<?php
include "config.php";
include "utils.php";


$dbConn =  connect($db);
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
  return 0;    
}   
/*
  listar todos los pedidos
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (!isset($_GET['id_pedido'])){
    if(isset($_GET['id_comercio'])){
      //Mostrar todos los pedidos
      $sql = $dbConn->prepare("SELECT * FROM pedidos WHERE id_comercio=:id_comercio AND fecha BETWEEN CONCAT(DATE(NOW() - INTERVAL 1 DAY),' 06:00:01') AND CONCAT(DATE(NOW()),' 06:00:00') ORDER BY id_pedido DESC");
      $sql->bindValue(':id_comercio', $_GET['id_comercio']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetchAll()  );
      exit();
    }else{
      //Mostrar todos los pedidos
      $sql = $dbConn->prepare("SELECT * FROM pedidos");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetchAll()  );
      exit();
    }
  }else {
    //Mostrar un pedido especifico
    $sql = $dbConn->prepare("SELECT * FROM pedidos WHERE id_pedido=:id_pedido");
    $sql->bindValue(':id_pedido', $_GET['id_pedido']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode( $sql->fetchAll()  );
    exit();
  }
}

// Crear un nuevo pedido
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $input = $_POST;
    $sql = "INSERT INTO pedidos
          (mesa,id_comercio,total)
          VALUES
          (:mesa,:id_comercio,:total)";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $pedidoId = $dbConn->lastInsertId();
    if($pedidoId)
    {
      $input['id_pedido'] = $pedidoId;
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
  $sql = "UPDATE pedidos SET $fields WHERE id_pedido=:id_pedido";
  $statement = $dbConn->prepare($sql);
  bindAllValues($statement,$array);
  $statement->execute();
  header("HTTP/1.1 200 OK");
  exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>