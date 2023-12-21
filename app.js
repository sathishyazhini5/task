const app=require('express')()
 const bodyparser=require("body-parser")
 app.use(bodyparser.urlencoded({extended:true}))
 app.use(bodyparser.json()) 
 
require('dotenv').config()
require('./config/db')
require('./routes/route')(app)


const port=6001
app.listen(port,()=>
{
  console.log(`server listening on port:${port}`)
})