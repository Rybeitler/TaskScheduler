const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY


module.exports = {
    registerUser: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email: req.body.email})
            if (potentialUser){
                res.status(400).json({message: 'This email already exists'})
            }
            else{
                const user = req.body
                //create a refresh token and store in db
                const refreshToken = jwt.sign({_id:user._id}, SECRET, {expiresIn:'1d'})
                user.refreshToken = refreshToken

                //create user in db and create acesss token
                const newUser = await User.create(user)
                const accessToken = jwt.sign({_id:user._id, email:user.email, firstName:user.firstName, lastName:user.lastName, role:user.role}, SECRET, {expiresIn:'15m'})

                //create cookie with refresh token, and return access token
                res.status(201)
                .cookie('jwt', refreshToken, {httpOnly:true, secure:true, maxAge: 2 * 60 * 60 * 1000 })
                .json({success: 'user logged in', accessToken: accessToken, user: newUser})
            }
        }
        catch(err){
            console.log("ERROr:", err)
            res.status(400).json({error:err})
        }
},
    login: async (req, res) => {
        try{
            const user = await User.findOne({email:req.body.email})
            if(user){
                const passwordMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordMatch){
                    const accessToken= jwt.sign({_id:user._id, email:user.email, firstName:user.firstName, lastName:user.lastName, role:user.role}, SECRET, {expiresIn:'15m'})
                    const refreshToken = jwt.sign({_id:user._id}, SECRET, {expiresIn:'1d'})
                    user.refreshToken = refreshToken
                    //workaround to how we are doing password confirmation
                    user.confirmPassword = user.password
                    const saveUser = await user.save()
                    
                    res.cookie('jwt', refreshToken, {httpOnly:true, secure: true, sameSite:'None', maxAge: 2 * 60 * 60 * 1000})
                    res.status(201).json({success:'User logged in!', accessToken:accessToken, user:user})
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
    logout: async (req, res)=>{
        //this clears cookies and clears refesh token from db on logout
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.sendStatus(204)
        const refreshToken = cookies.jwt
        
        const foundUser = await User.findOne({ refreshToken:refreshToken }).exec();
        if(!foundUser){
            res.clearCookie('jwt', {httpOnly:true, sameSite: 'None', secure:true});
            return res.sendStatus(204)
        }
        foundUser.refreshToken ='';
        foundUser.confirmPassword = foundUser.password
        const result = await foundUser.save();
        

        res.clearCookie('jwt', {httpOnly:true, sameSite: 'None', secure: true})
        res.sendStatus(204)
    },
    handleRefreshToken: async (req, res) => {
        //this block is run when the users access token is expired, it checks for a refresh token, compares w/ db, if user found it issues new accessToken
        //check if there are cookies
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.json('no cookie');
        }
        //check if refresh token is in db
        const refreshToken = cookies.jwt;
        const foundUser = await User.findOne({ refreshToken:refreshToken }).exec();
        if (!foundUser){
            return res.json('user not found'); 
        }
        //verify + issue new access token
        jwt.verify(
            refreshToken,
            SECRET,
            (err, decoded) => {
                if (err || JSON.stringify(foundUser._id).replace(/['"]+/g, '') !== decoded._id) return res.sendStatus(403);
                const role = foundUser.role
                const user = {
                    _id:decoded._id,
                    email:foundUser.email,
                    firstName:foundUser.firstName,
                    lastName:foundUser.lastName,
                    role:foundUser.role
                }
                const accessToken= jwt.sign({_id:user._id, email:user.email, firstName:user.firstName, lastName:user.lastName, role:user.role}, SECRET, {expiresIn:'15m'})
                res.json({ user, accessToken })
            }
        );
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