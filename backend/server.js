require('dotenv').config()

const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require("body-parser");
const cors=require('cors')
const cookieParser=require('cookie-parser');
const client=require('./mongodb')

const app=express()
mongoose.set('strictQuery',false)

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())


const dbURI=process.env.DB_URI
const PORT = process.env.PORT || 3000


const saveImage = require("./routes/saveImage");
const getImage = require("./routes/getImage");
const signIn = require("./routes/signIn");
const login=require('./routes/login')
const checkUser=require('./middleware/checkUser')

app.use("/saveImage", saveImage)
app.use("/getImage", getImage)
app.use("/signIn", signIn)
app.use("/login", login)
app.use("/checkUser", checkUser)

const start=async()=>{
    try{
        await client.connect()
        app.listen(PORT,()=>{
            console.log(`Listening on port ${PORT}`);
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ error: err, message: "Error connecting to database"})
    }
}

start()
app.get("/",(req,res)=>{
    res.send("Hello World")
})





