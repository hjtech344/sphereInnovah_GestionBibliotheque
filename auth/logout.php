<?php
session_start();
unset($_SESSION['etudiant']);
session_destroy();
header('Location: ../index.php');