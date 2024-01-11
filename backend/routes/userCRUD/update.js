const express=require('express');
const router=express.Router();
const User=require('../../models/users')

const validate=async (name)=>{
    if (!name || name.length<1){
        return false
    }
    if (name.includes(["1","2","3","4","5","6","7","8"])){
        return false
    }
    return true
}
router.post("/",async (req,res)=>{
    try{
        const {name,image,email}=req.body
        const user=await User()
        const result=await user.findOne({email:email})

        if (result){
            if (validate(name)){
                const update=await user.updateOne({email:email},{$set:{name:name,image:image}})
                res.status(200).json({message:"Successfully updated"})
            }
            else{
                res.status(400).json({error:"Invalid name"})
            }
        }
        else{
            res.status(400).json({error:"User not found"})
        }

    }
    catch(error){
        res.status(500).json({error:error})
    }
})


module.exports=router   