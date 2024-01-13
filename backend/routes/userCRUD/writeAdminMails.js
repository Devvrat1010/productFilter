const express=require('express')
const router=express.Router()
const User=require('../../models/adminEmails')

router.post("/",async (req,res)=>{
    try{
        const emails=req.body
        const conn=await User()
        for (let i=0;i<emails.length;i++){
            const checkEmail=await conn.findOne({email:emails[i].emails})
            if (!checkEmail){
                await conn.insertOne({email:emails[i].emails})
            }
        }

        res.status(200).json({message:"Admin emails added successfully"})

    }
    catch(error){
        res.status(500).json({error:error})
    }
})

module.exports=router