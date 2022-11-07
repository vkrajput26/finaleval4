const jwt = require("jsonwebtoken")

const authentication=(req,res,next)=>{
    const token=req.header?.authorization?.split(" ")[1]
    if(!token){
        res.send("login first")
    }
    var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded)
    const user_id=decoded.user_id
    if(decoded){
        req.body.user_id=user_id
        next()
    }
    else{
        res.send("try to login first")
    }
}
module.exports={
    authentication
}