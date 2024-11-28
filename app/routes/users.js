const cors = require('cors')
const express = require('express')

const router = express.Router()

const { UserHandler } = require('../controllers/user_handler')
const UH = new UserHandler()

router.use(cors())

router.post('/', async (req, res) => {

	if (!req.body) 
		return res.sendStatus(400);

	const newUser = await UH.createUser(req.body);

	return res.status(200).json(newUser);
})

router.get('/', async (req, res) => {
	res.status(200).json(await UH.getUsers())
})

router.get('/:uuid', async (req, res) => {
	res.status(200).json(await UH.getUserById(req.params.uuid))
})

router.delete('/:uuid', async (req, res) => {
	const deleteUser = await UH.deleteUser(req.params.uuid)
	if (!deleteUser)
		res.status(400).send("user dosen't exist")
	res.status(200).json(deleteUser)
})

router.put('/:uuid', async (req, res) => {
	if (!req.body)
		res.status(400).send("no body")


	const updatedUser = await UH.updateUser(req.params.uuid, req.body)
	if (!updatedUser)
		res.status(400).send("user dosen't exist")
	res.status(200).json(updatedUser)
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
		uuid: user.uuid,
		email: user.email,
		username: user.username,
		role: user.role,
	};


	const accessToken = jwt.sign(tokenPayload, 'nunca vas a adivinar mi secreto');

	res.status(201).json({accessToken})

})

router.post('/signup', async (req, res) => {
	
	let bod = req.body

	if (!bod) {
		console.log("no body in request")
		return res.sendStatus(400)
	}

	const existingUser = await UH.getUserByEmail(bod.email)
	if (existingUser != null) {
		return res.sendStatus(406)
	}

	const user = {
		email: bod.email,
		username: bod.username,
		imageUrl: "https://w1.pngwing.com/pngs/860/49/png-transparent-circle-silhouette-user-user-interface-user-profile-black-black-and-white-line-thumbnail.png",
		password: bod.password,
		address: bod.address,
		role: "user",
	}

	const newUser = await UH.createUser(user);

	const tokenPayload = {
		uuid: newUser.uuid,
		email: newUser.email,
		username: newUser.username,
		role: newUser.role,
	};

	const accessToken = jwt.sign(tokenPayload, 'nunca vas a adivinar mi secreto');

	return res.status(200).json(accessToken)

})

module.exports = router