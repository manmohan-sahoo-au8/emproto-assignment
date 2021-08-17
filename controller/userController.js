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
   },

  getAll:function(req,res,next) {
    let userList = []
    userModel.find({},(err,users) => {
      if(err) {
        next(err)
      } else {
        for(let user of users ){
          userList.push({
            name:user.name,
            email:user.email,
            phone:user.phone,
          })
        }
        res.json({status:"Success",message:"user list found",data:userList})
      }
    })
  },

   updateById:(req,res,next) => {
    userModel.findByIdAndUpdate(req.params.userId,{
      name:req.body.name,
      phone:req.body.phone,      
    },(err,result) => {
      if(err) next(err)
      res.json({status:"success",message:"data updated successfully"})
    })
  },

  deleteById:(req,res,next) => {
    userModel.findByIdAndRemove(req.params.userId,(err,result) => {
      if(err) next(err)
      res.json({status:"success",message:"data deleted successfully"})
    })
  }

}