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

	async getUsers() {
		return await(this.UserM.findOne({}))
	}

	async getUserById(uuid) {
		return await(this.UserM.findOne({uuid}))
	}
	async getUserByEmail(email) {
		return await(this.UserM.findOne({email}))
	}

	async deleteUser(uuid) {
		const existingUser = await this.getUserById(uuid)
		if (!existingUser)
			return null

		await this.db.collection("users").deleteOne({uuid})
		return existingUser
	}

	async updateUser(uuid, json) {
		const existingUser = await this.getUserById(uuid)
		if (!existingUser)
			return null

		json.uuid = uuid
		await this.db.collection("users").updateOne({uuid}, {$set: json})
		return json
	}
}

module.exports = { UserHandler }