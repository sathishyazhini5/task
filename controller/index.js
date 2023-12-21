const  service=require('./service')

//save
const saveUser=async(req,res)=>
{
    const data= await service.saveDetails(req.body)
    if(data)
    {
     
res.send('stored successfully')
    }
    else{
        ('already exixt')
    }
}


//save2
const saving=async(req,res)=>
{
    
    const mailcheck= await service.saves(req.body)
    if(mailcheck)
    {
        res.send('stored successfully')
    }
    else
    {
        res.send('already exit')
    }
}

//getall
const gets=async(req,res)=>
{
    const savedata=await service.get()
    res.send (savedata)
}
//Update
const db=async(req,res)=>
{
const email=await service.update(req.body)
res.send(email)
}

//lookup
//const look=async(req,res)=>
//{
    
    //const mailcheck= await service.create()
   // res.send(mailcheck)
//}
const getdata = async(req,res)=>
{
    //var emp_id=req.body.Employee_id
   // var month=req.body.Month
   // var year=req.body.Year
   // console.log(month);

    const data=await service.create(req.body)
    res.send(data)
}
//update salary,basic, hra
const update=async(req,res)=>
{
    const get=await service.saveDetails(req.body)
    if(get.length==0)
    {
       res.send("employee id not found")
    }
    const email=await service.storedetail(req.body)
    if(email)
    {
        res.send(" updated successfully")
    }
    else
    {
        res.send(" could not be updated")
    }
}
const getdata1=async(req,res)=>{
    var emp_id=req.body.Employee_id
    var month=req.body.Month
    var year=req.body.Year
    console.log(month);

    const data=await service.findpayempid({emp_id,month,year})
    res.send(data)
}

module.exports=
{
    saveUser,
    saving,
    gets,
    db,
    getdata,
    update,
    getdata1
}