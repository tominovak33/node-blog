var router = require('express').Router();
var User = require('../../models/user');

var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var config = require('../../config');


router.get('/', function (request, response) {
	var token = request.headers['x-auth'];
	var user = jwt.decode(token, config.secret);
	
	//Get user info from database here
	User.findOne({username: user.username}, function (error, user) {
		response.json(user);
	})
})

router.post('/', function (request, response, next) {
	var user = new User({username: request.body.username});
	bcrypt.hash(request.body.password, 10, function(error, hash) {
		user.password = hash;
		user.save(function (error, user) {
			if (error) {
				throw next(error);
			}
			response.status(201);
			response.send("User: " + request.body.username + " created");
		})
	})
})

module.exports = router;