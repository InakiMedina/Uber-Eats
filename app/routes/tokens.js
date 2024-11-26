const path = require('path')
const cors = require('cors')
const express = require('express')

const router = express.Router()

const { TH } = require('../controllers/token_handler')
const { isTypedArray } = require('util/types')

router.use(cors())

router.get('/', async (req, res) => {
	
	token = await TH.getToken()
	
	return res.send(token) 
	
})

router.post('/', async (req, res) => {
	
})

module.exports = router;