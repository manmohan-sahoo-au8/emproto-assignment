const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

//connecting to database
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(()=> {
  console.log("Connected to Database")
}) .catch((error)=>{
  console.log(error)
})