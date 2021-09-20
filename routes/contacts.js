const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const multer=require('multer');
const upload=multer({dest:"upload/"})
const contactController=require('../controllers/contactController');

router.get("/",contactController.listContacts)

router.post("/save",auth,contactController.createcontact)

router.put("/update/:id",auth,contactController.updateContacts)

router.delete('/deleteContact/:id',auth,contactController.deleteContact)

router.get("/getbyid/:id",auth,contactController.getContactbyId)

router.get("/getbyname/:name",contactController.getContactbyName)
router.get('/:id',auth,contactController.getUserContact);

router.post("/upload",upload.single('imagefile'),(req,res)=>{
    res.status(200).json({
        details:req.file
    })
})

router.get("/getcontactById/:userid",auth,contactController.getContactsofUser)

module.exports=router;