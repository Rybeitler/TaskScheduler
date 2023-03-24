const TaskController = require('../controllers/task.controller');

module.exports = (app) => {
    app.post('/api/task', TaskController.createTask);
    app.get('/api/task', TaskController.getAllTask);
    app.get('/api/task/:id', TaskController.getTask);
    app.put('/api/task/:id', TaskController.updateTask);
    app.delete('/api/task/:id', TaskController.deleteTask);
};