const Project = require('../models/projectModel');

exports.getAll = async () => {
  return await Project.find();
};

exports.getById = async (id) => {
  return await Project.findOne({ id });
};

exports.getByCode = async (code) => {
  return await Project.findOne({ code });
};

exports.add = async (projectData) => {
  const project = new Project(projectData);
  return await project.save();
};

exports.update = async (updatedProject) => {
  return await Project.findOneAndUpdate({ id: updatedProject.id }, updatedProject, { new: true });
};

exports.delete = async (id) => {
  return await Project.findOneAndDelete({ id });
};