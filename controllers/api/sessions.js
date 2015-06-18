var router = require('express').Router();
var User = require('../../models/user');

var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var config = require('../../config');

var users = [{username: 'user' , password: 'pass'}]


function findUserByUsername (username) {
	return _.find(users, {username: username});
}

function validateUser (user, password) {
	return user.password === password;
}

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

				var token = jwt.encode({username: user.username}, config.secret);
				response.send(token);
			})
	})
})

router.get('/', function (request, response) {
	var token = request.headers['x-auth'];
	var user = jwt.decode(token, secretkey);
	response.json(user);
})

module.exports = router;