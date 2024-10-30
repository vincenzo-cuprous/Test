require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Database file path
const dbFile = process.env.DOCKER 
  ? path.join('/usr/src/app/data', 'db.json')
  : path.join(__dirname, 'db.json');

// Read database
async function readDB() {
  try {
    const data = await fs.readFile(dbFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default structure
    return { books: [] };
  }
}

// Write database
async function writeDB(data) {
  await fs.writeFile(dbFile, JSON.stringify(data, null, 2));
}

// Initialize database if it doesn't exist
async function initDB() {
  try {
    await fs.access(dbFile);
  } catch {
    // File doesn't exist, create it with default structure
    await writeDB({ books: [] });
  }
}

// Initialize database
initDB();

// Routes
app.get('/api/books', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.books);
  } catch (error) {
    res.status(500).json({ error: 'Error reading books' });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const db = await readDB();
    const newBook = req.body;
    newBook.id = Date.now().toString();
    newBook.comments = [];
    db.books.push(newBook);
    await writeDB(db);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Error adding book' });
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const db = await readDB();
    const index = db.books.findIndex(book => book.id === req.params.id);
    if (index !== -1) {
      db.books[index] = { ...db.books[index], ...req.body };
      await writeDB(db);
      res.json(db.books[index]);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating book' });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const db = await readDB();
    const index = db.books.findIndex(book => book.id === req.params.id);
    if (index !== -1) {
      db.books.splice(index, 1);
      await writeDB(db);
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});

app.post('/api/books/:id/comments', async (req, res) => {
  try {
    const db = await readDB();
    const book = db.books.find(book => book.id === req.params.id);
    if (book) {
      const newComment = { id: Date.now().toString(), ...req.body };
      book.comments.push(newComment);
      await writeDB(db);
      res.status(201).json(newComment);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
});

app.delete('/api/books/:bookId/comments/:commentId', async (req, res) => {
  try {
    const db = await readDB();
    const book = db.books.find(book => book.id === req.params.bookId);
    if (book) {
      const commentIndex = book.comments.findIndex(comment => comment.id === req.params.commentId);
      if (commentIndex !== -1) {
        book.comments.splice(commentIndex, 1);
        await writeDB(db);
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Comment not found' });
      }
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
});

app.put('/api/books/:bookId/comments/:commentId', async (req, res) => {
  try {
    const db = await readDB();
    const book = db.books.find(book => book.id === req.params.bookId);
    if (book) {
      const comment = book.comments.find(comment => comment.id === req.params.commentId);
      if (comment) {
        Object.assign(comment, req.body);
        await writeDB(db);
        res.json(comment);
      } else {
        res.status(404).json({ error: 'Comment not found' });
      }
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating comment' });
  }
});

app.get('/api/admin', (req, res) => {
  res.json({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD });
});

app.put('/api/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    process.env.ADMIN_USERNAME = username;
    process.env.ADMIN_PASSWORD = password;
    res.status(200).json({ message: 'Admin credentials updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating admin credentials' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Backup route
app.get('/api/backup', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db);
  } catch (error) {
    res.status(500).json({ error: 'Error creating backup' });
  }
});

// Restore route
app.post('/api/restore', async (req, res) => {
  try {
    const backupData = req.body;
    await writeDB(backupData);
    res.json({ message: 'Restore successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error restoring backup' });
  }
});