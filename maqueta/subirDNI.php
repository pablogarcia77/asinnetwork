<?php

$frente = (isset($_FILES['frenteDNI'])) ? $_FILES['frenteDNI'] : null;
$nya = $_POST['ayn'];

if($frente){
    if($_FILES['frenteDNI']['name']){
        $fileName = $_FILES['frenteDNI']['name'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        $fuente = $_FILES['frenteDNI']['tmp_name'];
        $carpeta = $_SERVER['DOCUMENT_ROOT']."/documentos/".$nya."_Frente";
        $movio = move_uploaded_file($fuente,$carpeta.'.'.$fileExtension);
    }
}

$dorso = (isset($_FILES['dorsoDNI'])) ? $_FILES['dorsoDNI'] : null;
if($dorso){
    if($_FILES['dorsoDNI']['name']){
        $fileName = $_FILES['dorsoDNI']['name'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        $fuente = $_FILES['dorsoDNI']['tmp_name'];
        $carpeta = $_SERVER['DOCUMENT_ROOT']."/documentos/".$nya."_Dorso";
        $movio = move_uploaded_file($fuente,$carpeta.'.'.$fileExtension);
    }
}

header('Location: index.html');
?>