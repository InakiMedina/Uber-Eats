
const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => res.send("this is not a valid route, you must be lost"))

router.get('/bubbles', (req, res) => res.sendFile(path.resolve(__dirname + "/../widgets/backgrounds/bubbles.html")))

module.exports = router;