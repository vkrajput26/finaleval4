const mongoose= require("mongoose")

const todoSchema= new mongoose.Schema({
    id:{type:Number,require:true},
    taskname:{type:String,require:true},
    status:{type:String,require:true},
    tag:{type:String,require:true},
})

const TodoModel= mongoose.model("todoUser",todoSchema)

module.exports={
    TodoModel
}