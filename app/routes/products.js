const path = require('path')
const cors = require('cors')
const express = require('express')

const router = express.Router()

const { DataHandler } = require('../controllers/product_handler')
const { isTypedArray } = require('util/types')

router.use(cors())

let ProductHandler = new DataHandler()

router.get('/', async (req, res) => {
	let prods
	if (Object.hasOwn(req.query, 'queryStr')) {
		console.log("query")
		prods = await ProductHandler.findProducts(req.query.queryStr)
	} else if (Object.hasOwn(req.query, 'range'))
		prods = await ProductHandler.findProductsByRange(req.query.range)
	else 
		prods = await ProductHandler.getProducts()
	
	return res.send(prods) //.map(o => o.toJson())
	
})

router.use('/size', async (req, res) => {
	res.send({"size": (await ProductHandler.getProdSize())})
})

router.get('/:id', async (req, res) => {
	res.send((await ProductHandler.getProductById(req.params.id)).toJson())
})




router.post('/cart', async (req, res) => {
	if (!Array.isArray(req.body))
		return res.status(400).send("cart body is not an array")

	let invalidProd = null
	for (let i = 0; i < req.body.length; ++i) {
		const p = req.body[i]
		const item = await ShoppingCart.it().addItem(p.id, p.amount)
		if (!item) {
			invalidProd = p.id
			break
		}
	}
	if (invalidProd) 
		return res.status(404).send(`Product ${invalidProd} not found`)
	return res.status(200).send(ShoppingCart.it().proxies)
})

module.exports = router;

