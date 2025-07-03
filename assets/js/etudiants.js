async function chargementHome(){
    $.ajax({
        url  : `../livres/livres.php`,
        type : 'GET',
        
        success : (data) => {
            if(data == null){
                Swal.fire({
                    type : 'warning',
                    title : "Pas de livres dans le catalogue",
                    icon : 'warning'
                });
            }else{ 
                const Livres = JSON.parse(data);
                console.log(Livres);

                let filteredBooks = [...Livres];
                // Afficher les livres
                function displayBooks() {
                    const availableContainer = document.getElementById('availableBooks');
                    const unavailableContainer = document.getElementById('unavailableBooks');
                    
                    availableContainer.innerHTML = '';
                    unavailableContainer.innerHTML = '';
                    filteredBooks.forEach(book => {
                        const bookCard = createBookCard(book);
                        
                        if (book.disponible) {
                            availableContainer.appendChild(bookCard);
                        } else {
                            unavailableContainer.appendChild(bookCard);
                        }
                    });
                }

                // Créer une carte de livre
                function createBookCard(book) {
                    const card = document.createElement('div');
                    card.className = `book-card ${!book.disponible ? 'unavailable' : ''}`;
                    
                    card.innerHTML = `
                        <div class="book-title">${book.titre}</div>
                        <div class="book-author">Auteur: ${book.auteur}</div>
                        <div class="book-author">Quantité de pages: ${book.qte_pages}</div>
                        <div class="book-isbn">Année de publication: ${book.annee_publication}</div>
                        <div class="book-status ${book.disponible ? 'status-available' : 'status-unavailable'}">
                            ${book.disponible ? `Disponible` : 'Non disponible'}
                        </div>
                        <div class="book-actions">
                            ${book.disponible ? 
                                `<button class="btn btn-borrow" data-id="${book.id_livre}">Emprunter</button>` : 
                                `<button class="btn btn-reserve" data-id="${book.id_livre}">Réserver</button>`
                            }
                        </div>
                    `;

                    document.addEventListener('click', function(e) {
                        if (e.target && e.target.classList.contains('btn-borrow')) {
                            const bookId = parseInt(e.target.getAttribute('data-id'));
                            borrowBook(bookId);
                        }else if(e.target && e.target.classList.contains('btn-reserve')){
                            const bookId = parseInt(e.target.getAttribute('data-id'));
                            reserveBook(bookId)
                        }
                    });

                     
                    return card;
                }

                // Emprunter un livre
                function borrowBook(bookId) {
                    const book = Livres.find(b => b.id_livre === bookId);
                
                    const formHtml = `
                        <form id="formActions" method="POST">
                            <div class="form-group">
                                <label for="date_retour_prevue">Date retour prévue</label>
                                <input type="datetime-local" id="date_retour_prevue" name="date_retour_prevue">
                            </div>
                            <div class="form-group">
                                <label for="date_retour_effective">Date retour effective</label>
                                <input type="datetime-local" id="date_retour_effective" name="date_retour_effective">
                            </div>
                        </form>
                    `;
                
                    showModal(`Confirmer l'emprunt du livre : ${book && book.titre}`, formHtml, () => {
                        const date_retour_prevue = document.getElementById('date_retour_prevue').value;
                        const date_retour_effective = document.getElementById('date_retour_effective').value;
                        const id_etudiant  = document.getElementById('id_etudiant').value;
                        console.log("D-P : ",date_retour_effective, "D-E : ", date_retour_effective);
                        // Validation simple
                        if (!date_retour_prevue || !date_retour_effective) {
                            Swal.fire('Erreur', 'Veuillez remplir toutes les dates', 'warning');
                            return;
                        }
                
                        $.ajax({
                            url: '../livres/actions.php',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                id_livre: book.id_livre,
                                id_etudiant: id_etudiant, 
                                disponible: book.disponible,
                                date_retour_prevue,
                                date_retour_effective
                            },
                            success: function (response) {
                                if (response && response.success) {
                                    closeModal();
                                    displayBooks();
                                    Swal.fire('Succès', 'Livre emprunté avec succès !', 'success');
                                } else {
                                    Swal.fire('Erreur', 'Échec de l\'emprunt.', 'error');
                                }
                            },
                            error: function (xhr) {
                                console.error('Erreur AJAX :', xhr);
                                Swal.fire('Erreur', 'Une erreur est survenue.', 'error');
                            }
                        });
                    });
                }
                

                // Réserver un livre
                function reserveBook(bookId) {
                    const book = Livres.find(b => b.id_livre === bookId);
                    const id_etudiant  = document.getElementById('id_etudiant').value;
                    showModal(`Confirmer la réservation`, `voulez-vous reservez le livre ${book && book.titre}`, () => { 
                        $.ajax({
                            url: '../livres/actions.php',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                id_livre: book.id_livre,
                                id_etudiant: id_etudiant, 
                            },
                            success: function (response) {
                                if (response && response.success) {
                                    closeModal();
                                    displayBooks();
                                    Swal.fire('Succès', 'Livre reservé avec succès !', 'success');
                                } else {
                                    Swal.fire('Erreur', 'Échec lors de la reservation.', 'error');
                                }
                            },
                            error: function (xhr) {
                                console.error('Erreur AJAX :', xhr);
                                Swal.fire('Erreur', 'Une erreur est survenue.', 'error');
                            }
                        });
                    });
                }

                // Initialiser l'affichage
                displayBooks()
            }
        }
    })
} 
    
chargementHome();

// Afficher le modal
function showModal(title, message, onConfirm){
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').innerHTML = message;
    document.getElementById('confirmBtn').onclick = onConfirm;
    document.getElementById('confirmModal').style.display = 'block';
}

// Fermer le modal
function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
}
// Fermer le modal en cliquant sur X ou en dehors
document.querySelector('.close').onclick = closeModal;
window.onclick = function(event) {
    const modal = document.getElementById('confirmModal');
    if (event.target === modal) {
        closeModal();
    }
}
