<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Espace Étudiant - Bibliothèque</title>
    <link rel="stylesheet" href="../assets/css/etudiants.css">
    <!-- Link remix icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.css" integrity="sha512-kJlvECunwXftkPwyvHbclArO8wszgBGisiLeuDFwNM8ws+wKIw0sv1os3ClWZOcrEB2eRXULYUsm8OVRGJKwGA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <?php 
        if($_SESSION['etudiant']){ ?>
            <div class="container">
                <header>
                    <nav>
                        <div class="logo"><i class="ri-book-open-line"></i> Université</div>
                        <div class="nav-links">
                            <a href="index.php">Catalogue</a>
                            <a href="emprunts.php">Mes emprunts</a>
                            <a href="reservations.php">Mes réservations</a>
                            <a href="../auth/logout.php">Déconnexion</a>
                        </div>
                    </nav>
                </header>
        
                <div class="main-content">
                    <div style="text-align: center;">
                        <span style="font-size: 1.5rem; font-weight : bolder;">Espace étudiant</span> 
                        (<span>Connecté en tant que : <strong><?= $_SESSION['etudiant'] ?></strong>)
                        <input type="hidden" id="id_etudiant" name="id_etudiant" value="<?= $_SESSION['id_etudiant'] ?>">
                    </div>
                    <div class="books-section">
                        <h2 class="section-title"><i class="ri-book-line"></i> Mes emprunts de livre</h2>
                        <div class="books-grid" id="borrowBooks">
                            <!-- Livres disponibles seront ajoutés ici -->
                        </div>
                    </div>
                </div>
            </div>
        <?php }else{
          header("Location: ../auth/auth.php");
        }
    ?>

    <!-- Modal pour confirmation -->
    <div id="confirmModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3 id="modalTitle"></h3>
            <p id="modalMessage"></p>
            <div style="margin-top: 2rem; text-align: center;">
                <button class="btn btn-borrow" id="confirmBtn">Confirmer</button>
                <button class="btn" style="background: #ccc; color: #333; margin-left: 1rem;" onclick="closeModal()">Annuler</button>
            </div>
        </div>
    </div>
    
     <!-- Lien jquery -->
     <script src="https://code.jquery.com/jquery-3.7.1.js" 
     integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
     <!-- Fin Lien jquery -->
     <!-- Lien etudiants js -->
     <script src="../assets/js/emprunts.js"></script>
     <!-- Fin Lien etudiants  js -->
     <!-- Lien sweet -->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js" 
     integrity="sha512-AA1Bzp5Q0K1KanKKmvN/4d3IRKVlv9PYgwFPvm32nPO6QS8yH1HO7LbgB1pgiOxPtfeg5zEn2ba64MUcqJx6CA==" 
     crossorigin="anonymous" referrerpolicy="no-referrer"></script>
     <!-- Fin Lien sweet -->

     <!-- Lien Toast -->
     <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.22.0/dist/sweetalert2.all.min.js"></script>
     <!-- Fin Lien Toast -->
</body>
</html>