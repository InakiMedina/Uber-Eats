const express = require('express')
const fs = require('fs')
const { Product } = require('./product')
const {productSchema} = require('../data/products_schema')
const mongoose = require('mongoose')

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
		var p = await this.ProductM.find({})
		return p
	}

	async getProductById(uuid) {
		return (await this.getProducts()).find((p) => p.uuid == uuid)
	}

	async createProduct(json) {
		const newProd = Product.createFromJson(json)
		await this.getProducts()
		const existingProd = this._products.find(p => p.uuid == newProd.uuid)
		if (existingProd)
			return existingProd
		this._products.push(newProd)
		await this._storeProducts()
		return newProd
	}

	async updateProduct(uuid, json) {
		let index = (await this.getProducts()).findIndex((p) => p.uuid == uuid)
		const newJson = {...json, uuid}
		if (index < 0)
			return null
		this._products[index].setJson(newJson)
		await this._storeProducts()
		return this._products[index]
	}

	async deleteProduct(uuid) {
		const index = (await this.getProducts()).findIndex((p) => p.uuid == uuid)
		if (index < 0)
			return null
		const delProd = this._products[index]
		this._products.splice(index, 1)
		await this._storeProducts()
		return delProd
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

		console.log('here')
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