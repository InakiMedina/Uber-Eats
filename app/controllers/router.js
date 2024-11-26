const express = require('express')

const productRouter = require('../routes/products')
const adminProductRouter = require('../routes/admin_products')
const usersRouter = require('../routes/users')
const widgetsRoutes = require('../routes/widgets')
const tokenRouter = require('../routes/tokens')
const loginRoutes = require('../routes/account/login')
const singupRoutes = require('../routes/account/singup')
const profileRoutes = require('../routes/account/profile')

const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express();
app.use(cors())

// configure the app to use bodyParser()


function validateAdmin (req, res, next) {
	if (req.body['x-auth'] == 'admin')
		next()
	else 
		res.sendStatus(401)
}
app.use(router)
app.use(express.json())
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
router.use('/api/products', productRouter)
router.use('/api/admin/products', validateAdmin, adminProductRouter)
router.use('/api/users', usersRouter)
router.use('/api/token', tokenRouter)

router.use('/widgets', widgetsRoutes)
router.use('/login', loginRoutes)
router.use('/singup', singupRoutes)
router.use('/profile', profileRoutes)

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")))
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")))
router.get('/shopping_cart', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/shopping_cart.html")))
router.get('/packages', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/packages.html")))

module.exports = router
