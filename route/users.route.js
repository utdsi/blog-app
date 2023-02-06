const {UserModel} = require("../model/users.model.js")

const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const  usersRouter = express.Router()

usersRouter.post("/signup",async (req,res)=>{

    const {email,password,role,name} = req.body
    //res.send(email)
    try {
       const user = await UserModel.findOne({email})
       //console.log(user)
       if(user){
        res.send("user already exists,please login")
       }else{
        bcrypt.hash(password, 6, async function(err, hash) {
            // Store hash in your password DB.
            if(err.message){
                res.send({"msg":"something went wrong, please login again","err":err.message})
            }else{
                const users = new UserModel({email,password:hash,name,role})
                    await users.save()
                    res.send("signup successful")
            }
        });
       }
    } catch (error) {
        console.log({"error in signup":error})
    }
})

usersRouter.post("/login",async(req,res)=>{

    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                // result == tru
                if(err){
                    res.send("invalid credentials")
                }else{
                    const token = jwt.sign({ email}, process.env.secretkey,{expiresIn:"1h"});
                    const refeshToken = jwt.sign({ email,id:user._id}, process.env.refreshkey,{expiresIn:"72h"});

                    res.status(200).send({"msg":"Login successful","token":token,"refreshtoken":refeshToken})
                }
            });
        }
    } catch (error) {
        res.status(401).send({"msg":"invalid credentials"})
        console.log(error)
    }
})

usersRouter.get("/freshtoken",(req,res)=>{

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
module.exports= {usersRouter}