const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            //valid token
            req.user = await User.findById(decode.id).select("-password")
            next()
        }
        catch(error){
            res.status(401).json({error: "not authorized"})
        }
    }

    if(!token) {
        res.status(401).json({error: "token not found"})
    }
})

// fetch('localhost:3000/api/user', {
//     method: "POST",
//     body: JSON.stringify({
//         name: "abebe",
//         email: "abebe#gmail.com",
//         password: "12345"
//     }),
//     headers: {
//         authorization: `Bearer ${bearerToken}`,

//     }
// })

module.exports = {protect}