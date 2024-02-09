const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')

const register = async (req, res) => {
    const {name, email, password, role} = req.body
    if(!name || !email || !password){
        res.status(400).json({error: "please add all fields"})
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400).json({error: "user already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400).json({error: "user not created"})
    }

    //res.json({message: "Register user"})
}
const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400).json({error: "invalid credential"})
    }
    //res.json({message: "Login user"})
}
const getProfile = (req, res) => {
    res.json( req.user )
}

const generateToken = (id) => {
    return jwt.sign({id, }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = {register, login, getProfile};