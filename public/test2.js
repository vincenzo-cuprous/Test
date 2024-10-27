        // Sample book data
        let books = [
            { 
                title: "To Kill a Mockingbird", 
                author: "Harper Lee", 
                image: "https://example.com/mockingbird.jpg",
                description: "A classic novel about racial injustice and the loss of innocence  in a small Southern town.",
                downloadUrl: "#",
                comments: []
            },
            { 
                title: "1984", 
                author: "George Orwell", 
                image: "https://example.com/1984.jpg",
                description: "A dystopian novel set in a totalitarian society, exploring themes of mass surveillance and control.",
                downloadUrl: "#",
                comments: []
            },
            { 
                title: "Pride and Prejudice", 
                author: "Jane Austen", 
                image: "https://example.com/pride.jpg",
                description: "A romantic novel following the emotional development of Elizabeth Bennet in Georgian England.",
                downloadUrl: "#",
                comments: []
            },
            { 
                title: "The Great Gatsby", 
                author: "F. Scott Fitzgerald", 
                image: "https://example.com/gatsby.jpg",
                description: "A novel depicting the lavish lifestyle of wealthy Americans during the Roaring Twenties.",
                downloadUrl: "#",
                comments: []
            },
            { 
                title: "Moby Dick", 
                author: "Herman Melville", 
                image: "https://example.com/mobydick.jpg",
                description: "An epic tale of one man's obsessive quest for revenge against a giant white whale.",
                downloadUrl: "#",
                comments: []
            },
            { 
                title: "War and Peace", 
                author: "Leo Tolstoy", 
                image: "https://example.com/war-and-peace.jpg",
                description: "A historical novel that chronicles the French invasion of Russia and its impact on Tsarist society.",
                downloadUrl: "#",
                comments: []
            }
        ];

        // Admin credentials
        let adminCredentials = {
            username: "cazzano",
            password: "qw4HD123!@3"
        };

        // Function to create book cards
        function createBookCard(book, index) {
            return `
                <div class="book-card" data-index="${index}">
                    <img src="${book.image}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/200x250?text=Book+Cover'">
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <p class="book-author">${book.author}</p>
                    </div>
                </div>
            `;
        }

        // Function to render books
        function renderBooks() {
            const booksGrid = document.getElementById('booksGrid');
            booksGrid.innerHTML = '';
            books.forEach((book, index) => {
                booksGrid.innerHTML += createBookCard(book, index);
            });
        }

        // Initial render
        renderBooks();

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Book preview functionality
        const previewOverlay = document.getElementById('previewOverlay');
        const previewImage = document.getElementById('previewImage');
        const previewTitle = document.getElementById('previewTitle');
        const previewAuthor = document.getElementById('previewAuthor');
        const previewDescription = document.getElementById('previewDescription');
        const downloadBtn = document.getElementById('downloadBtn');
        const closePreview = document.querySelector('.close-preview');
        const commentForm = document.getElementById('commentForm');
        const commentsList = document.getElementById('commentsList');

        let currentBookIndex = 0;

        document.getElementById('booksGrid').addEventListener('click', (e) => {
            const bookCard = e.target.closest('.book-card');
            if (bookCard) {
                const index = bookCard.dataset.index;
                currentBookIndex = index;
                const book = books[index];
                previewImage.src = book.image;
                previewImage.alt = book.title;
                previewTitle.textContent = book.title;
                previewAuthor.textContent = book.author;
                previewDescription.textContent = book.description;
                downloadBtn.href = book.downloadUrl;
                previewOverlay.classList.add('active');
                renderComments(index);
            }
        });

        closePreview.addEventListener('click', () => {
            previewOverlay.classList.remove('active');
        });

        // Comment functionality
        function renderComments(bookIndex) {
            commentsList.innerHTML = '';
            books[bookIndex].comments.forEach((comment, index) => {
                const commentElement = document.createElement('li');
                commentElement.className = 'comment';
                commentElement.innerHTML = `
                    <p class="comment-name">${comment.name}</p>
                    <p>${comment.text}</p>
                    ${comment.reply ? `<p><strong>Reply:</strong> ${comment.reply}</p>` : ''}
                `;
                commentsList.appendChild(commentElement);
            });
        }

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('commentName').value;
            const text = document.getElementById('commentText').value;
            if (name && text) {
                books[currentBookIndex].comments.push({ name, text });
                renderComments(currentBookIndex);
                commentForm.reset();
            }
        });

        // Admin functionality
        const adminLink = document.getElementById('adminLink');
        const adminOverlay = document.getElementById('adminOverlay');
        const loginForm = document.getElementById('loginForm');
        const adminPanel = document.getElementById('adminPanel');
        const bookForm = document.getElementById('bookForm');
        const adminBooks = document.getElementById('adminBooks');
        const adminComments = document.getElementById('adminComments');
        const userSettingsForm = document.getElementById('userSettingsForm');
        const logoutBtn = document.getElementById('logoutBtn');

        adminLink.addEventListener('click', (e) => {
            e.preventDefault();
            adminOverlay.classList.add('active');
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === adminCredentials.username && password === adminCredentials.password) {
                loginForm.style.display = 'none';
                adminPanel.style.display = 'block';
                renderAdminBooks();
                renderAdminComments();
            } else {
                alert('Invalid credentials');
            }
        });

        function renderAdminBooks() {
            adminBooks.innerHTML = '';
            books.forEach((book, index) => {
                const bookElement = document.createElement('div');
                bookElement.className = 'admin-book';
                bookElement.innerHTML = `
                    <h4 class="admin-book-title">${book.title}</h4>
                    <p>${book.author}</p>
                    <div class="admin-actions">
                        <button onclick="editBook(${index})">Edit</button>
                        <button onclick="deleteBook(${index})">Delete</button>
                    </div>
                `;
                adminBooks.appendChild(bookElement);
            });
        }

        function editBook(index) {
            const book = books[index];
            document.getElementById('bookTitle').value = book.title;
            document.getElementById('bookAuthor').value = book.author;
            document.getElementById('bookImage').value = book.image;
            document.getElementById('bookDownload').value = book.downloadUrl;
            document.getElementById('bookDescription').value = book.description;
            bookForm.dataset.editIndex = index;
        }

        function deleteBook(index) {
            books.splice(index, 1);
            renderBooks();
            renderAdminBooks();
            renderAdminComments();
        }

        bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newBook = {
                title: document.getElementById('bookTitle').value,
                author: document.getElementById('bookAuthor').value,
                image: document.getElementById('bookImage').value,
                downloadUrl: document.getElementById('bookDownload').value,
                description: document.getElementById('bookDescription').value,
                comments: []
            };
            const editIndex = bookForm.dataset.editIndex;
            if (editIndex) {
                books[editIndex] = { ...books[editIndex], ...newBook };
            } else {
                books.push(newBook);
            }
            renderBooks();
            renderAdminBooks();
            renderAdminComments();
            bookForm.reset();
            bookForm.dataset.editIndex = '';
        });

        function renderAdminComments() {
            adminComments.innerHTML = '';
            books.forEach((book, bookIndex) => {
                if (book.comments.length > 0) {
                    const bookComments = document.createElement('div');
                    bookComments.innerHTML = `<h4>${book.title}</h4>`;
                    book.comments.forEach((comment, commentIndex) => {
                        const commentElement = document.createElement('div');
                        commentElement.className = 'comment';
                        commentElement.innerHTML = `
                            <p><strong>${comment.name}:</strong> ${comment.text}</p>
                            ${comment.reply ? `<p><strong>Reply:</strong> ${comment.reply}</p>` : ''}
                            <div class="comment-actions">
                                <button onclick="deleteComment(${bookIndex}, ${commentIndex})">Delete</button>
                                <button onclick="showReplyForm(${bookIndex}, ${commentIndex})">Reply</button>
                            </div>
                            <div class="reply-form" id="replyForm-${bookIndex}-${commentIndex}">
                                <textarea placeholder="Your reply"></textarea>
                                <button onclick="submitReply(${bookIndex}, ${commentIndex})">Submit Reply</button>
                            </div>
                        `;
                        bookComments.appendChild(commentElement);
                    });
                    adminComments.appendChild(bookComments);
                }
            });
        }

        function deleteComment(bookIndex, commentIndex) {
            books[bookIndex].comments.splice(commentIndex, 1);
            renderAdminComments();
        }

        function showReplyForm(bookIndex, commentIndex) {
            const replyForm = document.getElementById(`replyForm-${bookIndex}-${commentIndex}`);
            replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
        }

        function submitReply(bookIndex, commentIndex) {
            const replyForm = document.getElementById(`replyForm-${bookIndex}-${commentIndex}`);
            const replyText = replyForm.querySelector('textarea').value;
            if (replyText) {
                books[bookIndex].comments[commentIndex].reply = replyText;
                renderAdminComments();
            }
        }

        userSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;
            if (newUsername) adminCredentials.username = newUsername;
            if (newPassword) adminCredentials.password = newPassword;
            alert('User settings updated');
            userSettingsForm.reset();
        });

        logoutBtn.addEventListener('click', () => {
            loginForm.style.display = 'block';
            adminPanel.style.display = 'none';
            adminOverlay.classList.remove('active');
        });