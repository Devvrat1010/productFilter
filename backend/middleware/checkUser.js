const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const User=require('../models/users')
const {ObjectId}=require('mongodb')


router.get("/",async (req,res,next)=>{
    const token = req.get('Authorization');
    // console.log(token,"this check token")
    
    if (token){
        jwt.verify(token,process.env.JWT_SECRET,async (err,decodedToken)=>{

            if (err){
                res.status(200).json({error:err,message:"Server Error"})
                return 
            }
            else{

                console.log(decodedToken,"decodedToken")
                const check=decodedToken.id
                console.log(check,"check")
                const user=await User()
                const final=await user.findOne({_id:new ObjectId(decodedToken.id)})
                res.status(200).json({user:final})
                return
            }
        })
    }
    else{
        res.status(500).json({error:"token not founddd"})
    }

    
})

module.exports=router 