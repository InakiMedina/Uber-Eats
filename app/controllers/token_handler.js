const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')

class TokenHandler {

	static async _loadToken() {
		this._token = JSON.parse(await fs.readFileSync('./app/data/token.json'))
	}
	static async _storeToken() {
		await fs.writeFileSync('./app/data/token.json', JSON.stringify(this._token))
	}

	static async getToken() {
		return await _loadToken()
	}

	static async setToken(token) {
		await this._storeToken(token)
	}

}

module.exports = TokenHandler