
const mongoose=require("mongoose")

const taskSchema=mongoose.Schema(
    {
        task:{type:String},
        description:{type:String},
        priority:{type:String},
        date:{type:Date},
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
},{timestamp:true})

const Task=mongoose.model('Task',taskSchema)
module.exports=Task;