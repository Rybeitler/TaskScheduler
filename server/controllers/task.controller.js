const Task = require('../models/task.model');  

module.exports.createTask = (request, response) => {
    Task.create(request.body) 
        .then((task) => {
            response.json(task)
        })
        .catch((err) => {
            response.status(500).json(err)
        })
};

module.exports.getAllTask = (request, response) => {
    Task.find({}).sort({date:'asc'})
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

module.exports.addNote = async (req,res) =>{
    try{
        let note = req.body.note 
        const updatedTask = await Task.findOneAndUpdate({_id:req.params.id}, {$push: {notes:note}}, {new:true})
        res.json(updatedTask)
    }
    catch(err){
        res.status(500).json({error:err})
    }
}

module.exports.assignUser = async (req,res)=>{
    try{
        userId = req.body.assignTask
        const updatedTask = await Task.findOneAndUpdate({_id:req.params.id}, {user_id:userId}, {new:true})
        res.json(updatedTask)
    }
    catch(err){
        res.status(500).json({error:err})
    }
}

module.exports.deleteTask = (request, response) => {
    Task.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}