const Usersear=require('../models/userModel');
const bcryt=require('bcryptjs');
const joi=require('joi');
const jwt=require('jsonwebtoken');
const secretKey="meanstack";

exports.register=async (req,res)=>{
    const userSchema=joi.object({
        fullName:joi.string().required().min(10),
        email:joi.string().required(),
        password:joi.string().required().min(6).max(16),
        confirmPassword:joi.ref('password')
    })

    
    try{
        let userfields= await userSchema.validateAsync(req.body)
         console.log(userfields);      
        let user=await Usersear.findOne({email:userfields.email});
        if(!user){
            console.log("creating user");
            nuser=new Usersear(userfields);
            const salt=await bcryt.genSalt(10);
            nuser.password=await bcryt.hash(nuser.password,salt);
            await nuser.save();
            res.status(200).json({
                message:"user registered successfully",
                userData:nuser
            })
        }else{
            res.status(400).json({
                message:"user already exists with the email id",
            
            })
        }

    }catch(err){
        res.status(500).json({
            message:"Something Went Wrong",
            error:err
        })
    }
    

}

exports.login=async(req,res)=>{
    const loginSchema=joi.object({
        email:joi.string().required(),
        password:joi.string().required()
    })

    try{
        const loginfields=await loginSchema.validateAsync(req.body);
        let userData=await Usersear.findOne({email:loginfields.email})

        if(!userData){
            res.status(401).json({
                message:"Username/password doesn't exists"
            })
        }else{
            const is_match=await bcryt.compare(loginfields.password,userData.password)
            if(!is_match){
                res.status(401).json({
                    message:"Username/password doesn't exists"
                })

            }else{
                const payload={
                    userdata:{
                        id:userData._id
                    }
                }
                const token=await jwt.sign(payload,secretKey,{expiresIn:7200})
                res.status(200).json({
                    message:"logged in",
                    userData:{id:userData._id,name:userData.fullName},
                    token
                })
            }
        }

    }catch(err){
        res.status(500).json({
            message:"something went wrong",
            error:err
        })

    }

    
}