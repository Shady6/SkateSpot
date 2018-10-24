const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
	 local           : {
        email        : String,
        password     : String,
        username     : String
    },

    facebook         : {
        id           : String,
        username     : String,
        email        : String
    },

    google           : {
        id           : String,
        email        : String,
        username     : String
    },

    isAdmin          : {
        type         : Boolean,
        default      : false
    }
  
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);