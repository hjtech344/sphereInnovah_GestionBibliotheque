<?php
session_start();
require '../config/connexionDb.php';

$objet = new Connexion();
$PDO   = $objet->connect();

$id_etudiant = (isset($_POST['id_etudiant']) ? $_POST['id_etudiant'] : "");
$id_livre    = (isset($_POST['id_livre']) ? $_POST['id_livre'] : "");
$disponible  = (isset($_POST['disponible']) ? $_POST['disponible'] : "");
$date_retour_prevue  = (isset($_POST['date_retour_prevue']) ? $_POST['date_retour_prevue'] : "");
$date_retour_effective  = (isset($_POST['date_retour_effective']) ? $_POST['date_retour_effective'] : "");

try{
    if($disponible == 1){ 
        $emprunt = $PDO->prepare(
          "INSERT INTO `Emprunts`(`id_etudiant`, `id_livre`, `date_retour_prevue`, `date_retour_effective`)
           VALUES(?,?,?,?)
          "  
        );
        $emprunt->execute([$id_etudiant, $id_livre, $date_retour_prevue, $date_retour_effective]);
    
        if($emprunt->rowCount() >= 1){
            $data = [
              'success'    => true,
              'disponible' => $disponible  
            ];
        }else{
            $data = null;
        }
    }else{
        $reservation = $PDO->prepare(
          "INSERT INTO `Reservations`(`id_etudiant`, `id_livre`, `statut`)
           VALUES(?,?,?)
          "  
        );
        $reservation->execute([$id_etudiant, $id_livre, 'en attente']);
    
        if($reservation->rowCount() >= 1){
            $data = [
             'success'    => true,
             'disponible' => $disponible
            ];
        }else{
           $data = null;
        }
    }
    
    header('Content-Type: application/json');
    print json_encode($data);
}catch(Exception $e){
    http_response_code(500);
    print json_encode(['error' => $e->getMessage()]);
}




