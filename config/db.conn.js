const mongoose=require('mongoose');
const config=require('./db.config');
const dbConn=async()=>{
    await mongoose.connect(config.uri,{useNewUrlParser:true,useUnifiedTopology:true},()=>
    {
        console.log('connected to database');
    })
}
module.exports=dbConn;