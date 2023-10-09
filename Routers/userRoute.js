const userContoller=require('../Controllers/userController')
const Route=require('express').Router();
const userVarify=require('../Controllers/varifyController')

// Routing...
//Get Routing...
    
Route.get('/ContactRegister',(req,res)=>{
    res.render("contactRegister")
}) 

// Post Routing...

Route.post('/ContactRegister',userContoller.contactRegister)
Route.post('/Student-signup',userContoller.signup)
Route.post('/Student-signin',userContoller.signin)
Route.post('/Student-varifyEmail&Mobile',userVarify.varifyEmail_mobile_OTP)
Route.get('/test',userContoller.test)


module.exports=Route;