<?php
include "config.php";
include "utils.php";


$dbConn =  connect($db);
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
/*
  listar todos los comercios
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if (isset($_GET['c']))
    {
      //Mostrar categorias de un comercio
      $sql = $dbConn->prepare("SELECT cc.id_categoria,c.nombre FROM categorias c, categorias_comercios cc WHERE cc.id_categoria=c.id_categoria AND cc.id_comercio=:c");
      $sql->bindValue(':c', $_GET['c']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetchAll()  );
      exit();
	  }
    else {
      //Mostrar todas las categorias
      $sql = $dbConn->prepare("SELECT c.id_categoria,c.nombre,cc.id_comercio FROM categorias c, categorias_comercios cc WHERE cc.id_categoria=c.id_categoria");
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
    $sql = "INSERT INTO comercios
          (razon,domicilio,cuit,telefono)
          VALUES
          (:razon,:domicilio,:cuit,:telefono)";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $postId = $dbConn->lastInsertId();
    if($postId)
    {
      $input['id'] = $postId;
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