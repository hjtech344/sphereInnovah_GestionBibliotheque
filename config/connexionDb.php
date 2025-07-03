<?php
    class Connexion{

        private static $DB_DNS      = 'mysql:host=localhost;dbname=gestion_bibliotheque';
        private static $DB_USER     = 'root';
        private static $DB_PASSORWD = 'hjdev';
        
        public static function connect(){
            try{
                $PDO = new PDO(self::$DB_DNS, self::$DB_USER, self::$DB_PASSORWD);
                if($PDO){
                    $message = "La connection avec la base de donnée a été bien établit";
                    setcookie("msg_db_success", $message);
                }
            }catch(PDOException $e){
                echo("Erreur lors de la tentative de connexion avec la base de données".
                  $e->getMessage()
                );
            }

            return $PDO;
        }

    }

     
