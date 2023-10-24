const express = require('express');
const router = express.Router();

const taskcontroller=require("../controllers/taskController")

router.route('/add').post(taskcontroller.addTask);
router.route('/tasks').get(taskcontroller.getAllTasks);
router.route('/edit/:id').put(taskcontroller.editTask);
router.route('/:id').delete(taskcontroller.deleteTask);

module.exports = router;