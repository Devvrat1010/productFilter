const express = require("express");
const router = express.Router();
const bcrypt=require('bcrypt')
const saltRounds = 10;
const jwt=require('jsonwebtoken')
const User=require('../../models/users')
const Admin=require('../../models/adminEmails')
const maxAge=3*24*60*60

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:maxAge
    })
}

const validateAdmin=async (email)=>{
    const conn=await Admin()
    const checkMail=await conn.findOne({email:email})
    console.log(checkMail,"checkMail")
    if (!checkMail){
        console.log("false--------------------------------------")
        return false
    }
    else{
        console.log("true--------------------------------------")
        return true
    }
}

const validate=async (data)=>{
    const {email,password,admin}=data

    if (!email || !password){
        return {message:"Please enter all the fields"}
    }
    if (email.length<1 || password.length<1){
        return {message:"Please enter all the fields"}
    }
    if (password.length<6){
        return {message:"Password should be atleast 6 characters long"}
    }
    if (email.includes(" ")){
        return {message:"Invalid email address"}
    }
    return true
}

router.post("/", async (req, res) => {
    try{

        const user=await User()
        const existingUser=await user.find().toArray()

        const admin=req.body.admin
        let createAdmin=false

        if (admin){
            if (await validateAdmin(req.body.email)===true){
                createAdmin=true
            }
            else{
                return res.status(400).json({error:"Invalid admin email"})
            }   
        }

        const emailExists = existingUser.some((u) => u.email === req.body.email);
        
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists" });
        }

        else{
            const validation=await validate(req.body)
            if (validation===true){
                const hash = bcrypt.hashSync(req.body.password, saltRounds);
                const new_user=await user.insertOne({
                    name:req.body.name,
                    email:req.body.email,
                    password:hash,
                    number:req.body.number,
                    image:req.body.image,
                    admin:createAdmin
                })
                const token=createToken(new_user._id)
                res.status(200).cookie('LOGIN_INFO',token).json({message:new_user,token:token})
                return
            }
            else{
                res.status(400).json({error:validation.message||"server side error"})
                return
            }
        }

    }
    catch(error){
        console.log(error,"error")
        res.status(500).json({ error: error,message:"server side error"})
        return
    }
})

module.exports = router;