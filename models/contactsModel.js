const mongoose=require('mongoose');

const conatactSchema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    }
   
})
module.exports=mongoose.model('contacts',conatactSchema);
