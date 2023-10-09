const contactRegisterModel=require('../Models/userModels/contactModel')
const userRegisterModel=require('../Models/userModels/userRegister')
const nodemailer=require('nodemailer')
const random=require('generate-serial-number')
const bcrypt=require('bcrypt')
const async = require('hbs/lib/async')

const saveEmailandMobileOTP=async(Email)=>{
        try {
           const EmailOTP=random.generate(6)
           const MobileOTP=random.generate(6)
           const  saveOTP = {}
           if (EmailOTP)    {  saveOTP.isEmail_OTP = EmailOTP}
           if (MobileOTP)   {  saveOTP.isMobile_OTP = MobileOTP}
           let UpdateData = await userRegisterModel.updateOne({ email:Email }, { $set: saveOTP }, { new: true, lean: true })
           if (UpdateData) {
            
           }
        } catch (error) {
           console.log(error.message);
           res.status(400).send({success:false,message:'Server Error'})
       }
    }
const varifyEmail_mobile_OTP=async(req,res)=>{
    console.log(req.body);
    try {
        const checkEmail=await userRegisterModel.findOne({email:req.body.email})
        const checkMobile=await userRegisterModel.findOne({mobile:req.body.mobile})
        if (checkEmail && checkMobile) {
            if (checkEmail.isEmail_OTP===req.body.emailOTP) {
                if (checkMobile.isMobile_OTP===req.body.mobileOTP) {
                    res.status(400).send({success:true,message:'varified your Email and Mobile'})
                } else {res.status(400).send({success:false,message:'OTP is not matched...'})}
            } else {res.status(400).send({success:false,message:'OTP is not matched...'})}

        } else {res.status(400).send({success:false,message:'Server Error'})}
    } catch (error) {
        console.log(error.message);
        res.status(400).send({success:false,message:'Server Error'})
    }
}
module.exports={
    saveEmailandMobileOTP,
    varifyEmail_mobile_OTP,
}