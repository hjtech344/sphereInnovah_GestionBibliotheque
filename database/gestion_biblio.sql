-- SOURCE /var/www/html/htdocs/gestion_bibliotheque/database/gestion_biblio.sql;

-- Creation d'une base de données pour le système de gestion de bibliothèque universitaite
DROP DATABASE `gestion_bibliotheque`;
CREATE DATABASE IF NOT EXISTS `gestion_bibliotheque`;
USE `gestion_bibliotheque`;


-- Creation de la table Etudiants
CREATE TABLE IF NOT EXISTS `Etudiants`
(
 `id_etudiant` INT(8) NOT NULL AUTO_INCREMENT,
 `nom`         VARCHAR(100)  NOT NULL,
 `prenom`  VARCHAR(100) NOT NULL,
 `email`   VARCHAR(180),
 CONSTRAINT un_email UNIQUE(`email`),
 `motdepasse` VARCHAR(200) NOT NULL,
 `date_inscription`  DATETIME NOT NULL DEFAULT current_timestamp(),
 PRIMARY KEY(`id_etudiant`)
);

-- Insertion dans la table Etudiants
INSERT INTO `Etudiants`(`nom`, `prenom`, `email`, `motdepasse`)
VALUES
('jeudy', 'raphael', 'raphaeljeudy@gmail.com', 'rapha1234'),
('jeudy', 'christherveson', 'christhervesonjeudy@gmail.com', 'christ1234'),
('auguste', 'youlens', 'youlensauguste@gmail.com', 'youlens1234');

-- Creation de la table Livres
CREATE TABLE IF NOT EXISTS `Livres`
(
 `id_livre` INT(8) NOT NULL AUTO_INCREMENT,
 `titre`    VARCHAR(100) NOT NULL,
 `auteur`   VARCHAR(100) NOT NULL,
 `annee_publication`  DATE NOT NULL,
 `description`   TEXT NOT NULL,
 `cover_image`   VARCHAR(200) NOT NULL,
 `qte_pages`  INT(3) NOT NULL  DEFAULT 1,
 `disponible` BOOLEAN NOT NULL,
 PRIMARY KEY(`id_livre`)
);

-- Insertion dans la table Livres
INSERT INTO `Livres`
(`titre`, `auteur`, `annee_publication`, `description`, `cover_image`, `qte_pages`, `disponible`)
VALUES
('Intro en Algorithme', 'hjdev', '2022-01-01', 
 "cours sur l'algorithmique, decouvrons ensemble l'univers de l'algorithme avec l'ingenieur hjdev",
 'coverPage/alogo_cover.png',
 120,
 1
),
('Intro en Javascript', 'hjdev', '2023-01-01', 
 "cours sur le javascript moderne, decouvrons ensemble l'univers du langage javascript avec l'ingenieur hjdev",
 'coverPage/javascript_cover.png',
 150,
 1
),
('Intro en informatique quantitique', 'hjdev', '2025-01-01', 
 "cours l'informatique quantique, decouvrons ensemble l'univers de l'informatique quantitique avec l'ingenieur hjdev",
 'coverPage/informatiqueQuantique_cover.png',
 300,
 0
),
('Physique NS3', 'hervé', '2024-03-01', 
 "cours physique, decouvrons ensemble l'univers de la physique avec le professeur Hervé Jeudy",
 'coverPage/physiqueNs3.png',
 100,
 1
),
('Espagnol NS3', 'hervé', '2024-03-01', 
 "cours espagnol, decouvrons ensemble l'univers de la langue espagnol avec le professeur Hervé Jeudy",
 'coverPage/physiqueNs3.png',
 90,
 1
),
('Analyse NS3', 'hervé', '2024-03-01', 
 "cours analyse, decouvrons ensemble l'univers de l'analyse avec le professeur Hervé Jeudy",
 'coverPage/analyseNs3.png',
 250,
 0
);

-- Creation de la table Reservations
CREATE TABLE IF NOT EXISTS `Reservations`
(
 `id_reservation`    INT(8) NOT NULL AUTO_INCREMENT,
 `id_etudiant`       INT(8) NOT NULL,
 `id_livre`          INT(8) NOT NULL,
 `date_reservation`  DATETIME NOT NULL DEFAULT current_timestamp(),
 `statut`            VARCHAR(80) NOT NULL DEFAULT("en attente"),
 CONSTRAINT chk_statut CHECK(statut IN('en attente', 'validee', 'annulee')),
 PRIMARY KEY(`id_reservation`),
 CONSTRAINT fk_reserv_etudiant FOREIGN KEY(`id_etudiant`) 
 REFERENCES `Etudiants`(`id_etudiant`) ON DELETE CASCADE,
 CONSTRAINT fk_reserv_livre   FOREIGN KEY(`id_livre`) 
 REFERENCES `Livres`(`id_livre`) ON DELETE CASCADE
);

-- Insertion dans la table Reservations
INSERT INTO `Reservations`(`id_etudiant`, `id_livre`, `statut`)
VALUES(1, 3, 'en attente');

-- Creation de la table Emprunts
CREATE TABLE IF NOT EXISTS `Emprunts`
(
 `id_emprunt`            INT(8) NOT NULL AUTO_INCREMENT,
 `id_etudiant`           INT(8) NOT NULL,
 `id_livre`              INT(8) NOT NULL,
 `date_reservation`      DATETIME NOT NULL DEFAULT current_timestamp(),
 `date_retour_prevue`    DATE NOT NULL,
 `date_retour_effective` DATE NOT NULL,
 PRIMARY KEY(`id_emprunt`),
 CONSTRAINT fk_empr_etudiant FOREIGN KEY(`id_etudiant`)
 REFERENCES `Etudiants`(`id_etudiant`) ON DELETE CASCADE,
 CONSTRAINT fk_empr_livre FOREIGN KEY(`id_livre`)
 REFERENCES `Livres`(`id_livre`) ON DELETE CASCADE
);

-- Insertion dans la table Emprunts
INSERT INTO `Emprunts`(`id_etudiant`, `id_livre`, `date_retour_prevue`, `date_retour_effective`)
VALUES
(2, 1, '2025-07-11', '2025-07-22'),
(3, 2, '2025-07-11', '2025-07-22');

-- Creation de la table Utilisateurs
CREATE TABLE IF NOT EXISTS `Utilisateurs`
(
 `id_utilisateur`   INT(10) NOT NULL AUTO_INCREMENT,
 `nom_utilisateur`  VARCHAR(100) NOT NULL,
 `motdepasse`       VARCHAR(200) NOT NULL,
 `role`             VARCHAR(80)  NOT NULL,
 CONSTRAINT chk_role CHECK(role IN('admin', 'etudiant')),
 PRIMARY KEY(`id_utilisateur`)
);

-- Insertion dans la table Utilisateurs
INSERT INTO `Utilisateurs`(`nom_utilisateur`, `motdepasse`, `role`)
VALUES
('herve', 'herve1234', 'admin'),
('hjdevadmin', 'hjdev@1234', 'admin');

-- Creation de la table Categories
CREATE TABLE IF NOT EXISTS `Categories`
(
 `id_categorie` INT(8) NOT NULL AUTO_INCREMENT,
 `nom`          VARCHAR(80) NOT NULL,
 `id_livre`     INT(8) NOT NULL,
 PRIMARY KEY(`id_categorie`),
 CONSTRAINT fk_catg_livre FOREIGN KEY(`id_livre`)
 REFERENCES `Livres`(`id_livre`) ON DELETE CASCADE
);

-- Insertion dans la table Categories
INSERT INTO `Categories`(`nom`, `id_livre`)
VALUES
('informatique', 1),
('informatique', 2),
('informatique', 3);
('science physique', 4),
('espagnol NS3', 5),
('analyse NS3', 6);