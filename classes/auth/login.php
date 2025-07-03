<?php
require '../../config/connexionDb.php';
session_start();

$objet = new Connexion();
$PDO   = $objet->connect();

$email      = (isset($_POST['email']) ? $_POST['email'] : '');
$motdepasse = (isset($_POST['motdepasse']) ? $_POST['motdepasse'] : '');
$motdepasseCrypte = md5($motdepasse);


$etudiant = $PDO->prepare(
  "SELECT * FROM `Etudiants`  
   WHERE email = ? AND motdepasse = ?
  "  
);
$etudiant->execute([$email, $motdepasseCrypte]);

if($etudiant->rowCount() >= 1){
  $_SESSION['etudiant']    = $email;
  $data                    = $etudiant->fetch(PDO::FETCH_ASSOC);
  $_SESSION['id_etudiant'] = $data['id_etudiant'];
}else{
  $_SESSION['etudiant']    = null;
  $_SESSION['id_etudiant'] = null;
  $data                    = null;
}

print json_encode($data);
$PDO = null;
