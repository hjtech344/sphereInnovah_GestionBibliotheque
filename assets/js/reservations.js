async function chargementHome(){
    $.ajax({
        url  : `../reservations/load_reservations.php`,
        type : 'GET',
        
        success : (data) => {
            if(data == null){
                Swal.fire({
                    type : 'warning',
                    title : "Pas de réservations pour le moment",
                    icon : 'warning'
                });
            }else{ 
                const Livres = data.reservations;
                console.log(Livres);

                let filteredBooks = [...Livres];
                // Afficher les livres
                function displayBooks() {
                    const reservedContainer = document.getElementById('reservedBooks');
                    
                    reservedContainer.innerHTML = '';
                    filteredBooks.forEach(book => {
                        const bookCard = createBookCard(book);
                        reservedContainer.appendChild(bookCard);    
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
                            ${book.disponible ? '' : 'réservé'}
                        </div>
                        <div class="book-actions">
                            <button class="btn btn-borrow" data-id="${book.id_livre}">Annuler la réservation</button>
                        </div>
                    `;

                    document.addEventListener('click', function(e) {
                        if (e.target && e.target.classList.contains('btn-borrow')) {
                            const bookId = parseInt(e.target.getAttribute('data-id'));
                            cancelReservedBook(bookId);
                        }
                    });

                    return card;
                }

                // Emprunter un livre
                function cancelReservedBook(bookId) {
                    const book = Livres.find(b => b.id_livre === bookId);
                    const message = "Voulez-vous annulez cette reservation ?";
                
                    showModal(`Confirmer l'annulation de la réservation du livre : ${book.titre}`, message, () => {
                        const date_retour_effective = document.getElementById('date_retour_effective').value;
                        const id_etudiant  = document.getElementById('id_etudiant').value;
                        console.log("D-E : ", date_retour_effective);
                        // Validation simple
                        if (!date_retour_effective) {
                            Swal.fire('Erreur', 'Veuillez remplir toutes les dates', 'warning');
                            return;
                        }
                
                        // La requete pour faire la logique d'annulation du livre
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