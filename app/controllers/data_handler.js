const express = require('express')
const fs = require('fs')
const { Product } = require('./product')

class DataHandler {

	static _products

	static async _loadProducts() {
		const prods = JSON.parse(await fs.readFileSync('./app/data/products.json'))
		DataHandler._products = prods.map(j => Product.createFromJson(j))
	}
	static async _storeProducts() {
		await fs.writeFileSync('./app/data/products.json', JSON.stringify(this._products.map(p => p.toJson())))
	}

	static async getProducts() {
		if (!DataHandler._products) 
			await DataHandler._loadProducts()
		return DataHandler._products
	}

	static async getProductById(uuid) {
		return (await DataHandler.getProducts()).find((p) => p.uuid == uuid)
	}

	static async createProduct(json) {
		const newProd = Product.createFromJson(json)
		await DataHandler.getProducts()
		const existingProd = DataHandler._products.find(p => p.uuid == newProd.uuid)
		if (existingProd)
			return existingProd
		DataHandler._products.push(newProd)
		await DataHandler._storeProducts()
		return newProd
	}

	static async updateProduct(uuid, json) {
		let index = (await DataHandler.getProducts()).findIndex((p) => p.uuid == uuid)
		const newJson = {...json, uuid}
		if (index < 0)
			return null
		DataHandler._products[index].setJson(newJson)
		await DataHandler._storeProducts()
		return DataHandler._products[index]
	}

	static async deleteProduct(uuid) {
		const index = (await DataHandler.getProducts()).findIndex((p) => p.uuid == uuid)
		if (index < 0)
			return null
		const delProd = DataHandler._products[index]
		DataHandler._products.splice(index, 1)
		await DataHandler._storeProducts()
		return delProd
	}

	static async findByTitle(title) {	
		return (await this.getProducts()).filter(p => p.title == title)
	}

	static async findByCategory(category) {
		return (await this.getProducts()).filter(p => p.category == category)
	}

	static async findByBoth(title, category) {
		return (await DataHandler.findByTitle(title)).filter(p => p.category == category)
	}

	static async findProducts(query) {
		const vals = query.split(':')

		if (vals.length == 1) 
			return await DataHandler.findByTitle(vals[0])
		
		if (vals.length == 2 && !vals[1])
			return await DataHandler.findByCategory(vals[0])

		return await DataHandler.findByBoth(vals[0], vals[1])
	}

	static async findProductsByRange(query) {
		const range = query.split(':')
		return (await DataHandler.getProducts()).slice(range[0], range[1])
	}

	static async getProdSize() {
		return (await DataHandler.getProducts()).length
	}
}
module.exports = { DataHandler }