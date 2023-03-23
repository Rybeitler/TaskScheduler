const UserController = require('../controllers/user.controller')
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/register', UserController.registerUser)
    app.post('/api/login', UserController.login)
    app.post('/api/logout', UserController.logout)
    app.post('/api/allUsers', UserController.allUsers)
    app.get('/api/loggedInUser/:id', UserController.findOneUser)
    app.put('/api/updateUser/:id', UserController.updateUser)
}