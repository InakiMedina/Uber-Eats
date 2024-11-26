const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')

class TokenHandler {

	static _loadToken() {
		this._token = JSON.parse(fs.readFileSync('./app/data/token.json'))
	}
	static _storeToken() {
		fs.writeFileSync('./app/data/token.json', JSON.stringify(this._token))
		
	}

	static getToken() {
		this._loadToken()
		return this._token
	}

	static setToken(token) {
		this._token =token 
		this._storeToken()
		return
	}

}

module.exports = { TokenHandler }