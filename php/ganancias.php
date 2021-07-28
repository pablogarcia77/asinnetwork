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
  listar todos los comercios
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if(isset($_GET['id_usuario'])){
    //Mostrar un comercio
    $sql = $dbConn->prepare("SELECT * FROM ganancias WHERE id_usuario=:id ORDER BY id DESC LIMIT 1");
    $sql->bindValue(':id', $_GET['id_usuario']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode(  $sql->fetchAll()  );
    exit();
  }else{
    //Mostrar lista de comercios
    $sql = $dbConn->prepare("SELECT * FROM ganancias");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode( $sql->fetchAll()  );
    exit();
  }
}

// Crear un nuevo producto
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $input = $_POST;
    $sql = "INSERT INTO ganancias
          (id_usuario,total,fecha_cobro,venta_directa,primera_linea,segunda_linea,tercera_linea,cuarta_linea,binario,puntos_izquierda,puntos_derecha,semanal)
          VALUES
          (:id_usuario,:total,:fecha_cobro,:venta_directa,:primera_linea,:segunda_linea,:tercera_linea,:cuarta_linea,:binario,:puntos_izquierda,:puntos_derecha,:semanal)";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $postId = $dbConn->lastInsertId();
    if($postId){
      $input['id_usuario'] = $postId;
      header("HTTP/1.1 200 OK");
      echo json_encode($input);
      exit();
	 }
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
	$id = $_GET['id'];
  $statement = $dbConn->prepare("DELETE FROM comercios where id_comercio=:id");
  $statement->bindValue(':id', $id);
  $statement->execute();
	header("HTTP/1.1 200 OK");
	exit();
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT')
{
    $input = $_GET;
    $idProducto = $input['id'];
    $fields = getParams($input);

    $sql = "
          UPDATE comercios
          SET $fields
          WHERE id_comercio='$idProducto'
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