<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bibliothèque Universitaire - Authentification</title>
    <link rel="stylesheet" href="../assets/css/auth.css">
    <!-- Link remix icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.css" integrity="sha512-kJlvECunwXftkPwyvHbclArO8wszgBGisiLeuDFwNM8ws+wKIw0sv1os3ClWZOcrEB2eRXULYUsm8OVRGJKwGA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <div class="auth-container">
        <div class="auth-header">
            <h1><i class="ri-book-open-line"></i> Bibliothèque Universitaire</h1>
            <p>Système de Gestion des Ressources</p>
        </div>
        
        <div class="form-container">
            <div class="form-toggle">
                <button class="toggle-btn active" onclick="switchForm('login')">Connexion</button>
                <button class="toggle-btn" onclick="switchForm('register')">Inscription</button>
            </div>

            <!-- Formulaire de Connexion -->
            <form id="login-form" class="form active">
                <div class="form-group">
                    <label for="login-email">Adresse Email</label>
                    <input type="email" id="login-email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="login-password">Mot de Passe</label>
                    <div class="input-with-icon">
                        <input type="password" id="login-password" name="password" required>
                        <button type="button" class="show-password" onclick="togglePassword('login-password')">👁️</button>
                    </div>
                </div>

                <button type="submit" class="submit-btn">Se Connecter</button>

                <div class="forgot-password">
                    <a href="#" onclick="">Mot de passe oublié ?</a>
                </div>
            </form>

            <!-- Formulaire d'Inscription -->
            <form id="register-form" class="form">
                <div class="form-row">
                    <div class="form-group">
                       <label for="register-firstname">Prénom</label>
                       <input type="text" id="register-nom" name="nom" required>
                    </div>
                    <div class="form-group">
                       <label for="register-lastname">Nom</label>
                       <input type="text" id="register-prenom" name="prenom" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="register-email">Adresse Email</label>
                    <input type="email" id="register-email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="register-password">Mot de Passe</label>
                    <div class="input-with-icon">
                        <input type="password" id="register-password" name="password" required minlength="8">
                        <button type="button" class="show-password" onclick="togglePassword('register-password')">👁️</button>
                    </div>
                </div>

                <div class="form-group">
                    <label for="register-confirm-password">Confirmer le Mot de Passe</label>
                    <div class="input-with-icon">
                        <input type="password" id="register-confirm-password" name="confirm_password" required>
                        <button type="button" class="show-password" onclick="togglePassword('register-confirm-password')">👁️</button>
                    </div>
                </div>

                <button type="submit" class="submit-btn">S'Inscrire</button>
            </form>
        </div>
    </div>
     <!-- Lien jquery -->
     <script src="https://code.jquery.com/jquery-3.7.1.js" 
     integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
     <!-- Fin Lien jquery -->
     <!-- Lien auth js -->
     <script src="../assets/js/auth.js"></script>
     <!-- Fin Lien auth  js -->
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