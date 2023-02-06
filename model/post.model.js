const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    Subject:String,
    status:String,
    tag:String,
    Userid:String
})

const TaskModel = mongoose.model("task",taskssSchema)

module.exports = {TaskModel}