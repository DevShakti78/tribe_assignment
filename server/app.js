const express = require('express')
const mongoose = require("mongoose")
const app = express();
const cors = require("cors")
const PORT = 5000;
const {MONGOURI} = require("./keys")
require("./models/user")
require("./models/post")

app.use(cors())
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))


mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("connection succesfull")
})

mongoose.connection.on('err',(err)=>{
    console.log("err connecting",err)
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

