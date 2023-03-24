const Task = require('../models/task.model');  

module.exports.createTask = (request, response) => {
    Task.create(request.body) 
        .then(task => response.json(task))
        .catch(err => response.json(err));
};

module.exports.getAllTask = (request, response) => {
    Task.find({})
        .then(task => {
            console.log(task); 
            response.json(task);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
};

module.exports.getTask = (request, response) => {
    Task.findOne({_id:request.params.id})
        .then(task => response.json(task))
        .catch(err => response.json(err));
}

module.exports.updateTask = (request, response) => {
    Task.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedtask => response.json(updatedtask))
        .catch(err => response.json(err))
}

module.exports.deleteTask = (request, response) => {
    Task.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}