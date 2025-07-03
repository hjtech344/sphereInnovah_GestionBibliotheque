<?php 
session_start();
require '../../config/connexionDb.php';

$objet = new Connexion();
$PDO   = $objet->connect();

$nom        = (isset($_POST['nom']) ? $_POST['nom'] : '');
$prenom     = (isset($_POST['prenom']) ? $_POST['prenom'] : '');
$email      = (isset($_POST['email']) ? $_POST['email'] : '');
$motdepasse = (isset($_POST['motdepasse']) ? $_POST['motdepasse'] : '');
$motdepasseCrypte = md5($motdepasse);


$etudiant = $PDO->prepare(
  "INSERT INTO `Etudiants`(`nom`, `prenom`, `email`, `motdepasse`)
   VALUES(?,?,?,?)
  "   
);
$etudiant->execute([$nom, $prenom, $email, $motdepasseCrypte]);

if($etudiant->rowCount() >= 1){
  $_SESSION['etudiant']    = $email;  
  $data                    = $etudiant->fetch(PDO::FETCH_ASSOC);
  $_SESSION['id_etudiant'] = $data['id_etudiant'];
}else{
  $_SESSION['etudiant']    = null;
  $_SESSION['id_etudiant'] = null;
  $data = null;
}

print json_encode($data);
$PDO = null;