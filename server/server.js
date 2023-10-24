const express=require("express")
const app=express()
const cors=require("cors")
require("../database/db")
const authRoutes=require('./routes/authRoutes')
const taskRoutes=require('./routes/taskRoutes')
const morgan = require("morgan")
const port=4000;

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use('/auth',authRoutes)
app.use('/task',taskRoutes)
console.log("hi")
app.listen(port,()=>{
    console.log("listening on port :",port);
})