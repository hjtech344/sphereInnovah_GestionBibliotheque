<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bibliothèque Universitaire</title>
    <link rel="stylesheet" href="./assets/css/main.css">
    <!-- Link remix icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.css" integrity="sha512-kJlvECunwXftkPwyvHbclArO8wszgBGisiLeuDFwNM8ws+wKIw0sv1os3ClWZOcrEB2eRXULYUsm8OVRGJKwGA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <header>
        <nav class="container">
            <div class="logo"><i class="ri-book-open-line"></i> Université</div>
            <div class="nav-links">
                <a href="#accueil">Accueil</a>
                <a href="./auth/auth.php">Étudiants</a>
                <a href="">Admistrations</a>
            </div>
        </nav>
    </header>
    
    <main>
        <section class="hero" id="accueil">
            <div class="container">
                <div class="hero-content">
                    <h1>Bibliothèque Universitaire</h1>
                    <p>Découvrez, empruntez et gérez vos ressources académiques en toute simplicité</p>
                    <div class="cta-buttons">
                        <a href="./auth/auth.php" class="btn btn-primary">Espace Étudiant</a>
                        <a href="./admin/index.html" class="btn btn-secondary">Espace Admin</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2>Nos Fonctionnalités</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">👨‍🎓</div>
                        <h3>Espace Étudiant</h3>
                        <p>Consultez le catalogue, vérifiez la disponibilité des livres, effectuez des réservations et gérez vos emprunts en temps réel.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">🔍</div>
                        <h3>Recherche Avancée</h3>
                        <p>Trouvez rapidement les ressources dont vous avez besoin grâce à notre système de recherche intelligent et nos filtres avancés.</p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">⚙️</div>
                        <h3>Gestion Administrative</h3>
                        <p>Interface complète pour les administrateurs : ajout, modification, suppression de livres et validation des réservations.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Bibliothèque Universitaire. Designed by Hjdev. Tous droits réservés. </p>
        </div>
    </footer>
</body>
</html>