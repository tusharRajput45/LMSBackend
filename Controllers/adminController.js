const {contactRegister,fileUser}=require('../Models/userModels')
const nodemailer=require('nodemailer');
const Mail = require('nodemailer/lib/mailer');
module.exports={
    contactRegister:async (req,res)=>{
        const Result=req.body;    
        if(!Result){
            console.log("Request is fail");
        } else{
        try {
            const Data=new contactRegister({
                Name:Result.Name,
                fatherName:Result.fatherName,
                Email:Result.Email,
                Mobile:Result.Mobile,
            })
            const saveData=Data.save();
            res.send("Successully Save")
             } catch (error) {
                console.log(error.massage);
             }
        }
    },
    fileUser:async(req,res)=>{
            try {
                const Data=new fileUser({
                    fileUser:req.file.filename,
                })
                const saveData=Data.save();
                if (saveData) {
                    res.send("Successully Save File")
                } else {
                    res.send("File is not Save")
                }
            } catch (error) {
                console.log(error.massage)
            }
        },
    emailVerify:async(req,res)=>{
        const Result=req.body.email;
        console.log(Result);
        if (!Result) {
            console.log("Result is not Found");
        } else {
            try { 
                if (Result) {
                    sendVarifymail(req.body.email)
                    // console.log(req.body.email);
                } else {
                    
                }

            //  res.send("successfully send email")
            } catch (error) {
                console.log(error.massage)
            }
        }  
    }
}
const sendVarifymail=async (email)=>{
    try {
        const transporter=nodemailer.createTransport({
            host:'smpt.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:"securesally@gmail.com",
                password:"vimxcagimspiwhip",
            }
        })
        const emailOption={
            form:"securesally@gmail.com",
            to:email,
            subject:'for Verification mail',
            html:"<p>Only Mail Verification</p>"
                }
        transporter.sendMail(emailOption,function(error,info){
                  if (error) {
                    console.log(error.massage);
                  } else {
                    console.log("Email has been send"+info.response);
                  }
                })
    } catch (error) {
        
    }
}