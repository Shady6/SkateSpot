var mongoose = require('mongoose');

var skatespotSchema = new mongoose.Schema({
	name: String,
	description: String,
	address: String,
	date: String,
	photo: [{
		type: String
	}],
	surface: String,
	obstacles: {
		ledge: String,
		stairs: String,
		quarter: String,
		kicker: String,
		downhill: String,
		rail: String,
		bank: String,
		skatepark: String,
		flatground: String,
		manualpad: String
	},
	latLng: String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String,
	},
	photoEditor: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}
});

var Skatespot = mongoose.model('Skatespot', skatespotSchema);

module.exports = Skatespot;

