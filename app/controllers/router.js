const express = require('express')

const productRouter = require('../routes/products')
const adminProductRouter = require('../routes/admin_products')
const widgetsRoutes = require('../routes/widgets')
const accountRoutes = require('../routes/account')

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
router.use('/products', productRouter)
router.use('/admin/products', validateAdmin, adminProductRouter)
router.use('/account', accountRoutes)
router.use('/widgets', widgetsRoutes)

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")))
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")))
router.get('/shopping_cart', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/shopping_cart.html")))

module.exports = router



