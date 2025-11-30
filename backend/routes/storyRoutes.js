const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

router.get('/', storyController.getAll);
router.get('/:id', storyController.getStory);
router.post('/', storyController.addStory);
router.put('/', storyController.updateStory);
router.delete('/:id', storyController.deleteStory);


router.post('/:id/tasks', storyController.addTask);
router.put('/:id/tasks', storyController.updateTask);
router.delete('/:id/tasks/:taskId', storyController.deleteTask);
router.get('/:id/tasks/:taskId', storyController.getTask);

module.exports = router;
