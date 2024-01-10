// const mongoose=require('mongoose');

// const imageSchema=new mongoose.Schema({
//     username:String,
//     image: [String],
// })

// module.exports=mongoose.model('Image',imageSchema)
const client = require("../mongodb");
async function images() {
    try {
        const conn=await client.connect();
        const db = conn.db("pixelhub");
        const images = db.collection("images");
        return images;
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err, message: "Error connecting to table Images" });
    }
}

module.exports = images;
