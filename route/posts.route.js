
const express = require("express")

const postRouter = express.Router()

const {PostModel} = require("../model/post.model.js")
const { UserModel } = require("../model/users.model.js")
const {authorize} = require("../middleware/authorise.js")

postRouter.post("/put",authorize(["editor","admin"]),async(req,res)=>{

    const payload = req.body
    console.log(payload)
    
    try {
        const new_post =  new PostModel(payload)
        await new_post.save()
        res.send("post created successfully")

    } catch (error) {
        console.log(error)
    }

})

postRouter.patch("/update/:updateID",authorize(["editor"]),async(req,res)=>{
    const {desc} = req.body
    //console.log(desc);
const updateID = req.params.updateID
const email  =req.body.email
const post = await PostModel.findOne({_id:updateID})

if(email !== post.email){
    res.send("Not authorised")
}
else{
    await PostModel.findByIdAndUpdate({_id : updateID},{desc})
    res.send({"msg" : "task updated successfully"})
}

})

postRouter.delete("/delete/:deleteID",authorize(["editor","admin"]),async (req,res)=>{
    const deleteID = req.params.deleteID
const email  =req.body.email
const post = await PostModel.findOne({_id:deleteID})
if(email == post.email){
    await PostModel.findByIdAndDelete({_id:deleteID})
    res.send("task deleted successfully")
}else{
    res.send("not authorised")
}
})

postRouter.get("/",async(req,res)=>{
    
    const post = await PostModel.find()

    res.send(post)
})

postRouter.get("/parted",async(req,res)=>{

    const {Userid} = req.body
    
    const post = await PostModel.find({Userid})
    res.send(post)
    ;
})

module.exports = {postRouter}