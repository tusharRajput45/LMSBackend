const contactRegisterModel=require('../Models/userModels/contactModel')
const userRegisterModel=require('../Models/userModels/userRegister')
const nodemailer=require('nodemailer')
const random=require('generate-serial-number')
const bcrypt=require('bcrypt')
const async = require('hbs/lib/async')
const {saveEmailandMobileOTP}=require('./varifyController')
const {sendRegisterID_and_password}=require('./sendController')


const SecurePassword=async(password)=>{
    try {
        const passwordHash=await bcrypt.hash(password,10);
        return passwordHash;
    } catch (error) {console.log(error.message);}
}
const contactRegister=async(req,res)=>{
   try {
      const registerDate = new Date().toLocaleDateString();
      const registerTime = new Date().toLocaleTimeString();
     const Data=new contactRegisterModel({
            Name:req.body.name,
            Email:req.body.email,
            Mobile:req.body.mobile,
            Message:req.body.message,
            registerDate,
            registerTime,
         })
         const saveData=Data.save()
         if (saveData) {res.send({message:'Successfully Send ....'})}
   } catch (error) {
     console.log(error.message);
     res.status(400).send({success:false,message:'Server Error'})
   }
}
const signup=async(req,res)=>{
    try { 
        const chechMobile=await userRegisterModel.findOne({mobile:req.body.mobile})
        const chechEmail=await userRegisterModel.findOne({email:req.body.email})
    if (chechMobile) {
            res.status(400).send({success:false,message:'Mobile is Already Register'})
            console.log('Mobile');
    } else {
        if (chechEmail) {
            res.status(400).send({success:false,message:'Email is Already Register'})
            console.log('Email');
        } else {
            const registerDate = new Date().toLocaleDateString();
            const registerTime = new Date().toLocaleTimeString();
            let str1=(req.body.firstname).toLowerCase()
                str1=str1.charAt(0).toUpperCase()+str1.slice(1)
            let str2=(req.body.lastname).toLowerCase()
                str2=str2.charAt(0).toUpperCase()+str2.slice(1)
            const RegisterID=random.generate(8)
            let password=random.generate(6)
            console.log(password);
            const securepassword=await SecurePassword(password)
            const Data=new userRegisterModel({
                            lastname:str2,
                            firstname:str1,
                            name:str1+" "+str2,
                            email:req.body.email,
                            mobile:req.body.mobile,
                            gender:req.body.gender,
                            registerDate,
                            registerTime,
                            password:securepassword,
                          })
                 const saveData=await Data.save()
                 if (saveData) {
                        res.status(400).send({success:true,message:'Successfully Register',Result:saveData})
                        sendRegisterID_and_password(saveData.email,RegisterID,password)
                        saveEmailandMobileOTP(saveData.email)
                    }
        }
    }
    } catch (error) {
        console.log(error.message);
        res.status(400).send({success:false,message:'Server Error'})
    }
}
const signin=async(req,res)=>{
    try {
        const checkRegisterID=await userRegisterModel.findOne({RegisterID:req.body.LibraryID})
        if (checkRegisterID) {
            const matchPassword=await bcrypt.compare(req.body.password,checkRegisterID.password)
            if (matchPassword) {
               res.status(400).send({success:true,message:'User Login Successfully',data:checkRegisterID})
            } else {
               res.status(400).send({success:false,message:'Password is not match'})
            }
        } else {
            res.status(400).send({success:false,message:'Library Id is not exist'})
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send({success:false,message:'Server Error'})
    }
}
const test=async(req,res)=>{
    try {
        const checkRegisterID=await userRegisterModel.find()
        res.send(checkRegisterID)
        console.log(checkRegisterID);
    } catch (error) {
        console.log(error.message);
    }
    
}
module.exports={
    contactRegister,
    signup,
    signin,
    test,
}