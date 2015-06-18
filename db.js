var mongoose = require('mongoose');

if (process.env.TEST == 1 || process.env.PORT == 3001) {
	mongoose.connect('mongodb://localhost/social-test', function () {
		console.log('Connected to test database');
	})
}
else {
	mongoose.connect('mongodb://localhost/social', function () {
		console.log('Connected to mongodb');
	})
}

module.exports = mongoose;