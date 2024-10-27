// New Yaki

function loadInitialData() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            adminCredentials.username = data.adminCredentials.username;
            adminCredentials.password = data.adminCredentials.password;
            books = data.books;
            comments = data.comments;
            displayBooks(books);
            loadBooksTable();
        })
        .catch(error => console.error('Error:', error));
}

// Call this function when the page loads
window.addEventListener('DOMContentLoaded', loadInitialData);





// Event listener for changing the username



       document.getElementById('change-username-btn').addEventListener('click', function() {
        const newUsername = prompt('Enter new username:');
        if (newUsername) {
            adminCredentials.username = newUsername;
            localStorage.setItem('adminUsername', newUsername);  // Persist in localStorage
            alert('Username successfully changed and saved.');
        }
    });
    
    // Event listener for changing the password
    document.getElementById('change-password-btn').addEventListener('click', function() {
        const newPassword = prompt('Enter new password:');
        if (newPassword) {
            adminCredentials.password = newPassword;
            localStorage.setItem('adminPassword', newPassword);  // Persist in localStorage
            alert('Password successfully changed and saved.');
        }
    });
    
                // ... (keep the existing JavaScript code) ...
                    // Include all scripts from index.html
            // Books data (replace with actual book data)
            let books = [
                { id: 1, title: "The Quran", image: "https://i.ytimg.com/vi/tVlcKp3bWH8/maxresdefault.jpg", description: "The holy book of Islam.", downloadUrl: "https://drive.google.com/file/d/1OpELNgClnL4gOex0aEsr3SILfCur_TH9/view?usp=drive_link" },
                { id: 2, title: "Sahih Al-Bukhari", image: "/placeholder.svg?height=200&width=150", description: "A collection of hadith compiled by Imam Al-Bukhari.", downloadUrl: "#" },
                { id: 3, title: "The Sealed Nectar", image: "/placeholder.svg?height=200&width=150", description: "Biography of Prophet Muhammad.", downloadUrl: "#" },
                { id: 4, title: "The Sealed", image: "/placeholder.svg?height=200&width=150", description: "Biography of Prophet Muhammad.", downloadUrl: "#" },
            ];
    
            const bookGrid = document.getElementById('book-grid');
            const bookPreview = document.getElementById('book-preview');
            const closePreview = document.getElementById('close-preview');
            const previewTitle = document.getElementById('preview-title');
            const previewImage = document.getElementById('preview-image');
            const previewDescription = document.getElementById('preview-description');
            const previewDownload = document.getElementById('preview-download');
            const bookSearch = document.getElementById('book-search');
            const commentForm = document.getElementById('comment-form');
            const commentsList = document.getElementById('comments-list');
    
            // Display books
      // Modify the displayBooks function
      function displayBooks(booksToDisplay) {
                bookGrid.innerHTML = '';
                booksToDisplay.forEach(book => {
                    const bookItem = document.createElement('div');
                    bookItem.classList.add('book-item');
                    bookItem.innerHTML = `
                        <img src="${book.image}" alt="${book.title}" onerror="handleImageError(this)">
                        <h3>${book.title}</h3>
                    `;
                    bookItem.addEventListener('click', () => showBookPreview(book));
                    bookGrid.appendChild(bookItem);
                });
            }
    
            // Show book preview
            function showBookPreview(book) {
                currentBookId = book.id;
                previewTitle.textContent = book.title;
                previewImage.src = book.image;
                previewImage.alt = book.title;
                previewDescription.textContent = book.description;
                previewDownload.href = book.downloadUrl;
                bookPreview.classList.add('active');
                displayComments(book.id);
            }
            // New Yaki
              // Add these functions for admin comment management
              function loadAdminComments() {
                const adminCommentsList = document.createElement('div');
                adminCommentsList.id = 'admin-comments-list';
                adminPanel.appendChild(adminCommentsList);
    
                comments.forEach(comment => {
                    const commentElement = createAdminCommentElement(comment);
                    adminCommentsList.appendChild(commentElement);
                });
            }
    
            function createAdminCommentElement(comment) {
                const commentElement = document.createElement('div');
                commentElement.classList.add('admin-comment');
                commentElement.innerHTML = `
                    <p>${comment.text}</p>
                    <div class="admin-comment-actions">
                        <button onclick="replyToComment(${comment.id})">Reply</button>
                        <button onclick="deleteComment(${comment.id})">Delete</button>
                    </div>
                `;
                return commentElement;
            }
    
            function replyToComment(commentId) {
                const reply = prompt('Enter your reply:');
                if (reply) {
                    const comment = comments.find(c => c.id === commentId);
                    if (comment) {
                        comment.text += `\nAdmin reply: ${reply}`;
                        saveComments();
                        loadAdminComments();
                        displayComments(currentBookId);
                    }
                }
            }
    
            function deleteComment(commentId) {
                if (confirm('Are you sure you want to delete this comment?')) {
                    comments = comments.filter(c => c.id !== commentId);
                    saveComments();
                    loadAdminComments();
                    displayComments(currentBookId);
                }
            }
    
            // Close book preview
            closePreview.addEventListener('click', () => {
                bookPreview.classList.remove('active');
            });
    
            // Search functionality
            bookSearch.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredBooks = books.filter(book => 
                    book.title.toLowerCase().includes(searchTerm) || 
                    book.description.toLowerCase().includes(searchTerm)
                );
                displayBooks(filteredBooks);
            });
    
            // Comment functionality
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const commentText = document.getElementById('comment-text').value;
                if (commentText.trim() !== '') {
                    const newComment = {
                        id: Date.now(),
                        text: commentText,
                        bookId: currentBookId
                    };
                    comments.push(newComment);
                    saveComments();
                    displayComments(currentBookId);
                    document.getElementById('comment-text').value = '';
                }
            });
    
            function displayComments(bookId) {
                const bookComments = comments.filter(comment => comment.bookId === bookId);
                commentsList.innerHTML = '';
                bookComments.forEach(comment => {
                    const commentItem = document.createElement('li');
                    commentItem.classList.add('comment-item');
                    commentItem.textContent = comment.text;
                    commentsList.appendChild(commentItem);
                });
            }
    
            function saveComments() {
                localStorage.setItem('comments', JSON.stringify(comments));
            }
    
            // Load comments from localStorage on page load
            window.addEventListener('DOMContentLoaded', () => {
                const storedUsername = localStorage.getItem('adminUsername');
        const storedPassword = localStorage.getItem('adminPassword');
        
        if (storedUsername) {
        adminCredentials.username = storedUsername;
    }
    if (storedPassword) {
        adminCredentials.password = storedPassword;
    }
                const storedComments = localStorage.getItem('comments');
                if (storedComments) {
                    comments = JSON.parse(storedComments);
                }})
    
            // Initial display of books
            displayBooks(books);
    
            // Scroll animation
            const sections = document.querySelectorAll('section');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
    
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
    
            sections.forEach(section => {
                observer.observe(section);
            });
                    // Mobile menu toggle
                    const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const dropdowns = document.querySelectorAll('.dropdown');
    
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
    
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            });
    
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && e.target !== menuToggle) {
                    navLinks.classList.remove('active');
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                }
            });
    
            // Resize handler to reset menu state
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navLinks.classList.remove('active');
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                }
            });
    
            // Add these new variables and functions for admin functionality
            const adminCredentials = {
                username: 'jamshed',
                password: 'qw4HD123!@#'
            };
            
            // let comments = [];
            // let currentBookId = null;
            let comments = [];
            let currentBookId = null;
            const booksAdminBtn = document.getElementById('books-admin-btn');
            const adminLoginForm = document.getElementById('admin-login-form');
            const adminPanel = document.getElementById('admin-panel');
            const loginForm = document.getElementById('login-form');
            const logoutBtn = document.getElementById('logout-btn');
            const addBookForm = document.getElementById('add-book-form');
            const booksTable = document.getElementById('books-table').getElementsByTagName('tbody')[0];
    
            let isEditing = false;
            let editingBookId = null;
    
            booksAdminBtn.addEventListener('click', () => {
                adminLoginForm.classList.add('active');
            });
    
            loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const storedUsername = localStorage.getItem('adminUsername') || adminCredentials.username;
        const storedPassword = localStorage.getItem('adminPassword') || adminCredentials.password;
        
        if (username === storedUsername && password === storedPassword) {
            adminLoginForm.classList.remove('active');
            adminPanel.classList.add('active');
            loadBooksTable();
        } else {
            alert('Invalid credentials');
        }
    });
    
            logoutBtn.addEventListener('click', () => {
                adminPanel.classList.remove('active');
                loginForm.reset();
            });
            // Add this code after the existing logoutBtn event listener
    
    const backupBtn = document.createElement('button');
    backupBtn.textContent = 'Backup';
    backupBtn.classList.add('btn');
    backupBtn.addEventListener('click', handleBackup);
    
    const restoreBtn = document.createElement('button');
    restoreBtn.textContent = 'Restore';
    restoreBtn.classList.add('btn');
    restoreBtn.addEventListener('click', handleRestore);
    
    // Insert the new buttons after the logout button
    logoutBtn.parentNode.insertBefore(restoreBtn, logoutBtn.nextSibling);
    logoutBtn.parentNode.insertBefore(backupBtn, logoutBtn.nextSibling);
    
    function handleBackup() {
        fetch('/api/backup', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                const backupString = JSON.stringify(data);
                const blob = new Blob([backupString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'admin_backup.json';
                a.click();
                URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error:', error));
    }
        const backupString = JSON.stringify(backupData);
        const blob = new Blob([backupString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'admin_backup.json';
        a.click();
        URL.revokeObjectURL(url);
    
        function handleRestore() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        try {
                            const restoredData = JSON.parse(e.target.result);
                            fetch('/api/restore', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(restoredData),
                            })
                            .then(response => response.json())
                            .then(data => {
                                alert('Data restored successfully!');
                                location.reload(); // Reload the page to reflect changes
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('Error restoring data. Please try again.');
                            });
                        } catch (error) {
                            alert('Error restoring data. Please check the file format.');
                        }
                    };
                    reader.readAsText(file);
                }
            };
            input.click();
        }
                reader.readAsText(file);
        input.click();
    
            addBookForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const newBook = {
                    id: isEditing ? editingBookId : Date.now(),
                    title: document.getElementById('book-title').value,
                    image: document.getElementById('book-image').value,
                    description: document.getElementById('book-description').value,
                    downloadUrl: document.getElementById('book-download').value
                };
    
                if (isEditing) {
                    const index = books.findIndex(book => book.id === editingBookId);
                    if (index !== -1) {
                        books[index] = newBook;
                    }
                    isEditing = false;
                    editingBookId = null;
                } else {
                    books.push(newBook);
                }
    
                saveBooks();
                loadBooksTable();
                displayBooks(books);
                addBookForm.reset();
            });
    
            // Modify the loadBooksTable function
            // Modify the loadBooksTable function to include loadAdminComments
            function loadBooksTable() {
                booksTable.innerHTML = '';
                books.forEach(book => {
                    const row = booksTable.insertRow();
                    row.innerHTML = `
                        <td>${book.title}</td>
                        <td>
                            <button onclick="editBook(${book.id})">Edit</button>
                            <button onclick="deleteBook(${book.id})">Delete</button>
                        </td>
                    `;
                });
                loadAdminComments();
            }
    
            function editBook(id) {
                const book = books.find(b => b.id === id);
                if (book) {
                    document.getElementById('book-title').value = book.title;
                    document.getElementById('book-image').value = book.image;
                    document.getElementById('book-description').value = book.description;
                    document.getElementById('book-download').value = book.downloadUrl;
                    isEditing = true;
                    editingBookId = id;
                }
            }
    
            function deleteBook(id) {
                if (confirm('Are you sure you want to delete this book?')) {
                    books = books.filter(b => b.id !== id);
                    saveBooks();
                    loadBooksTable();
                    displayBooks(books);
                }
            }
            function saveBooks() {
                fetch('/api/restore', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ adminCredentials, books, comments }),
                })
                .then(response => response.json())
                .then(data => console.log('Books saved successfully'))
                .catch(error => console.error('Error:', error));
            }
    // New Yaki
            // Add this function to handle image loading errors
            function handleImageError(img) {
                img.src = 'https://via.placeholder.com/150x200?text=No+Image';
                img.alt = 'No image available';
            }
            // Load books from localStorage on page load
                          // Modify the displayBooks function
                          function displayBooks(booksToDisplay) {
                bookGrid.innerHTML = '';
                booksToDisplay.forEach(book => {
                    const bookItem = document.createElement('div');
                    bookItem.classList.add('book-item');
                    bookItem.innerHTML = `
                        <img src="${book.image}" alt="${book.title}" onerror="handleImageError(this)">
                        <h3>${book.title}</h3>
                    `;
                    bookItem.addEventListener('click', () => showBookPreview(book));
                    bookGrid.appendChild(bookItem);
                });
            }
           // Modify the window.addEventListener for DOMContentLoaded
       // Modify the window.addEventListener for DOMContentLoaded
// Modify the window.addEventListener for DOMContentLoaded

window.addEventListener('DOMContentLoaded', () => {
    loadData();
    displayBooks(books);
    loadBooksTable();
});
                displayBooks(books);
                loadBooksTable();
    
                // New Extreme Gandu Yaki
    
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const commentText = document.getElementById('comment-text').value.trim();
                if (commentText !== '') {
                    addComment(commentText, currentBookId);
                    document.getElementById('comment-text').value = '';
                }
            });
    
            function addComment(text, bookId) {
                const newComment = {
                    id: Date.now(),
                    text: text,
                    bookId: bookId
                };
                comments.push(newComment);
                saveComments();
                displayComments(bookId);
                if (adminPanel.classList.contains('active')) {
                    loadAdminComments();
                }
            }
    
            function displayComments(bookId) {
                const bookComments = comments.filter(comment => comment.bookId === bookId);
                commentsList.innerHTML = '';
                bookComments.forEach(comment => {
                    const commentItem = document.createElement('li');
                    commentItem.classList.add('comment-item');
                    commentItem.textContent = comment.text;
                    commentsList.appendChild(commentItem);
                });
            }
    
            function saveComments() {
                fetch('/api/restore', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ adminCredentials, books, comments }),
                })
                .then(response => response.json())
                .then(data => console.log('Comments saved successfully'))
                .catch(error => console.error('Error:', error));
            }
    
            // Optimize the admin comment management
            function loadAdminComments() {
                const adminCommentsList = document.getElementById('admin-comments-list') || document.createElement('div');
                adminCommentsList.id = 'admin-comments-list';
                adminCommentsList.innerHTML = '';
                
                comments.forEach(comment => {
                    const commentElement = createAdminCommentElement(comment);
                    adminCommentsList.appendChild(commentElement);
                });
    
                if (!document.getElementById('admin-comments-list')) {
                    adminPanel.appendChild(adminCommentsList);
                }
            }
    
            function createAdminCommentElement(comment) {
                const commentElement = document.createElement('div');
                commentElement.classList.add('admin-comment');
                commentElement.innerHTML = `
                    <p>${comment.text}</p>
                    <div class="admin-comment-actions">
                        <button onclick="replyToComment(${comment.id})">Reply</button>
                        <button onclick="deleteComment(${comment.id})">Delete</button>
                    </div>
                `;
                return commentElement;
            }
    
            function replyToComment(commentId) {
                const reply = prompt('Enter your reply:');
                if (reply && reply.trim() !== '') {
                    const comment = comments.find(c => c.id === commentId);
                    if (comment) {
                        comment.text += `\nAdmin reply: ${reply.trim()}`;
                        saveComments();
                        loadAdminComments();
                        displayComments(currentBookId);
                    }
                }
            }
            // Add a function to simulate synchronization
function simulateSync() {
    console.log('Syncing data...');
    // In a real-world application, you would send the data to a server here
    // For now, we'll just simulate a delay
    setTimeout(() => {
        console.log('Data synced successfully');
    }, 1000);
}
// Add a function to load data from localStorage
function loadData() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
        comments = JSON.parse(storedComments);
    }
}

// Add a function to check for updates
function checkForUpdates() {
    // In a real-world application, you would fetch the latest data from the server here
    // For now, we'll just reload the data from localStorage
    loadData();
    displayBooks(books);
    if (currentBookId) {
        displayComments(currentBookId);
    }
    loadBooksTable();
}

// Add an interval to check for updates every 30 seconds
setInterval(checkForUpdates, 30000);
    
            function deleteComment(commentId) {
                if (confirm('Are you sure you want to delete this comment?')) {
                    comments = comments.filter(c => c.id !== commentId);
                    saveComments();
                    loadAdminComments();
                    displayComments(currentBookId);
                }}