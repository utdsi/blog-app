const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    Subject:String,
    desc:String,
    Userid:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const PostModel = mongoose.model("post",postSchema)

module.exports = {PostModel}