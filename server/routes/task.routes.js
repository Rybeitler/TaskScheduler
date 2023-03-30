const TaskController = require('../controllers/task.controller');

module.exports = (app) => {
    app.post('/api/newTask', TaskController.createTask);
    app.get('/api/allTask', TaskController.getAllTask);
    app.get('/api/oneTask/:id', TaskController.getTask);
    app.put('/api/task/:id', TaskController.updateTask);
    app.put('/api/addNote/:id', TaskController.addNote)
    app.put('/api/assignUser/:id', TaskController.assignUser)
    app.delete('/api/deleteTask/:id', TaskController.deleteTask);
};