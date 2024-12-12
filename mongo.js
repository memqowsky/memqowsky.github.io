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

// Endpoint do rejestracji
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'Wypełnij wszystkie pola!' });
    }

    try {
        const usersCollection = db.collection('users');
        const existingUser = await usersCollection.findOne({ username });

        if (existingUser) {
            return res.json({ success: false, message: 'Użytkownik o tej nazwie już istnieje!' });
        }

        await usersCollection.insertOne({ username, password });
        res.json({ success: true });
    } catch (error) {
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
            res.json({ success: true });
        } else {
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
