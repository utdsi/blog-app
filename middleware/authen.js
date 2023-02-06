const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{

    const token = req.headers?.authorization?.split(" ")[1]

    if(token){
        const decoded = jwt.verify(token,"push")

        if(decoded){
            const Userid = decoded.Userid
            req.body.Userid = Userid
            next()
        }else{
            res.send("plese login")
        }
    }else{
        res.send("please login")
    }

}

module.exports = {auth} 