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

router.get('/profile', function (request, response) {
	//var username = request.body.username;
	var username = get_query_username_param(request._parsedUrl.query);
	//Get user info from database here
	
	User.findOne({username: username}, function (error, user) {
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


var get_query_username_param = function(query_string){
	if (!query_string) {
		return null;
	}
	var queries = query_string.split("&");

	for (var item in queries) {
		var query = queries[item];
		var query_parts = query.split("=");

		var name = query_parts[0];
		var value = query_parts[1];

		if (name == 'username') {
			return value;
		}
	}

	return null;
};

module.exports = router;