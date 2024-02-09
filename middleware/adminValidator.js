const adminValidator = (req, res, next) => {
    if(req.user.role === "admin") {
        next()
    } else{
        res.status(403).json({error: "protected only for admin"})
    }
}

module.exports = {
    adminValidator
}