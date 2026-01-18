const storyService = require('../services/storyService');

exports.getAll = async (req, res) => {
  const { project } = req.query;
  const stories = await storyService.getAll(project);
  res.json(stories);
};

exports.getStory = async (req, res) => {
  const story = await storyService.getById(req.params.id);
  if (!story) return res.status(404).json({ message: 'Story not found' });
  res.json(story);
};

exports.addStory = async (req, res) => {
  const newStory = await storyService.add(req.body);
  res.status(201).json(newStory);
};

exports.updateStory = async (req, res) => {
  const updated = await storyService.update(req.body);
  if (!updated) return res.status(404).json({ message: 'Story not found' });
  res.json(updated);
};

exports.deleteStory = async (req, res) => {
  const deleted = await storyService.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Story not found' });
  res.json({ message: 'Story deleted' });
};

exports.addTask = async (req, res) => {
  const updated = await storyService.addTask(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Story not found' });
  res.json(updated);
};

exports.updateTask = async (req, res) => {
  try {
    const updated = await storyService.updateTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Story not found' });
    res.json(updated);
  } catch (error) {
    console.error('Błąd podczas aktualizacji zadania:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Błąd walidacji: ' + error.message });
    }
    return res.status(500).json({ message: 'Błąd serwera podczas aktualizacji zadania' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const updated = await storyService.deleteTask(req.params.id, req.params.taskId);
    if (!updated) return res.status(404).json({ message: 'Story not found or task not found' });
    res.json(updated);
  } catch (error) {
    console.error('Błąd podczas usuwania zadania:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Błąd walidacji: ' + error.message });
    }
    return res.status(500).json({ message: 'Błąd serwera podczas usuwania zadania' });
  }
};

exports.getTask = async (req, res) => {
  const task = await storyService.getTask(req.params.id, req.params.taskId);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};
