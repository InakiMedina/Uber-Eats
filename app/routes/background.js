const path = require('path')
const cors = require('cors')
const express = require('express')

const router = express.Router()

router.use(cors())

router.get('/', (req, res) => res.send("this is not a valid route, you must be lost"))

router.get('/bubbles', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/bubbles.html")))

module.exports = router;
