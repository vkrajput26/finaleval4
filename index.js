const express=require("express")
const {connection}=require("./config/db")
const {UserModel}= require("./models/UserModel")
const {TodoModel}= require("./models/TodoModel")
const {authentication}=require("./middleware/authentication")
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
var cors = require('cors')
const app=express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("home page")
})

// signup
app.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    
    const isUserPresent= await UserModel.findOne({email})
    
    if(isUserPresent){
        res.send("user present already")
    }
    else{
        bcrypt.hash(password, 5, async function(err, hash) {
           
            if(err){
                res.send("error in signup, try again")
            }
            const newUser=new UserModel({
                name,
                email,
                password:hash
            })
            try{
                await newUser.save()
                res.send("sign up successfully")
            }
            catch(err){
                res.send("sign up fail")
            }
        });
    }

})

//login
app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user= await UserModel.findOne({email})
    const hash_pswd=user.password
    const user_id= user._id
   
    bcrypt.compare(password, hash_pswd,function(err,result) {
        if(err){
            res.send("error in login")
        }
        if(result){
            var token = jwt.sign({user_id}, 'shhhhh');
            res.send(("login successfully", token))
        }
        else{
            res.send("login  failed")
        }
    });

})

app.get("/todos",async(req,res)=>{ 
    const todo= await TodoModel.find() 
    res.send(todo)
}) 

app.post("/todos/create", async(req,res)=>{
    const payload=req.body
    await TodoModel.insertMany([payload])
    res.send("data added successfully")
})

app.get ("/todos/:todoID",async(req,res)=>{
    const {user_id}=req.body
    const todo= await TodoModel.find({user_id:user_id})
    res.send(todo) 
})

app.delete("/todo/delete/:todoID", async(req,res)=>{
    const params=req.params["todoID"]
    await TodoModel.deleteMany({id:params})
    res.send("data deleted successfully")
})

// taskname:{type:String,require:true},
// status:{type:String,require:true},
// tag:{type:String,require:true},

app.put("/todo/update/:todoID", async(req,res)=>{
    const params=req.params["todoID"]
    const data=req.body
    await TodoModel.updateMany({id:params},{$set:{id:data.id, taskname:data.taskname, status:data.status,tag:data.tag }})
    res.send("data updated  successfully")
})


app.listen(4000,async()=>{
    try{
        await connection
        console.log("connection successfully")
    }
    catch(err){
        console.log(err)
    }
    console.log("listening to port")
})