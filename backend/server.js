const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

require('dotenv').config();

let currentProject = 'undefined';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(port, () => {
  console.log(`Serwer działa..`);
});


