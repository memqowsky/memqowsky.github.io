const Story = require('../models/storyModel');

exports.getAll = async (project) => {
  if (project) return await Story.find({ project });
  return await Story.find();
};

exports.getById = async (id) => {
  return await Story.findOne({ id });
};

exports.add = async (storyData) => {
  const story = new Story(storyData);
  return await story.save();
};

exports.update = async (updatedStory) => {
  return await Story.findOneAndUpdate({ id: updatedStory.id }, updatedStory, { new: true });
};

exports.delete = async (id) => {
  return await Story.findOneAndDelete({ id });
};

exports.addTask = async (storyId, task) => {
  const story = await Story.findOne({ id: storyId });
  if (!story) return null;
  story.tasks.push(task);
  return await story.save();
};

exports.updateTask = async (storyId, updatedTask) => {
  const story = await Story.findOne({ id: storyId });
  if (!story) return null;
  story.tasks = story.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
  return await story.save();
};

exports.deleteTask = async (storyId, taskId) => {
  const story = await Story.findOne({ id: storyId });
  if (!story) return null;
  story.tasks = story.tasks.filter(t => t.id !== taskId);
  return await story.save();
};

exports.getTask = async (storyId, taskId) => {
  const story = await Story.findOne({ id: storyId });
  return story?.tasks.find(t => t.id === taskId);
};
