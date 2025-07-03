// Variables globales
let currentForm = 'login';
// Fonction pour changer de formulaire
function switchForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    // Gérer l'affichage des formulaires
    if (formType === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        toggleBtns[0].classList.add('active');
        toggleBtns[1].classList.remove('active');
        currentForm = 'login';
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        toggleBtns[1].classList.add('active');
        toggleBtns[0].classList.remove('active');
        currentForm = 'register';
    }
}
    
// Fonction pour afficher/masquer le mot de passe
function togglePassword(inputId) {
     const input = document.getElementById(inputId);
     const button = input.nextElementSibling;
     
     if (input.type === 'password') {
         input.type = 'text';
         button.textContent = '🙈';
     } else {
         input.type = 'password';
         button.textContent = '👁️';
     }
}


$('#login-form').on('submit', function(e){
    e.preventDefault();
    const email      = $('#login-email').val();
    const motdepasse = $('#login-password').val();
    console.log('email : ', email + ' password : ', motdepasse);
    
    if(email.length == '' && motdepasse.length == ''){
        Swal.fire({
            type : 'warning',
            title : 'Les champs email et mot de passe sont réquis',
            icon : 'warning'
        });
        return false;
    }else{
        $.ajax({
            url : '../classes/auth/login.php',
            type : 'POST',
            datatype : 'json',
            data : {email : email, motdepasse: motdepasse},

            success : (data) => {
                if(data == 'null'){
                    Swal.fire({
                        type : 'error',
                        title : 'Email ou/et Mot de passe sont incorrect',
                        icon : 'error'
                    });
                }else{
                    Swal.fire({
                        type  : 'success',
                        title : 'Connexion reussi',
                        icon  : 'success'
                    }).then((res) => {
                        if(res.value){
                            window.location.href = '../etudiants/index.php';
                        }
                    })
                }
            },
        });
    }

});

// Gerer l'authentification avec Jquery et ajax
$('#register-form').on('submit', function(e){
   e.preventDefault();
   const nom                = $('#register-nom').val();
   const prenom             = $('#register-prenom').val();
   const email              = $('#register-email').val();
   const motdepasse         = $('#register-password').val();
   const confirm_motdepasse = $('#register-confirm-password').val();

    if(nom.length == '' && prenom == '' && email.length == '' 
      && motdepasse.length == '' && confirm_motdepasse.length == ''
    ){
        Swal.fire({
          type : 'warning',
          title : 'Toutes les champs sont réquis',
          icon : 'warning'
        });
        return false; 
    }else{
        if(motdepasse != confirm_motdepasse){
            Swal.fire({
              type : 'warning',
              title : 'Les mots de passe ne sont pas identiques',
              icon : 'warning'
            });
            return false; 
        }

        $.ajax({
            url      : '../classes/auth/register.php',
            type     : 'POST',
            datatype : 'json',
            data     : { 
                nom        : nom,
                prenom     : prenom,
                email      : email,
                motdepasse : motdepasse
            },

            success : (data) => {
                if(data == null){
                    Swal.fire({
                        type : 'warning',
                        title : "Oup's une erreur s'est produite lors de l'inscription",
                        icon : 'warning'
                    });
                    return false;  
                }else{
                    Swal.fire({
                        type : 'success',
                        title : "L'inscription de l'étudiant a été bien reussi",
                        icon : 'success'
                    }).then((res) => {
                        if(res.value){
                            window.location.href = '../etudiants/index.php';
                        }
                    })
                }
            },

            error : (xhr) => {
              console.log('Erreur lors de la soummision du formulaire ! ',xhr);
            }
        })
    }
});

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Focus sur le premier champ du formulaire actif
    document.getElementById('login-email').focus();
});
    