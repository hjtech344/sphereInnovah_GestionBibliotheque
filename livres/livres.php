<?php
session_start();
require '../config/connexionDb.php';

$objet = new Connexion();
$PDO   = $objet->connect();

if($_SESSION['etudiant'] != null){

    $getLivres = $PDO->prepare(
      "SELECT * FROM `Livres`"  
    );
    $getLivres->execute();
    
    if($getLivres->rowCount() >= 1){
      $data = $getLivres->fetchAll(PDO::FETCH_ASSOC);
    }else{
      $data = null;
    }
    
    print json_encode($data);
}else{
    header('Location: ../auth/connexion.php');
}