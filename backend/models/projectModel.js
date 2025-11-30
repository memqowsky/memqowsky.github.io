const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Project', projectSchema);