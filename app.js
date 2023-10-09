const express=require('express');
const app=express();

//Body Parser

const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
 
// Database require

const DataBase=require('./Config/DataBase')

// env file require

const dotenv=require('dotenv')
const Env=dotenv.config({path:__dirname+'/Config/.env'})


const User=require('./Routers/userRoute')


app.use('/',User)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`);
})