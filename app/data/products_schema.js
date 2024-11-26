let mongoose = require('mongoose')

let productSchema = mongoose.Schema({
	uuid: {
		type: String,
		required: true
	} ,
    title: {
		type: String,
		required: true
	} ,
    description: {
		type: String,
		required: true
	} ,
    imageUrl: {
		type: String,
		required: true
	} ,
    unit: {
		type: String,
		required: true
	} ,
    stock: {
		type: Number,
		required: true
	} ,
    pricePerUnit: {
		type: Number,
		required: true
	} ,
    category: {
		type: String,
		required: true,
		enum: ["Italian", "Mexican", "Japanese"]
	} 
})

module.exports = {productSchema}