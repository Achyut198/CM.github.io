const jwt=require('jsonwebtoken')
const secretKey="meanstack"
const auth=async(req,res,next)=>{
    if(req.header('x-auth-token')){
        let token=req.header('x-auth-token');
        try{
           data= await jwt.verify(token,secretKey);
           console.log("Token Valid\n"+data);
            next();
        }
        catch(err){
            console.log(err);
            res.status(401).json({
                message:"unauthorised request||Bad token",
                error:true
            })
        }
    }else{
        res.status(401).json({
            message:"unauthorised request||token missing"
            
        })
    }
}
module.exports=auth