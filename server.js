// const express = require("express");
// const cors = require("cors");
// const dbConn=require("./config/db.conn");
// dbConn(); 
// const corsOption={
//     "origin":"*"
// }
// // const postsRoutes=require('./routes/posts');
// // const userRoutes=require('./routes/user')
// const app = express();
// app.use(express.json());
// app.use(cors({
//     origin:['http://localhost:4200','http://127.0.0.1:4200'],
//     credentials:true
//   }));
//   const port = process.env.PORT || 3001;
// //   dbConn();
  


//   app.listen (port, ()=>{
//       console.log(`server started at port ${port}`);
  
//   })
  




const logger=require('./middleware/logger');
const express=require('express');
const cors=require('cors');

const corsOption={
    "origin":"*"
}

const app=express();
const contactRoutes=require('./routes/contacts');
const userRoutes=require('./routes/user')
const dbConn = require('./config/db.conn');

const port=process.env.PORT||7000

app.use(cors(corsOption));
app.use(express.json());
app.use(logger);

//app.use(contactRoutes);
//app.use(userRoutes);
app.use('/api/user',userRoutes);
app.use('/api/contact',contactRoutes);

dbConn();

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})