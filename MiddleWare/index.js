const MiddleWare=(req,res,next)=>{
    console.log("Hlo MiddleWare .....");
    res.send("MiddleWare")
}
module.exports=MiddleWare;