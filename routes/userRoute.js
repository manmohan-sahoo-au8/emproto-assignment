const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

router.post("/register",userController.create)
router.post("/login",userController.authenticate)


module.exports = router