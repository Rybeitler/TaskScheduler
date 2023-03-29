const TaskController = require('../controllers/task.controller');

module.exports = (app) => {
    app.post('/api/newTask', TaskController.createTask);
    app.get('/api/allTask', TaskController.getAllTask);
    app.get('/api/task/:id', TaskController.getTask);
    app.put('/api/task/:id', TaskController.updateTask);
    app.delete('/api/task/:id', TaskController.deleteTask);
};