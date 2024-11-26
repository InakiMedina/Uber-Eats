const cors = require('cors')
const express = require('express')

const router = express.Router()

const { UserHandler } = require('../controllers/user_handler')
const UH = new UserHandler()

router.use(cors())

router.post('/', async (req, res) => {

	if (!req.body.user) 
		return res.sendStatus(400);

	const newUserUuid = await UH.createUser(req.body.user);

	return res.status(200).send(newUserUuid);
})

router.get('/:id', async (req, res) => {
	res.send(await UH.getUserById(req.params.id))
})

const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
	if (!req.body.email) {
		console.log("no email", req.body.email)
		return res.sendStatus(400);
	} else
	if (!req.body.password) {
		console.log("no pass", req.body.password)
		return res.sendStatus(400);
	}

	const user = await UH.getUserByEmail(req.body.email)
	console.log(user)
	
	if (!user || user.password != req.body.password) //todo: save hashed pwd instead
		return res.sendStatus(401);

	const tokenPayload = {
		email: user.email,
		username: user.username,
		imageURL: user.imageURL,
		role: user.role,
	};
	const accessToken = jwt.sign(tokenPayload, 'nunca vas a adivinar mi secreto');

	res.status(201).json({accessToken})

})

module.exports = router