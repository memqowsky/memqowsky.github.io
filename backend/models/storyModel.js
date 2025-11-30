const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  estimatedHours: Number,
  hoursWorked: Number,
  status: { type: String, enum: ['ToDo', 'InProgress', 'Done'] },
  createdAt: String,
  startAt: String,
  endAt: String,
  assignedUserId: String
}, { _id: false });

const storySchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  project: String,
  createdAt: String,
  status: { type: String, enum: ['ToDo', 'InProgress', 'Done'] },
  ownerId: String,
  tasks: [taskSchema]
});

module.exports = mongoose.model('Story', storySchema);
