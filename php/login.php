<?php
include "config.php";
include "utils.php";


$dbConn =  connect($db);
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
/*
  listar todos los usuarios
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (!isset($_GET['id_usuario'])){
    //Mostrar todos los usuarios
    $sql = $dbConn->prepare("SELECT * FROM usuarios");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode(  $sql->fetchAll()  );
    exit();
  }else {
    //Mostrar un usuario especifico
    $sql = $dbConn->prepare("SELECT * FROM usuarios WHERE id_usuario=:id_usuario");
    $sql->bindValue(':id_usuario', $_GET['id_usuario']);
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode( $sql->fetchAll()  );
    exit();
  }
}

// LOGIN
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = $_POST;
    $sql = $dbConn->prepare("SELECT * FROM usuario WHERE username=:username AND password=:password");
    $sql->bindValue(':username', $_POST['username']);
    $sql->bindValue(':password', $_POST['password']);
    $sql->execute();
    
    $num = $sql->rowCount();
    if($num){
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      $usuario = $sql->fetch();
      $estado['estado'] = ($estado['estado'] != 0) ? true : false;
      if($usuario['estado'] != 0){
        echo json_encode($usuario);
      }else{
        $error['ok'] = false;
        $error['mensaje'] = 'Cuenta inexistente';
        echo json_encode($error);
      }
      exit();
	  }else{
      header("HTTP/1.1 200 OK");
      $error['ok'] = false;
      $error['mensaje'] = '!Error! Usuario o contraseña incorrecto';
      echo json_encode($error);
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
if ($_SERVER['REQUEST_METHOD'] == 'PUT')
{
    $input = $_GET;
    $idPedido = $input['id_pedido'];
    $fields = getParams($input);

    $sql = "
          UPDATE pedidos
          SET $fields
          WHERE id_pedido='$idPedido'
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