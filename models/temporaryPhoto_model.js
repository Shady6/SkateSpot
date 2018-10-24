var mongoose = require('mongoose');

var temporaryPhotoSchema = new mongoose.Schema({
	photo: [{
		type: String
	}],
	editor: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String,
	},
	spot: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Skatespot'
		},
		name: String
	}
});

var TemporaryPhoto = mongoose.model('TemporaryPhoto', temporaryPhotoSchema);

module.exports = TemporaryPhoto;