const express = require('express')
const {userSchema} = require('../data/users_schema')
const mongoose = require('mongoose')
const { generateUUID } = require('./utils')

class UserHandler {
	constructor() {
		this.mongoConnection = "mongodb+srv://invalidosupremo:putaespalda@cluster0.kiqepzq.mongodb.net/MyAppDB"
		this.db = mongoose.connection
		mongoose.connect(this.mongoConnection)
		this.UserM = mongoose.model('users', userSchema)
	}

	async createUser(json) {
		json.uuid = generateUUID()
		let newUser = this.UserM(json)
		await newUser.save()
		return newUser.uuid
	}

	async getUserById(id) {
		return await(this.UserM.findOne({"uuid": id}))
	}
	async getUserByEmail(email) {
		return await(this.UserM.findOne({email}))
	}
}

module.exports = { UserHandler }