const express = require("express");
const router = express.Router();
const User=require('../../models/users')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const maxAge=3*24*60*60

const createToken=(id)=>{
        return jwt.sign({id},process.env.JWT_SECRET ,{
        expiresIn:maxAge
    })
}

router.post("/", async (req, res) => {
    try{

        const {email,password}=req.body
        const conn=await User()
        const user=await conn.findOne({email:email})
        if (user){
            const authorize=bcrypt.compareSync(password,user.password)
            console.log(authorize)
            if (authorize){
                const token=createToken(user._id)
                res.status(200).json({message:user,token:token})
            }
            else{
                res.status(200).json({error:"Invalid credentials"})
            }
        }
        else{
            res.status(200).json({error:"Invalid credentials"})
            return
        }
    }
    catch(error){
        res.status(400).json({ error: error,message:"server side error" })
    }
})

module.exports = router;