const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));



async function createInitialAdmin() {
    try{
        const existingAdmin = await User.findOne({role : "admin"});
        if(existingAdmin){
            console.log("Admin already exits ");
            return;
        }
        const newAdmin = await User.create({
            name : "amansingh",
            email: "amansingh@gmail.com",
            password : "amansingh5",
            phone : "8968015878",
            role : "admin",
        })
        console.log("Admin created", newAdmin.email);
    }catch(error) {
        console.log("Error creating admin :", error);
    } finally{
        mongoose.disconnect();
    }
}

createInitialAdmin();