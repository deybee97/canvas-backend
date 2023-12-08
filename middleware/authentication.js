

const jwt = require("jsonwebtoken")


module.exports = authenticate  = (req,res,next)=>{

    const auth = req.auth.split(" ")[1]
     
    const {username, password} = jwt.decode(auth)
    console.log(username)
    if(password == username + "tengen-sama"){
        next()
        
    }else{
       res.status(401).json({status:false, msg: "unauthorized"})
    }
}