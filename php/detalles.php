<?php
include "config.php";
include "utils.php";


$dbConn =  connect($db);
header('Access-Control-Allow-Origin: http://localhost:4200');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,X-Auth-Token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
/*
  listar todos los detalles
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if(!isset($_GET['id_detalle'])){
    if (!isset($_GET['id_comercio'])){
      //Mostrar todos los detalles de la tabla
      $sql = $dbConn->prepare("SELECT * FROM detalle");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetchAll()  );
      exit();
    }else {
      //Mostrar todos los detalles de un pedido especifico
      $sql = $dbConn->prepare("SELECT d.id_pedido,d.cantidad,d.subtotal, p.nombre FROM detalle d,productos p WHERE d.id_producto=p.id_producto AND d.id_comercio=:id_comercio");
      $sql->bindValue(':id_comercio', $_GET['id_comercio']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode( $sql->fetchAll()  );
      exit();
    }
  }else{
    // Mostrar detalle en especifico
    $sql = $dbConn->prepare("SELECT * FROM detalle WHERE id_detalle=:id_detalle");
    $sql->bindValue(':id_detalle', $_GET['id_detalle']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode( $sql->fetchAll()  );
    exit();
  }
}

// Crear un nuevo detalle
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $input = $_POST;
    $sql = "INSERT INTO detalle
          (id_producto,cantidad,subtotal,id_pedido,id_comercio)
          VALUES
          (:id_producto,:cantidad,:subtotal,:id_pedido,:id_comercio)";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $detalleId = $dbConn->lastInsertId();
    if($detalleId)
    {
      $input['id_detalle'] = $detalleId;
      header("HTTP/1.1 200 OK");
      echo json_encode($input);
      exit();
	 }
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
	$id = $_GET['id_detalle'];
  $statement = $dbConn->prepare("DELETE FROM detalle where id_detalle=:id_detalle");
  $statement->bindValue(':id_detalle', $id);
  $statement->execute();
	header("HTTP/1.1 200 OK");
	exit();
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT')
{
    $input = $_GET;
    $idDetalle = $input['id_detalle'];
    $fields = getParams($input);

    $sql = "
          UPDATE detalle
          SET $fields
          WHERE id_detalle='$idDetalle'
           ";

    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);

    $statement->execute();
    header("HTTP/1.1 200 OK");
    exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>