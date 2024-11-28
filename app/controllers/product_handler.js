const express = require('express')
const fs = require('fs')
const { Product } = require('./product')
const {productSchema} = require('../data/products_schema')
const mongoose = require('mongoose')
const { NULL } = require('node-sass')

class DataHandler {

	constructor() {
		this.mongoConnection = "mongodb+srv://invalidosupremo:putaespalda@cluster0.kiqepzq.mongodb.net/MyAppDB"
		this.db = mongoose.connection
		mongoose.connect(this.mongoConnection)
		this.ProductM = mongoose.model('products', productSchema)
	}

	async _loadProducts() {
		// const prods = JSON.parse(await fs.readFileSync('./app/data/products.json'))
		// this._products = prods.map(j => Product.createFromJson(j))
	}
	async _storeProducts() {
		await fs.writeFileSync('./app/data/products.json', JSON.stringify(this._products.map(p => p.toJson())))
	}

	async getProducts() {
		return await this.ProductM.find({})
	}

	async getProductById(uuid) {
		return (await this.getProducts()).find((p) => p.uuid == uuid)
	}

	async createProduct(json) {
		const newProd = Product.createFromJson(json)
		
		let user = this.ProductM(newProd.toJson())
		await user.save()
		return user
	}

	async updateProduct(uuid, json) {
		json.uuid = uuid
		const newProd = Product.createFromJson(json)
		
		const existingProd = await this.getProductById(uuid)
		console.log(existingProd)
		if (!existingProd)
			return null


		await this.db.collection('products').updateOne({uuid: newProd.uuid}, {$set: newProd.toJson()})
	}

	async deleteProduct(uuid) {
		const existingProd = this.ProductM.findOne({uuid: uuid})
		if (!existingProd)
			return null
		

		this.db.collection('products').deleteOne({uuid: uuid})
		return existingProd
	}

	async findByTitle(title) {	
		return await this.ProductM.find({ title: title })
	}

	async findByCategory(category) {
		return await this.ProductM.find({ category: category })
	}

	async findByBoth(title, category) {
		return await this.ProductM.find({title : title, category: category})
	}

	async findProducts(query) {
		const vals = query.split(':')
		console.log("vals 2 :" + vals[0] + ';')
		if (vals[1] == '') 
			return await this.findByTitle(vals[0])

		if (vals[0] == "")
			return await this.findByCategory(vals[1])

		return await this.findByBoth(vals[0], vals[1])
	}

	async findProductsByRange(query) {
		const range = query.split(':')
		return (await this.getProducts()).slice(range[0], range[1])
	}

	async getProdSize() {
		return (await this.getProducts()).length
	}
}
module.exports = { DataHandler }