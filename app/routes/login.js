const path = require('path')
const cors = require('cors')
const express = require('express')

const router = express.Router()

router.use(cors())




router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/login.html")))

router.get('/modal', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/login_modal.html")))

module.exports = router;






