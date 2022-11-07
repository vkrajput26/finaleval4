const mongoose= require("mongoose")

const useSchema= new mongoose.Schema({
    
    name:{type:String,require:true},
  email:{type:String,require:true},
  password:{type:String,require:true},
})

const UserModel= mongoose.model("todoAuth",useSchema)

module.exports={
    UserModel
}