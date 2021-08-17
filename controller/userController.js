const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

module.exports={
  create:function(req,res,next) {
    userModel.create({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      password:req.body.password
    },(err,result) => {
      if(err) next(err) // throw(err)
      else
      res.json({status:"Success",message:"user added successfully"})
    })
  },

  authenticate:function(req,res,next) {
    userModel.findOne(
      {email:req.body.email},
      function(err,userInfo) {
        if(err){ next(err)}
        else {
          if (bcrypt.compareSync(req.body.password,userInfo.password)) {
              const token = jwt.sign({id:userInfo._id},req.app.get("secretKey"),{expiresIn:"1h"})
              res.json({status:"success",message:"user found!",data:{user:userInfo,token:token}})
          } else {
              res.json({status:"error",message:"Invalid email/password"})
          }
        }
      })
  }
}