<?php
include "config.php";
include "utils.php";


$dbConn =  connect($db);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials', 'true');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Expose-Headers: Content-Length, X-JSON");
header("Content-Type: application/json");
header("Access-Control-Max-Age: 60");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
  return 0;    
}   

/*
  listar todos los productos
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (!isset($_GET['p'])){
    if(isset($_GET['cat'])){
      //Mostrar todos los productos de una determinada categoria de un comercio
      $sql = $dbConn->prepare("SELECT * FROM productos WHERE id_comercio=:c AND categoria=:cat");
      $sql->bindValue(':c', $_GET['c']);
      $sql->bindValue(':cat', $_GET['cat']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetchAll()  );
      exit();
    }else{
      //Mostrar todos los productos de un comercio sin importar la categoria
      $sql = $dbConn->prepare("SELECT * FROM productos WHERE id_comercio=:c AND borrado=0");
      $sql->bindValue(':c', $_GET['c']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetchAll()  );
      exit();
    }
  }else {
    //Mostrar un producto en especifico
    $sql = $dbConn->prepare("SELECT * FROM productos WHERE id_producto=:p");
    $sql->bindValue(':p', $_GET['p']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode( $sql->fetchAll()  );
    exit();
  }
}

// Actualiar producto
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  $input = $_POST;
  $sql = "INSERT INTO productos
        (id_comercio,nombre,descripcion,precio,categoria,oferta)
        VALUES
        (:id_comercio,:nombre,:descripcion,:precio,:categoria,:oferta)";
  $statement = $dbConn->prepare($sql);
  bindAllValues($statement, $input);
  $statement->execute();
  $postId = $dbConn->lastInsertId();
  if($postId){
    $input['id'] = $postId;
    header("HTTP/1.1 200 OK");
    echo json_encode($input);
    exit();
  }
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
	$id = $_GET['id_producto'];
  $statement = $dbConn->prepare("DELETE FROM productos where id_producto=:id_producto");
  $statement->bindValue(':id_producto', $id);
  $statement->execute();
	header("HTTP/1.1 200 OK");
	exit();
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
  $_PUT = file_get_contents('php://input');
  $array = json_decode($_PUT,true);
  $fields = getParams($array);
  $sql = "UPDATE productos SET $fields WHERE id_producto=:id_producto";
  $statement = $dbConn->prepare($sql);
  bindAllValues($statement, $array);
  $statement->execute();
  header("HTTP/1.1 200 OK");
  exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>
