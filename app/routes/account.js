const express = require('express')
const router = express.Router()


const loginRoutes = require('../routes/account/login')
const singupRoutes = require('../routes/account/singup')
const profileRoutes = require('../routes/account/profile')

router.use('/login', loginRoutes)
router.use('/singup', singupRoutes)
router.use('/profile', profileRoutes)

module.exports = router