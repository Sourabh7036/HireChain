const mongoose = require("mongoose");

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB connection error :", err.message);
        process.exit()
    }


};

module.exports = connectDb;