const express=require('express');
const router=express.Router();
const User=require('../../models/users');

router.get('/',async (req,res)=>{
    try{
        const conn=await User()
        const users=await conn.find().toArray();
        res.status(200).json(users);
    }
    catch(err){
        res.status(400).json('Error: '+err);
    }
});

module.exports=router;