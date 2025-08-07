const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
      name : {
        type : String,
        required : [true, "Username is required"]
      },
      email : {
        type : String,
        required : [true,"Email is required"]
      },
      password : {
        type : String,
        required : [true, 'Password is required']
      },
      phone:{
        type : String,
        required : [true, "Phone number is required"]
      },
      role : {
        type : String,
        enum : ['admin', 'ceo', 'hr','manager']
      },
      createdBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : null
      }
       
},{ timestamps : true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = new mongoose.model("User", userSchema);

module.exports = User;