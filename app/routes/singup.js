const path = require('path')
const cors = require('cors')
const express = require('express')

const router = express.Router()

router.use(cors())




router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/singup.html")))

router.get('/modal', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/singup_modal.html")))

module.exports = router;

