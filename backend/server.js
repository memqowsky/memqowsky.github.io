const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// --- ZMIANA: KONFIGURACJA CORS ---
const cors = require('cors');

// Użycie cors() bez argumentów: zezwala na wszystkie źródła (origin: '*')
// W ten sposób serwer przyjmie żądania z Twojego front-endu na Netlify, Renderze, localhost, itd.
app.use(cors());

// Możesz również użyć bardziej restrykcyjnej konfiguracji, jeśli chcesz:
/*
app.use(cors({
    origin: '*', // Zezwolenie na DOWOLNE źródło
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Dopuszczalne metody
    credentials: true // Jeśli używasz ciasteczek/sesji
}));
*/

require('dotenv').config();

let currentProject = 'undefined';

app.use(bodyParser.json());
// Pamiętaj, że w większości aplikacji wdrożonych na Render/Heroku nie serwujesz front-endu
// Zazwyczaj to ustawienie jest potrzebne, jeśli serwerujesz statyczne pliki z tego samego serwera:
// app.use(express.static(path.join(__dirname, 'public'))); 

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const storyRoutes = require('./routes/storyRoutes');
app.use('/api/stories', storyRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);


app.post('/api/select-project', (req, res) => {
    const { project } = req.body;
    if (!project) {
        return res.status(400).json({ message: 'Brak nazwy projektu' });
    }

    currentProject = project;
    console.log('Aktualny projekt ustawiony na:', currentProject);
    res.sendStatus(200);
});


app.get('/api/current-project', (req, res) => {
    const projectToReturn = currentProject;
    console.log("Pobieranie projektu: ", projectToReturn);
    res.json({ project: projectToReturn });
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Połączono z bazą danych MongoDB');
})
.catch((error) => {
    console.error('❌ Błąd połączenia z MongoDB:', error);
});

// Pamiętaj, aby na platformach takich jak Render używać zmiennej środowiskowej
// PORT, zamiast ustalonej wartości 3000.
const serverPort = process.env.PORT || port; 

app.listen(serverPort, () => {
    console.log(`Serwer działa na porcie ${serverPort}...`);
});