const express = require("express");
const router = express.Router();
const Image=require('../models/images')

router.get("/", async (req, res) => {
    try{
        console.log(Image,"images")
        
        const img=await Image()
        const result=await img.find().toArray()
        console.log(result,"result")
        res.status(200).json(result)
    }
    catch(error){
        console.log(error,"eroror")
        res.status(400).json({ error: error })
    }
})

module.exports = router;
