var mongoose = require('mongoose');

var Joke = mongoose.model('Joke', {
	content: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	funny: {
		type: Boolean,
		default: false
	}
});

module.exports = {Joke};