const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  login: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'devops', 'developer'] },
});

module.exports = mongoose.model('User', userSchema);
