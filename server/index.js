require('dotenv').config();
const express = require("express");
const cors = require('cors');
const connectDb = require("./config/db");
const app = express();
const User = require('./models/User')
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());
connectDb();
const PORT = process.env.PORT || 8080;


app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
})
app.use('/api', authRoutes);


app.get("/candidate" , (req, res) =>{
    
})
