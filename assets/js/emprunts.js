async function chargementHome(){
    $.ajax({
        url  : `../emprunts/load_emprunts.php`,
        type : 'GET',
        
        success : (data) => {
            if(data == null){
                Swal.fire({
                    type : 'warning',
                    title : "Pas d'emprunts pour le moment",
                    icon : 'warning'
                });
            }else{ 
                const Livres = data.emprunts;
                console.log(Livres);

                let filteredBooks = [...Livres];
                // Afficher les livres
                function displayBooks() {
                    const borrowContainer = document.getElementById('borrowBooks');
                    
                    
                    borrowContainer.innerHTML = '';
                    filteredBooks.forEach(book => {
                        const bookCard = createBookCard(book);
                        
                        if (book.disponible) {
                            borrowContainer.appendChild(bookCard);
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
                            ${book.disponible ? `Emprunté` : 'réservé'}
                        </div>
                        <div class="book-actions">
                            <button class="btn btn-borrow" data-id="${book.id_livre}">Retouner</button>
                        </div>
                    `;

                    document.addEventListener('click', function(e) {
                        if (e.target && e.target.classList.contains('btn-borrow')) {
                            const bookId = parseInt(e.target.getAttribute('data-id'));
                            returnBook(bookId);
                        }
                    });

                     
                    return card;
                }

                // Emprunter un livre
                function returnBook(bookId) {
                    const book = Livres.find(b => b.id_livre === bookId);
                
                    const formHtml = `
                        <form id="formActions" method="POST">
                            <div class="form-group">
                                <label for="date_retour_effective">Date retour effective</label>
                                <input type="date" id="date_retour_effective" name="date_retour_effective">
                            </div>
                        </form>
                    `;
                
                    showModal(`Confirmer le retour du livre : ${book.titre}`, formHtml, () => {
                        const date_retour_effective = document.getElementById('date_retour_effective').value;
                        const id_etudiant  = document.getElementById('id_etudiant').value;
                        console.log("D-E : ", date_retour_effective);
                        // Validation simple
                        if (!date_retour_effective) {
                            Swal.fire('Erreur', 'Veuillez remplir toutes les dates', 'warning');
                            return;
                        }
                
                        // La requete pour faire la logique retour du livre
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