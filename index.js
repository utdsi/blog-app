const express = require("express")
const {connection} = require("./config/db.js")
const {usersRouter} = require("./route/users.route.js")
const {postRouter} = require("./route/posts.route.js")
const {auth} = require("./middleware/authen.js")
require('dotenv').config()
const app = express()

app.use(express.json())

app.use("/auth",usersRouter)
app.use("/post",auth,postRouter)
app.get("/",(req,res)=>{
    res.send("elcome")
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