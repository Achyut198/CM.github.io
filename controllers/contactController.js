const contactsModel=require('../models/contactsModel');
const Joi = require('joi');
//not used declaired before for public contacts
exports.listContacts=async(req,res)=>{
    try{
        let contacts=await contactsModel.find()
        console.log("list contacts fetched"+contacts)
        if(!contacts){
            
            contacts=[]            
        }
        res.status(200).json({
            message:"contacts fetched successfully",
            contactsData:contacts
        })

    }catch(err){
        res.status(500).json({
            message:"something went wrong",
            error:err
        })
    }   
    
}



// exports.listContacts = async(req, res)=> {
//     try {
//         const contacts = await contact.find().populate('userid');
//         if(contacts.length!==0){
//             console.log(contacts)
//             res.status(200).json({
//                 message:"ContactList fetched successfully",
//                 contactsData:contacts
//             })
//         }else{
//             res.status(404).json({
//                 message:"Not found",
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             message:"something went wrong",
//             error:err 
//         })
//     }
    
// }


exports.createcontact=async(req,res)=>{
    console.log(req.body); 
    const contactObj=Joi.object({
        name : Joi.string().alphanum().min(3).max(30).required(),
        email : Joi.string().email().required(),
        phone : Joi.string().min(10).max(13).required(),
        type: Joi.string().required(),
        userid : Joi.required()
    }) 
    try {
        const contactfield = await contactObj.validateAsync(req.body);
        const contacts = new contactsModel(contactfield);
        console.log(contacts);
        await contacts.save();
        res.status(200).json({
            message:"contact Added successfully" ,
            contactData:contacts
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"something went wrong",
            error:err 
        })
    }
}


exports.updateContacts=async(req,res)=>{
    const id=req.params.id;
    const contactObjs=Joi.object({        
        name : Joi.string().required().min(3).alphanum(),
        email : Joi.string().email().required(),
        phone : Joi.string().length(10).required(),
        type: Joi.required(),
        userid : Joi.required()
        
    })
    try{
        const updatefield = await contactObjs.validateAsync(req.body);
        
        const updatedcontact = await contactsModel.findByIdAndUpdate(id,{$set:updatefield},{useFindAndModify: false});
        if(updatedcontact==null){
            res.status(400).json({
            message:"Contacts couldnt be updated or id not found"
        })
        }else{
            res.status(200).json({
            message:"updated sucessfully",
            updatedcontact:updatedcontact
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"something went wrong",
            error:err
        })
    } 
}

exports.deleteContact=async(req,res)=>{
    const id=req.params.id;
    try{
        const deleteContact=await contactsModel.findByIdAndDelete(id);
        if(!deleteContact){
            res.status(400).json({
            message:"Contact couldnt be deleted or id not found",
        })
        }else{
            // console.log("deleted")
            res.status(200).json({
            message:"contact deleted sucessfully",
            
        })
        console.log(message)
        }    
    }catch{
        console.log(err)
        res.status(500).json({
           
            message:"something went wrong",
            error:err
        })
    }
}

exports.getContactbyId=async(req,res)=>{
    const id= req.params.id;
    try{
        const contact=await contactsModel.findById(id);
        if(contact){
            res.status(200).json({
                message:"contact fetched",
                contact:contact
            })
        }else{
            res.status(400).json({
                message:"contact not found"
            })
        }

    }catch(err){
        res.status(500).json({
            message:"something went wrong",
            error:err
        })
    }
}


exports.getContactbyName=async(req,res)=>{
    const name1= req.params.name;
    userid=req.params.userid
    try{
        const contact=await contactsModel.find({name:name1})
        if(contact){
            res.status(200).json({
                message:"Searched contact fetched",
                contactsData:contact
            })
            console.log(contact)
            console.log("Searched contact Found")
        }else{
            console.log("searched contact not found")
           res.status(400).json({
                
                message:"searched contact not found"
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"something went wrong",
            error:err
        })
    }
}
// not used

exports.getContactsofUser=async(req,res)=>{
    try{
        let contacts=await contactsModel.find({userid:req.params.userid}).populate('userid');
        if(!contacts){
            contacts=[]
        }
        res.status(200).json({
            message:"contacts fetched successfully",
            contactsData:contacts
            
        })
        console.log(contacts);
    }catch(err){
        res.status(500).json({
            message:"something went wrong",
            error:err
        })

    }
    
}
//not used

exports.getUserContact=async(req,res)=>{
    try{
        let getdetails=await contactsModel.find({userid:req.params.id})
        if(!getdetails){
            
            getdetails=[]            
        }
        res.status(200).json({
            message:"contacts fetched successfully",
            contactsData:getdetails
        })
        console.log(getdetails);
    }catch(err){
        res.status(500).json({
            message:"something went wrong",
            error:err
        })
    }   
    
}