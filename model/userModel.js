const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10 //which will be used for hashing plain text password

//define schema 

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true, // white spaces will be removed from both sides of the string.("  hello"=> "hello")
    unique:true
  },
  email:{
    type:String,
    required:true,
    trim:true
  },
  phone:{
    type:Number,
    required:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    trim:true
  }
})

// hash user password before saving into database
UserSchema.pre("save",function(next) {
  this.password = bcrypt.hashSync(this.password,saltRounds)
  next()
})

module.exports = mongoose.model("User",UserSchema)