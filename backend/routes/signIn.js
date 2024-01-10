const express = require("express");
const router = express.Router();
const bcrypt=require('bcrypt')
const saltRounds = 10;
const jwt=require('jsonwebtoken')
const User=require('../models/users')
const maxAge=3*24*60*60

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:maxAge
    })
}

const validate=async (data)=>{
    const {username,email,password}=data
    if (!username || !email || !password){
        return {message:"Please enter all the fields"}
    }
    if (username.length<1 || email.length<1 || password.length<1){
        return {message:"Please enter all the fields"}
    }
    if (password.length<6){
        return {message:"Password should be atleast 6 characters long"}
    }
    if (username.includes(" ")){
        return {message:"Username should only contain alphabets and numbers and special characters like _ - ."}
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
        console.log(existingUser,"existingUser")
        const check=await existingUser.filter((user)=>{
            if (user.username===req.body.username){
                res.status(400).json({error:"Username already exists"})
                return true
            }
            else if (user.email===req.body.email){
                res.status(400).json({error:"Email already exists"})
                return true
            }
        })

        if (check!==true){
            const validation=await validate(req.body)
            if (validation===true){
                const hash = bcrypt.hashSync(req.body.password, saltRounds);
                const new_user=await user.insert({
                    name:req.body.name,
                    username:req.body.username,
                    email:req.body.email,
                    password:hash,
                    number:req.body.number,
                    image:req.body.image
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
        else{
            res.status(400).json({error:"User already exists"})
            return
        }
        return 
    }
    catch(error){
        console.log(error,"error")
        res.status(500).json({ error: error,message:"server side error"})
    }
})

module.exports = router;