const nodemailer=require('nodemailer')

const sendRegisterID_and_password=async(Email,RegisterID,password)=>{
    const tranport=nodemailer.createTransport({
        service:'gmail',
        auth:{ 
            user:process.env.EMAIL, 
            pass:process.env.EMAIL_PASSWORD
        }
    })
    tranport.sendMail({
        from:process.env.EMAIL,
        to:Email,
        subject:"Sarada Library",
        text:'RegisterID and Password',
        html:'<center>'+
        '<div class="" style="width: 50%; padding: 20px; border-radius: 20px;background-color: bisque;">'+
            'Library ID '+" : "+RegisterID+ '<br>'+
            'Password'+" : "+password+
        '</div>'+ 
        '</center>'
    })
}
module.exports={
    sendRegisterID_and_password,
}