<?php
session_start();
require '../config/connexionDb.php';

$objet = new Connexion();
$PDO   = $objet->connect();

try{
    $emprunts = $PDO->prepare(
        "SELECT * FROM `Livres`
         INNER JOIN `Emprunts` ON Emprunts.id_livre = Livres.id_livre
         WHERE Emprunts.id_etudiant = ?
        "
    );
    
    $emprunts->execute([$_SESSION['id_etudiant']]);
    
    if($emprunts->rowCount() >= 1){
        $data = [
          "success" => true,
          "emprunts" => $emprunts->fetchAll(PDO::FETCH_ASSOC)
        ];
    }else{
        $data = null;
    }
    
    header('Content-Type: application/json');
    print json_encode($data);
}catch(Exception $error){
  http_response_code(500);
  print json_encode(['error' => $error->getMessage()]);
}