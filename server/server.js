const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const uri = 'mongodb+srv://dbUser:dbUser@currencies-cluster.jdka7.mongodb.net/?retryWrites=true&w=majority&appName=currencies-cluster'; // Adres lokalnego serwera MongoDB
const client = new MongoClient(uri);
const dbName = 'simple-login';
let db;

async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        // Tworzenie kolekcji users, jeśli jeszcze nie istnieje
        const collections = await db.listCollections().toArray();
        if (!collections.some(col => col.name === 'users')) {
            await db.createCollection('users');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connectToDB();


app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false
// }));

// app.get('/check-auth', (req, res) => {
//     if (req.session.loggedin) {
//       res.json({ authenticated: true });
//     } else {
//       res.json({ authenticated: false });
//     }
//   });

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'Wypełnij wszystkie pola!' });
    }

    try {
        console.log("Trying to register");
        const usersCollection = db.collection('users');
        const existingUser = await usersCollection.findOne({ username });

        if (existingUser) {
            console.log("Existing user");
            return res.json({ success: false, message: 'Użytkownik o tej nazwie już istnieje!' });
        }

        await usersCollection.insertOne({ username, password });
        console.log("Success register");
        res.json({ success: true });
    } catch (error) {
        console.log("Failure register");
        console.error('Error during registration:', error);
        res.json({ success: false, message: 'Błąd podczas rejestracji!' });
    }
});

// Endpoint do logowania
app.post('/login', async (req, res) => {
    console.log("Login invoked");
    const { username, password } = req.body;

    try {
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ username, password });

        if (user) {
            console.log("Success");
            res.json({ success: true });
        } else {
            console.log("False");
            res.json({ success: false, message: 'Nieprawidłowe dane logowania!' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.json({ success: false, message: 'Błąd podczas logowania!' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});