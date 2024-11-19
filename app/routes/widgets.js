
const express = require('express')

const router = express.Router()

const backgroundsRoutes = require('../widgetsRoutes/backgrounds')
const navbarsRoutes = require('../widgetsRoutes/navbars')
const modalsRoutes = require('../widgetsRoutes/modals')

router.get('/', (req, res) => res.send("this is not a valid route, you must be lost"))

router.use('/backgrounds', backgroundsRoutes)
router.use('/navbars', navbarsRoutes)
router.use('/modals', modalsRoutes)

module.exports = router;
