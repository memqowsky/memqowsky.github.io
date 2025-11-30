const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAll);
router.get('/:id', projectController.getProject);
router.get('/code/:code', projectController.getProjectByCode);
router.post('/', projectController.addProject);
router.put('/', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;