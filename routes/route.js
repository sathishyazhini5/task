const express=require('express')
const router=express.Router()
const UserFunctions=require("../controller/index")

let routes=(app)=>
{
    router.post("/save",UserFunctions.saveUser)
    router.post("/saved",UserFunctions.saving)
    router.post("/get",UserFunctions.gets)
    router.patch("/update",UserFunctions.db)
    router.get("/lookup",UserFunctions.getdata1)
    router.patch("/upds",UserFunctions.update)
    app.use('/api',router)

}
module.exports=routes