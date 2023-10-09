const adminController=require('../Controllers/adminController')
const express=require('express');
const adminRoute=express();
const multer=require('multer');
const path=require('path');
const ejs=require('ejs')

adminRoute.set('view engine', 'ejs')
adminRoute.set('views',__dirname+'./Views/adminDashboard/')
const storage=multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,path.join(__dirname,"../public/userImages"));
    },
    filename:function(req,file,cb){
        const name=Date.now()+"-"+file.originalname;
        cb(null,name)
    }
})
const upload=multer({storage:storage});

// Routing...... 
// Get Routing......
adminRoute.get('/adminRegister',(req,res)=>{
    res.render("adminRegister")

})

// Post Routing......

adminRoute.post('/contactRegister',adminController.contactRegister)
adminRoute.post('/fileUser',upload.single("filename"),adminController.fileUser)
adminRoute.post('/emailVerification',adminController.emailVerify)
module.exports=adminRoute;
