var router = require('express').Router();
var User = require('../../models/user');

var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var config = require('../../config');

//Path eqvivalent to /api/session/ not /
router.post('/', function (request, response, next) {
	User.findOne({username: request.body.username})
		.select('password')
		.select('username')
		.exec(function (error, user) {
			if (error) { return next(error) }
			if (!user) {
				response.status(401);
				return response.send('Authentication unsuccessful');
			}
			bcrypt.compare(request.body.password, user.password, function (error, valid) {
				if (error) { return next(error) };
				if (!valid) {
					response.status(401);
					return response.send('Authentication unsuccessful');
				}

				var token = jwt.encode({username: user.username, user_id: user._id}, config.secret);
				response.send(token);
			})
	})
})

module.exports = router;