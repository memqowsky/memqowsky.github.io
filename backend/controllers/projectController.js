const projectService = require('../services/projectService');

exports.getAll = async (req, res) => {
  const projects = await projectService.getAll();
  res.json(projects);
};

exports.getProject = async (req, res) => {
  const project = await projectService.getById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

exports.getProjectByCode = async (req, res) => {
  const project = await projectService.getByCode(req.params.code);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

exports.addProject = async (req, res) => {
  const newProject = await projectService.add(req.body);
  res.status(201).json(newProject);
};

exports.updateProject = async (req, res) => {
  const updated = await projectService.update(req.body);
  if (!updated) return res.status(404).json({ message: 'Project not found' });
  res.json(updated);
};

exports.deleteProject = async (req, res) => {
  const deleted = await projectService.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
};