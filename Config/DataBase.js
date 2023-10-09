const mongoose=require('mongoose');
const Database=mongoose.connect("mongodb://localhost:27017/LMS",
).then(()=>{
    console.log("Database is Successfully Connect ....");
}).catch((err)=>{
    console.log('MongoDB Error');
    console.log(err);
});
module.exports=Database;
