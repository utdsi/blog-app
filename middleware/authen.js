const jwt = require("jsonwebtoken")
require('dotenv').config()
const auth = (req,res,next)=>{

    const token = req.headers?.authorization?.split(" ")[1]

    if(token){
        const decoded = jwt.verify(token,process.env.secretkey)
        console.log(decoded)

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