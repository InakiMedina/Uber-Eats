let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
	uuid: {
		type: String,
		required: true
	},
    email: {
		type: String,
		required: true
	} ,
	username: {
		type: String,
		required: true
	} ,
    password: {
		type: String,
		required: true,
		validate: {
		  validator: function(v) {
			return v.length > 4 
		  }
		},
      	message: "la contraseña debe tener al menos 5 caracteres"
	} ,
	address: {
		type: String,
		required: true
	},
    imageUrl: {
		type: String,
	},
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin']
	}
})

module.exports = {userSchema}