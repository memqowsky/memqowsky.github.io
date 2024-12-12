const express = require('express');
const session = require('express-session');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database('users.db');

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, message: 'Wypełnij wszystkie pola!' });
  }

  try {
    const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    insertUser.run(username, password);
    res.json({ success: true });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.json({ success: false, message: 'Użytkownik o tej nazwie już istnieje!' });
    } else {
      res.json({ success: false, message: 'Błąd podczas rejestracji!' });
    }
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
  const user = stmt.get(username, password);

  if (user) {
    req.session.loggedin = true;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get('/check-auth', (req, res) => {
  if (req.session.loggedin) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});