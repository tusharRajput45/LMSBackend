const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    RegisterID:{
        type:Number,
        default:0,
    },
    lastname:{
        type:String,
    },
    firstname:{
        type:String,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
    },
    gender:{ 
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    registerDate:{
        type:String,
        required:true,
    },
    registerTime:{
        type:String,
        required:true,
    },
    isEmail_OTP:{
        type:Number,
        default:0
    },
    isEmail_Varified:{
        type:Number,
        default:0
    },
    isMobile_OTP:{
        type:Number,
        default:0
    },
    isMobile_Varified:{
        type:Number,
        default:0
    },
    isAdmin_Varified:{
        type:Number,
        default:0
    }
})
const userRegister=mongoose.model('userregister',Schema)
module.exports=userRegister;
