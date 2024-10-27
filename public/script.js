// Sample books data
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        imageUrl: "https://example.com/great-gatsby.jpg",
        downloadUrl: "https://example.com/great-gatsby.pdf",
        description: "A novel by F. Scott Fitzgerald set in the Jazz Age."
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        imageUrl: "https://example.com/to-kill-a-mockingbird.jpg",
        downloadUrl: "https://example.com/to-kill-a-mockingbird.pdf",
        description: "A novel by Harper Lee exploring racial injustice in the American South."
    }
];

let comments = {};
let adminCredentials = {
    username: "cazzano",
    password: "qw4HD123!@3"
};

// DOM elements
const booksGrid = document.getElementById("books-grid");
const bookPreview = document.getElementById("book-preview");
const previewTitle = document.getElementById("preview-title");
const previewImage = document.getElementById("preview-image");
const previewDescription = document.getElementById("preview-description");
const downloadButton = document.getElementById("download-button");
const commentForm = document.getElementById("comment-form");
const commentsList = document.getElementById("comments-list");
const adminButton = document.getElementById("admin-button");
const adminModal = document.getElementById("admin-modal");
const adminLoginForm = document.getElementById("admin-login-form");
const adminPanel = document.getElementById("admin-panel");
const addBookButton = document.getElementById("add-book-button");
const changeCredentialsButton = document.getElementById("change-credentials-button");
const logoutButton = document.getElementById("logout-button");
const adminBooksList = document.getElementById("admin-books-list");
const closePreviewButton = document.getElementById("close-preview");

// Functions
function displayBooks() {
    booksGrid.innerHTML = "";
    books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <img src="${book.imageUrl}" alt="${book.title}">
            <h3>${book.title}</h3>
        `;
        bookCard.addEventListener("click", () => showBookPreview(book));
        booksGrid.appendChild(bookCard);
    });
}

function showBookPreview(book) {
    previewTitle.textContent = book.title;
    previewImage.src = book.imageUrl;
    previewImage.alt = book.title;
    previewDescription.textContent = book.description;
    downloadButton.onclick = () => window.open(book.downloadUrl, "_blank");
    displayComments(book.id);
    bookPreview.classList.remove("hidden");
    bookPreview.dataset.bookId = book.id.toString();
}

function closeBookPreview() {
    bookPreview.classList.add("hidden");
    bookPreview.dataset.bookId = "";
}

function displayComments(bookId) {
    commentsList.innerHTML = "";
    if (comments[bookId]) {
        comments[bookId].forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `
                <h4>${comment.name}</h4>
                <p>${comment.text}</p>
            `;
            commentsList.appendChild(commentElement);
        });
    }
}

function addComment(bookId, name, text) {
    if (!comments[bookId]) {
        comments[bookId] = [];
    }
    comments[bookId].push({ name, text });
    displayComments(bookId);
}

function showAdminPanel() {
    adminPanel.classList.remove("hidden");
    displayAdminBooks();
}

function displayAdminBooks() {
    adminBooksList.innerHTML = "";
    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <button onclick="editBook(${book.id})">Edit</button>
            <button onclick="deleteBook(${book.id})">Delete</button>
        `;
        adminBooksList.appendChild(bookElement);
    });
}

function editBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        // Implement edit functionality here
        console.log("Editing book:", book);
    }
}

function deleteBook(bookId) {
    books = books.filter(b => b.id !== bookId);
    displayBooks();
    displayAdminBooks();
}

function addBook() {
    // Implement add book functionality here
    console.log("Adding new book");
}

function changeCredentials() {
    // Implement change credentials functionality here
    console.log("Changing admin credentials");
}

// Event listeners
window.addEventListener("load", () => {
    displayBooks();
    closeBookPreview(); // Ensure the preview is closed on page load
});

adminButton.addEventListener("click", () => {
    adminModal.classList.remove("hidden");
});

adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === adminCredentials.username && password === adminCredentials.password) {
        adminModal.classList.add("hidden");
        showAdminPanel();
    } else {
        alert("Invalid credentials");
    }
});

commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("comment-name").value;
    const text = document.getElementById("comment-text").value;
    const currentBookId = bookPreview.dataset.bookId;
    if (currentBookId) {
        addComment(parseInt(currentBookId), name, text);
        commentForm.reset();
    } else {
        console.error("No book selected");
    }
});

addBookButton.addEventListener("click", addBook);
changeCredentialsButton.addEventListener("click", changeCredentials);
logoutButton.addEventListener("click", () => {
    adminPanel.classList.add("hidden");
});

// Close preview when clicking the close button
closePreviewButton.addEventListener("click", closeBookPreview);

// Close preview when clicking outside
bookPreview.addEventListener("click", (e) => {
    if (e.target === bookPreview) {
        closeBookPreview();
    }
});

// Make editBook and deleteBook functions global
window.editBook = editBook;
window.deleteBook = deleteBook;