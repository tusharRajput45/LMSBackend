const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        uppercase:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Mobile:{
        type:Number,
        required:true,
    },
    Message:{
        type:String,
        required:true
    },
    registerDate:{
        type:String,
        required:true
    },
    registerTime:{
        type:String,
        required:true
    },
    readcontact:{
        type:Number,
        default:0
    }
})

const contactRegister=mongoose.model('ContactRegister',Schema)
module.exports=contactRegister;