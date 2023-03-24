const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userTokenm, SECRET, (err,payload) => {
        console.log(req.cookies)
        if(err){
            console.log("Failed user verification")
            res.status(401).json({verified:false})
        }
        else{
            console.log('Authenticated')
            req.user = payload._id
            console.log('PAYLOAD:', payload)
            next()
        }
    })
}