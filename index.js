const express = require("express")
const {connection} = require("./config/db.js")
const {usersRouter} = require("./route/users.route.js")
require('dotenv').config()
const app = express()

app.use(express.json())

app.use("/auth",usersRouter)

app.get("/freshtoken",(req,res)=>{

    const refreshToken = req.headers?.authorization?.split(" ")[1]
    if(!refreshToken){
        return res.status(401).send("Please login again")
    }
    jwt.verify(refreshToken, process.env.refreshkey, (err, decoded) => {
        if(err){
        //err -> whatever the err is    
            return res.status(401).send("Please login again")
        }
        else{
            const {id} = decoded
            const newToken = jwt.sign({id}, process.env.secretkey, {expiresIn : 180})
            return res.send({"token" : newToken})
        }
    })
})
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("conneced to db successfully")
    } catch (error) {
        console.log(error)
    }
    console.log(`listening on port ${process.env.port}`)
})