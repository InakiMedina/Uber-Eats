const path = require('path')
const cors = require('cors')
const express = require('express')

const router = express.Router()

const { TokenHandler } = require('../controllers/token_handler')

router.use(cors())

router.get('/', async (req, res) => {
	
	let token = await TokenHandler.getToken()
	
	return res.status(200).send(token) 
	
})

router.post('/', async (req, res) => {
	if (!req.body.token) 
		return res.sendStatus(400)
	console.log(JSON.stringify(req.body))
	await TokenHandler.setToken(req.body)
	return res.sendStatus(200)
})

module.exports = router