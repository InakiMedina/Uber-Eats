class UIStorage {


	static getProduct(productUuid) {
		const products = this.storage.products
		return products.find(p => p.uuid == productUuid)
	}

	static findProxy(productUuid) {
		return this.storage.proxies.find(p => p.productUuid == productUuid)
	}

	static async addItem(product, amount) {
		let item = this.findProxy(product.uuid)

		if (item) 
			return this.updateItem(product.uuid, amount + item.amount)
		
		item = new ProductProxy(product.uuid, amount)
		
		const proxies = this.storage.proxies
		const products = this.storage.products
		proxies.push(item.toJson())	
		products.push(product)
		this._updateStorage({...this.storage, proxies, products})
		return item
	}

	static async updateItem(productUuid, newAmount) {
		if (newAmount < 0)
			throw ShoppingCartException("amount cant be negative")

		if (newAmount == 0)
			return this.removeItem(productUuid)

		const proxies = this.storage.proxies.map(item => (
			item.productUuid == productUuid ? {...item, amount: newAmount}: item))

		this._updateStorage({...this.storage, proxies})
		return this.findProxy(productUuid)
	}

	static removeItem(productUuid) {
		const storage = this.storage
		const proxies = storage.proxies.filter(item => item.productUuid != productUuid)
		this._updateStorage({...storage, proxies})
	}

	static calculateTotal() {
		let total = 0
		this.storage.proxies.forEach(item => {
			const prod = this.getProduct(item.productUuid)
			total += item.amount * prod.pricePerUnit
		});
		return total;
	}

	static _storeProxies(array){
		window.sessionStorage.setItem("proxies", array)
	}

	static _storeProducts(array){
		window.sessionStorage.setItem("products", array)
	}

	static set proxies(array) {
		throw new ProductException("proxies cannot be modified")
		
	}

	static get proxies() {
		const prxs = window.sessionStorage.getItem("proxies")
		if (!prxs) {
			window.sessionStorage.setItem("proxies", JSON.stringify([]))
			return []
		}
		return JSON.parse(prxs)
	}

	static set products(array) {
		throw new ProductException("products cannot be modified")
	}

	static get products() {
		return window.sessionStorage.getItem("products")
	}

	static get storage() {
		let storage = window.sessionStorage.getItem("Shopping Cart")
		if (!storage) {
			storage = {
				proxies: [],
				products: []
			}
			this._updateStorage(storage)
		} else {
			storage = JSON.parse(storage)
		}
		return storage
	}
	static _updateStorage(storage) {
		window.sessionStorage.setItem("Shopping Cart", JSON.stringify(storage))
	}

}

class ProductProxy{
	constructor(productUuid, amount) {
		this.productUuid = productUuid
		this.amount = amount
	}

	toJson() {
		return {"productUuid": this.productUuid, "amount": this.amount}
	}

}

class ShoppingCartException{
	constructor(msg) {
		this.msg = msg
	}
}
