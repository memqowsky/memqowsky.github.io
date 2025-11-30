require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  login: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'devops', 'developer'] }
});

const User = mongoose.model('User', userSchema);


async function createUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const usersData = [
      {
        firstName: 'Jan',
        lastName: 'Kowalski',
        login: 'admin',
        password: 'admin123',
        role: 'admin'
      },
      {
        firstName: 'Anna',
        lastName: 'Nowak',
        login: 'devops',
        password: 'devops123',
        role: 'devops'
      },
      {
        firstName: 'Piotr',
        lastName: 'Zieliński',
        login: 'developer',
        password: 'dev123',
        role: 'developer'
      }
    ];

    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({ ...userData, password: hashedPassword });
      await user.save();
      console.log(`✅ Użytkownik "${user.login}" dodany.`);
    }

  } catch (err) {
    console.error('❌ Błąd podczas dodawania użytkowników:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

createUsers();
