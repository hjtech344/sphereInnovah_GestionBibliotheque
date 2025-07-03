// Données simulées
let books = [
    {
        id: 1,
        title: "Introduction à l'Intelligence Artificielle",
        author: "Dr. Marie Dubois",
        isbn: "978-2-1234-5678-9",
        category: "Informatique",
        year: 2023,
        quantity: 3,
        available: 2,
        status: "available"
    },
    {
        id: 2,
        title: "Histoire de France Contemporaine",
        author: "Prof. Jean Martin",
        isbn: "978-2-9876-5432-1",
        category: "Histoire",
        year: 2022,
        quantity: 2,
        available: 0,
        status: "borrowed"
    },
    {
        id: 3,
        title: "Chimie Organique Avancée",
        author: "Dr. Sophie Laurent",
        isbn: "978-2-5555-1111-3",
        category: "Sciences",
        year: 2024,
        quantity: 1,
        available: 1,
        status: "available"
    }
];
let reservations = [
    {
        id: 1,
        bookId: 2,
        bookTitle: "Histoire de France Contemporaine",
        studentName: "Alice Moreau",
        studentId: "STU2024001",
        email: "alice.moreau@universite.fr",
        reservationDate: "2024-06-25",
        status: "pending"
    },
    {
        id: 2,
        bookId: 1,
        bookTitle: "Introduction à l'Intelligence Artificielle",
        studentName: "Pierre Durand",
        studentId: "STU2024002",
        email: "pierre.durand@universite.fr",
        reservationDate: "2024-06-28",
        status: "pending"
    },
    {
        id: 3,
        bookId: 3,
        bookTitle: "Chimie Organique Avancée",
        studentName: "Emma Leroy",
        studentId: "STU2024003",
        email: "emma.leroy@universite.fr",
        reservationDate: "2024-06-29",
        status: "approved"
    }
];
let editingBookId = null;
let confirmCallback = null;
// Initialiser la page
window.onload = function() {
    displayBooks();
    displayReservations();
    updateStats();
};
// Fonction pour ajouter un livre
function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const isbn = document.getElementById('bookISBN').value.trim();
    const category = document.getElementById('bookCategory').value;
    const year = document.getElementById('bookYear').value;
    const quantity = parseInt(document.getElementById('bookQuantity').value) || 1;
    if (!title || !author || !isbn || !category || !year) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }
    // Vérifier si l'ISBN existe déjà
    if (books.some(book => book.isbn === isbn)) {
        alert('Un livre avec cet ISBN existe déjà');
        return;
    }
    const newBook = {
        id: Date.now(),
        title,
        author,
        isbn,
        category,
        year: parseInt(year),
        quantity,
        available: quantity,
        status: 'available'
    };
    books.push(newBook);
    clearBookForm();
    displayBooks();
    updateStats();
    
    // Animation de succès
    showSuccessMessage('Livre ajouté avec succès !');
}
// Fonction pour mettre à jour un livre
function updateBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const isbn = document.getElementById('bookISBN').value.trim();
    const category = document.getElementById('bookCategory').value;
    const year = document.getElementById('bookYear').value;
    const quantity = parseInt(document.getElementById('bookQuantity').value) || 1;
    if (!title || !author || !isbn || !category || !year) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }
    const bookIndex = books.findIndex(book => book.id === editingBookId);
    if (bookIndex !== -1) {
        const oldQuantity = books[bookIndex].quantity;
        const oldAvailable = books[bookIndex].available;
        const borrowed = oldQuantity - oldAvailable;
        
        books[bookIndex] = {
            ...books[bookIndex],
            title,
            author,
            isbn,
            category,
            year: parseInt(year),
            quantity,
            available: Math.max(0, quantity - borrowed),
            status: quantity > borrowed ? 'available' : 'borrowed'
        };
        cancelEdit();
        displayBooks();
        updateStats();
        showSuccessMessage('Livre mis à jour avec succès !');
    }
}
// Fonction pour éditer un livre
function editBook(id) {
    const book = books.find(b => b.id === id);
    if (book) {
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookISBN').value = book.isbn;
        document.getElementById('bookCategory').value = book.category;
        document.getElementById('bookYear').value = book.year;
        document.getElementById('bookQuantity').value = book.quantity;
        editingBookId = id;
        document.getElementById('updateBtn').style.display = 'inline-block';
        document.getElementById('cancelBtn').style.display = 'inline-block';
        
        // Scroll vers le formulaire
        document.querySelector('.dashboard').scrollIntoView({ behavior: 'smooth' });
    }
}
// Fonction pour annuler l'édition
function cancelEdit() {
    editingBookId = null;
    clearBookForm();
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('cancelBtn').style.display = 'none';
}
// Fonction pour supprimer un livre
function deleteBook(id) {
    const book = books.find(b => b.id === id);
    if (book) {
        showConfirmModal(`Êtes-vous sûr de vouloir supprimer le livre "${book.title}" ?`, () => {
            books = books.filter(b => b.id !== id);
            displayBooks();
            updateStats();
            showSuccessMessage('Livre supprimé avec succès !');
        });
    }
}
// Fonction pour valider une réservation
function approveReservation(id) {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
        showConfirmModal(`Approuver la réservation de "${reservation.bookTitle}" pour ${reservation.studentName} ?`, () => {
            reservation.status = 'approved';
            
            // Mettre à jour la disponibilité du livre
            const book = books.find(b => b.id === reservation.bookId);
            if (book && book.available > 0) {
                book.available--;
                if (book.available === 0) {
                    book.status = 'borrowed';
                }
            }
            
            displayReservations();
            displayBooks();
            updateStats();
            showSuccessMessage('Réservation approuvée !');
        });
    }
}
// Fonction pour rejeter une réservation
function rejectReservation(id) {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
        showConfirmModal(`Rejeter la réservation de "${reservation.bookTitle}" pour ${reservation.studentName} ?`, () => {
            reservation.status = 'rejected';
            displayReservations();
            updateStats();
            showSuccessMessage('Réservation rejetée !');
        });
    }
}
// Fonction pour supprimer une réservation
function deleteReservation(id) {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
        showConfirmModal(`Supprimer définitivement cette réservation ?`, () => {
            reservations = reservations.filter(r => r.id !== id);
            displayReservations();
            updateStats();
            showSuccessMessage('Réservation supprimée !');
        });
    }
}
// Fonction pour afficher les livres
function displayBooks() {
    const booksList = document.getElementById('booksList');
    if (books.length === 0) {
        booksList.innerHTML = '<p style="text-align: center; color: #7f8c8d; font-style: italic;">Aucun livre enregistré</p>';
        return;
    }
    booksList.innerHTML = books.map(book => `
        <div class="book-card">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p><strong>Auteur:</strong> ${book.author}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Catégorie:</strong> ${book.category}</p>
                <p><strong>Année:</strong> ${book.year}</p>
                <p><strong>Quantité:</strong> ${book.available}/${book.quantity} disponible(s)</p>
                <p><strong>Statut:</strong> <span class="status-badge status-${book.status}">${book.status === 'available' ? 'Disponible' : 'Emprunté'}</span></p>
            </div>
            <div class="book-actions">
                <button class="btn btn-warning" onclick="editBook(${book.id})">Modifier</button>
                <button class="btn btn-danger" onclick="deleteBook(${book.id})">Supprimer</button>
            </div>
        </div>
    `).join('');
}
// Fonction pour filtrer les réservations
function filterReservations() {
    const searchTerm = document.getElementById('searchReservations').value.toLowerCase();
    const filteredReservations = reservations.filter(reservation => 
        reservation.bookTitle.toLowerCase().includes(searchTerm) ||
        reservation.studentName.toLowerCase().includes(searchTerm) ||
        reservation.studentId.toLowerCase().includes(searchTerm) ||
        reservation.email.toLowerCase().includes(searchTerm)
    );
    
    const reservationsList = document.getElementById('reservationsList');
    if (filteredReservations.length === 0) {
        reservationsList.innerHTML = '<p style="text-align: center; color: #7f8c8d; font-style: italic;">Aucune réservation trouvée</p>';
        return;
    }
    reservationsList.innerHTML = filteredReservations.map(reservation => `
        <div class="reservation-card">
            <div class="reservation-info">
                <h3>${reservation.bookTitle}</h3>
                <p><strong>Étudiant:</strong> ${reservation.studentName}</p>
                <p><strong>ID Étudiant:</strong> ${reservation.studentId}</p>
                <p><strong>Email:</strong> ${reservation.email}</p>
                <p><strong>Date:</strong> ${reservation.reservationDate}</p>
                <p><strong>Statut:</strong> <span class="status-badge status-${reservation.status}">${getStatusText(reservation.status)}</span></p>
            </div>
            <div class="reservation-actions">
                ${reservation.status === 'pending' ? `
                    <button class="btn btn-success" onclick="approveReservation(${reservation.id})">Approuver</button>
                    <button class="btn btn-danger" onclick="rejectReservation(${reservation.id})">Rejeter</button>
                ` : ''}
                <button class="btn btn-danger" onclick="deleteReservation(${reservation.id})">Supprimer</button>
            </div>
        </div>
    `).join('');
}
// Fonction pour vider le formulaire
function clearBookForm() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookISBN').value = '';
    document.getElementById('bookCategory').value = '';
    document.getElementById('bookYear').value = '';
    document.getElementById('bookQuantity').value = '1';
}
// Fonction pour afficher le modal de confirmation
function showConfirmModal(message, callback) {
    document.getElementById('confirmMessage').textContent = message;
    document.getElementById('confirmModal').style.display = 'block';
    confirmCallback = callback;
}
// Fonction pour fermer le modal
function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
    confirmCallback = null;
}
// Fonction pour confirmer l'action
function confirmAction() {
    if (confirmCallback) {
        confirmCallback();
    }
    closeModal();
}
// Fonction pour afficher un message de succès
function showSuccessMessage(message) {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(46, 204, 113, 0.4);
        z-index: 1001;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Ajouter l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}
// Fermer le modal en cliquant à l'extérieur
window.onclick = function(event) {
    const modal = document.getElementById('confirmModal');
    if (event.target === modal) {
        closeModal();
    }
};
// Gestion des touches clavier
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
    if (event.key === 'Enter' && document.getElementById('confirmModal').style.display === 'block') {
        confirmAction();
    }
});
// Animation au scroll
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.book-card, .reservation-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});
// Initialiser l'animation des cartes
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .book-card, .reservation-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);
});
// Fonction pour afficher les réservations
function displayReservations() {
    const reservationsList = document.getElementById('reservationsList');
    const pendingReservations = reservations.filter(r => r.status === 'pending' || r.status === 'approved' || r.status === 'rejected');
    
    if (pendingReservations.length === 0) {
        reservationsList.innerHTML = '<p style="text-align: center; color: #7f8c8d; font-style: italic;">Aucune réservation en attente</p>';
        return;
    }

    reservationsList.innerHTML = pendingReservations.map(reservation => `
        <div class="reservation-card">
            <div class="reservation-info">
                <h3>${reservation.bookTitle}</h3>
                <p><strong>Étudiant:</strong> ${reservation.studentName}</p>
                <p><strong>ID Étudiant:</strong> ${reservation.studentId}</p>
                <p><strong>Email:</strong> ${reservation.email}</p>
                <p><strong>Date:</strong> ${reservation.reservationDate}</p>
                <p><strong>Statut:</strong> <span class="status-badge status-${reservation.status}">${getStatusText(reservation.status)}</span></p>
            </div>
            <div class="reservation-actions">
                ${reservation.status === 'pending' ? `
                    <button class="btn btn-success" onclick="approveReservation(${reservation.id})">Approuver</button>
                    <button class="btn btn-danger" onclick="rejectReservation(${reservation.id})">Rejeter</button>
                ` : ''}
                <button class="btn btn-danger" onclick="deleteReservation(${reservation.id})">Supprimer</button>
            </div>
        </div>
    `).join('');
}

// Fonction pour obtenir le texte du statut
function getStatusText(status) {
    switch(status) {
        case 'pending': return 'En Attente';
        case 'approved': return 'Approuvé';
        case 'rejected': return 'Rejeté';
        default: return status;
    }
}

// Fonction pour mettre à jour les statistiques
function updateStats() {
    document.getElementById('totalBooks').textContent = books.length;
    document.getElementById('availableBooks').textContent = books.filter(b => b.status === 'available').length;
    document.getElementById('borrowedBooks').textContent = books.filter(b => b.status === 'borrowed').length;
    document.getElementById('pendingReservations').textContent = reservations.filter(r => r.status === 'pending').length;
}

// Fonction pour filtrer les livres
function filterBooks() {
    const searchTerm = document.getElementById('searchBooks').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm) ||
        book.isbn.includes(searchTerm)
    );
    
    const booksList = document.getElementById('booksList');
    if (filteredBooks.length === 0) {
        booksList.innerHTML = '<p style="text-align: center; color: #7f8c8d; font-style: italic;">Aucun livre trouvé</p>';
        return;
    }

    booksList.innerHTML = filteredBooks.map(book => `
        <div class="book-card">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p><strong>Auteur:</strong> ${book.author}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Catégorie:</strong> ${book.category}</p>
                <p><strong>Année:</strong> ${book.year}</p>
            </div>
        </div>
    `)
}
