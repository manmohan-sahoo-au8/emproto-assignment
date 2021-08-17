const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

router.post("/register",userController.create)
router.post("/login",userController.authenticate)
router.get("/",userController.getAll)
router.put("/:userId",userController.updateById)
router.delete("/:userId",userController.deleteById)


module.exports = router