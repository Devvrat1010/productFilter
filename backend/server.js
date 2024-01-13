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



const signUp = require("./routes/userCRUD/signUp");
const login=require('./routes/userCRUD/login')
const checkUser=require('./middleware/checkUser')
const update=require('./routes/userCRUD/update')
const deleteUser=require('./routes/userCRUD/delete')
const writeAdminMails=require('./routes/userCRUD/writeAdminMails')
const getAllUsers=require('./routes/userCRUD/getAllUsers')
const getOneUser=require('./routes/userCRUD/getOneUser')


app.use("/signUp", signUp)
app.use("/login", login)
app.use("/checkUser", checkUser)
app.use("/update", update)
app.use("/delete", deleteUser)
app.use("/writeAdminMails", writeAdminMails)
app.use("/getAllUsers", getAllUsers)
app.use("/getOneUser", getOneUser)

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





