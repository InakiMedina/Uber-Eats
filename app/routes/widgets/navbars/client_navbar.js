
const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => res.send("this is not a valid route, you must be lost"))

router.get('/client', (req, res) => res.sendFile(path.resolve(__dirname + "/../../../widgets/navbars/client_navbar.html")))

module.exports = router;