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
    $sql = $dbConn->prepare("SELECT * FROM portafolio WHERE existe=1");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode(  $sql->fetchAll()  );
    exit();
  }else {
    //Mostrar un usuario especifico
    $sql = $dbConn->prepare("SELECT u.nombre,u.apellido,u.estado,u.id FROM arbol a, usuario u WHERE a.patrocinado=:id AND a.patrocinador=u.id");
    $sql->bindValue(':id', $_GET['id']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode( $sql->fetch()  );
    exit();
  }
}

// Crear un nuevo pedido
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $content = file_get_contents("php://input");

    $array = json_decode($content, true);
    $sql = "INSERT INTO portafolio
          (tipo,precio,puntos,porcentaje)
          VALUES
          (:tipo,:precio,:puntos,:porcentaje)";
    $statement = $dbConn->prepare($sql);
    // bindAllValues($statement, $input);
    $statement->bindValue(':tipo',$array['tipo']);
    $statement->bindValue(':precio',$array['precio']);
    $statement->bindValue(':puntos',$array['puntos']);
    $statement->bindValue(':porcentaje',$array['porcentaje']);
    $statement->execute();
    $userId = $dbConn->lastInsertId();

    
    $validar = validate($array['encodedImage']);

    echo json_encode($validar);
    if($validar==1) {
      $imagen = save_base64_image($array['encodedImage'], "../assets/images/portafolios/" . $userId);
    
      if($imagen!=null) {
        print_json(200, "Completado", $imagen);
    
      } else {
        print_json(200, "Este archivo ya existe", null);
      }
      } else {
      print_json(200, "Extension invalida", null);
    }

    echo json_encode($array);

    if($userId)
    {
      $input['id'] = $userId;
      header("HTTP/1.1 200 OK");
      echo json_encode(true);
      exit();
	 }
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
	$id = $_GET['id'];
  $statement = $dbConn->prepare("UPDATE portafolio SET existe=0 WHERE id=:id");
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
    $sql = "UPDATE portafolio SET $fields WHERE id=:id";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement,$array);
    header("HTTP/1.1 200 OK");
    try{
      $statement->execute();
      echo json_encode(true);
    }catch(PDOException $e){
      $e->getMessage();
      echo json_encode(false);
    }
    exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>