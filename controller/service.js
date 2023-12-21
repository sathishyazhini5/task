const mongoose = require('mongoose')

const empDetailsSchema =new  mongoose.Schema(
    {
    Company_Name: String,
    Employee_id: String,
    Employee_Name: String,
    Gender: String,
    Date_of_Joining: String,
    Location: String,
    Mobile_Number :{ 
        type: String,
        unique : true
    }
});

const empDetailsModel = mongoose.model("empdetails", empDetailsSchema);

const saveDetails = async(data)=>
{
    if(data.length!==0){
        const existingemp = await empDetailsModel.findOne({Mobile_Number:data.Mobile_Number})
        if(existingemp)
        {
            return false
        }
        else
        {
            const newemp = new empDetailsModel(data)
            const saveemp = await newemp.save()
            return saveemp;
        }
    }
    else
    {
        return false
    }

}
//update mobileno
//const updatenumber=async(data)=>
//{
  //  const update=await empDetailsModel.updateOne({Employee_id : data.Employee_id},{Mobile_Number : data.Mobile_Number})
   // return update
//}

const payrollDetailsSchema =  new mongoose.Schema({
    Employee_id: String,
    Salary: String,
    Basic: String,
    HRA: String,
    Conveyance: String,
    Other_allowance: String,
    Total_Detuctions : String,
    LOP: String,
    Month: String,
    Year: String,
    Designation: String,
    PAN: String,
    Bank_AC_Number: String
});

const payrollDetailsModel = mongoose.model('payrolldetails',payrollDetailsSchema);


//lookup
const findpayempid=async(data)=>{
    console.log(data);
    let getInfo

    getInfo=await payrollDetailsModel.aggregate([
        {$match:{Employee_id:data.emp_id,Month:data.month,Year:data.year}},
        {
            $lookup:{
                from:'empdetails',
                localField:'Employee_id',
                foreignField:'Employee_id',
                as:'payroll'
            }
        },
        { $unwind:"$payroll"},
        {
            $project:{
                "Company_Name":"$payroll.Company_Name",
                "Employee_id":"$Employee_id",
                "Employee_id":"$payroll.Employee_Name",

                "Gender":"$payroll.Gender",
                "Location":"$payroll.Location",
                "Mobile_Number":"$payroll.Mobile_Number",
                "Date_of_Joining":"$payroll.Date_of_Joining",
                "Designation":"$Designation",
                "Bank_AC_Number":"$Bank_AC_Number",

                "Basic":"$Basic",
                "HRA":"$HRA",
                "PAN":"$PAN",
                "LOP":"$LOP",
                "Conveyance":"$Conveyance",
                "Other_allowance":"Other_allowance",
                "Salary":"$Salary",
                "Total_Detuctions":"$Total_Destutions",
                "Month":"$Month",
                "Year":"$Year"

            }
        }
    ])
    return getInfo
}

module.exports=
{
    saveDetails,
    findpayempid
}