const jwt = require("jsonwebtoken")

const authorize = (permittedRole)=>{
    return (req,res,next)=>{

        const token = req.headers?.authorization?.split(" ")[1]

        const decoded = jwt.decode(token)

        const role = decoded?.role
        console.log(role,token);

        if(permittedRole.includes(role)){
            next()
        }else{
            res.status(200).send("you are not authorised")
        }


    }
}


module.exports = {authorize}