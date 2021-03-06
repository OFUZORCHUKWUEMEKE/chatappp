const express = require('express')
const { registerUser,authUser, allUsers } = require('../controllers/userController')
const protect = require('../middleware/auth')

const router = express.Router()

// router.post('/',registerUser)
router.route("/").post(registerUser).get(protect,allUsers)
router.post('/login',authUser)



module.exports = router