<?php
session_start();
require '../config/connexionDb.php';

$objet = new Connexion();
$PDO   = $objet->connect();

try{
    $reservations = $PDO->prepare(
      "SELECT * FROM `Livres`
       INNER JOIN `Reservations` ON Reservations.id_livre = Livres.id_livre
       WHERE Reservations.id_etudiant = ? 
      "  
    );
    
    $reservations->execute([$_SESSION['id_etudiant']]);
    
    if($reservations->rowCount() >= 1){
        $data = [
           "success" => true,
           "reservations" => $reservations->fetchAll(PDO::FETCH_ASSOC)
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
