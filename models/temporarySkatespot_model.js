var mongoose = require('mongoose');

var temporarySkatespotSchema = new mongoose.Schema({
	name: { type: String, require: true },
	description: String,
	address: String,
	date: { type: Date, default: Date.now },
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
	latLng: { type: String, require: true },
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String,
	}
});

var TemporarySkatespot = mongoose.model('TemporarySkatespot', temporarySkatespotSchema);

module.exports = TemporarySkatespot;