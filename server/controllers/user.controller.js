const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const {authenticate} = require('../config/jwt.config')

module.exports = {
    registerUser: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email: req.body.email})
            if (potentialUser){
                res.status(400).json({message: 'This email already exists'})
            }
            else{
                const newUser = await User.create(req.body)

                const userToken = jwt.sign({_id: newUser._id, email:newUser.email, username:newUser.firstName}, SECRET, {expiresIn:'7200000ms'})
                console.log(userToken);

                res.status(201)
                .cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000 })
                .json({success: 'user logged in', userToken: userToken, user: newUser})
            }
        }
        catch(err){
            console.log("EROR:", err)
            res.status(400).json({error:err})
        }
},
    login: async (req, res) => {
        try{
            const user = await User.findOne({email:req.body.email})
            if(user){
                const passwordMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordMatch){
                    const userToken = jwt.sign({_id: user._id, email:user.email, username:user.firstName}, SECRET, {expiresIn:'7200000ms'})
                    res.status(201).cookie('userToken', userToken, {httpOnly:true,  maxAge: 2 * 60 * 60 * 1000 }).json({success: 'user logged in',userToken:userToken, user: user})
                }else{
                    res.status(400).json({message:"Invalid Email/Password"})
                }
            }
            else{
                res.status(400).json({message:"Invalid Email/Password"})
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    }, 
    
    logout: (req, res) => {
        res.clearCookie('userToken')
        res.json({message:'Logged out successfully'})
    },

    allUsers: (req, res) => {
        User.find()
            .then((allUsers) => {
                res.json(allUsers)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },

    findOneUser: async (req,res) => {
        try{
            const user_id = req.params.id
            console.log("userId:", user_id)
            const oneUser = await User.findById(user_id)
            console.log("oneUser:", oneUser)
            res.json({oneUser:oneUser})
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate( { _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
}