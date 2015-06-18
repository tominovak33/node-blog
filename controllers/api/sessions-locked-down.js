var router = require('express').Router();
var User = require('../../models/user');

var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var config = require('../../config');
var _ =  require('lodash');

var secretkey = 'mysecretkey';
var users = [{username: 'user' , password: 'pass'}]

function findUserByUsername (username) {
	return _.find(users, {username: username});
}

function validateUser (user, password) {
	return user.password === password;
}
 
// '/' is equvivalent to /api/sessions/ due to router
router.post('/', function (request, response) {
	var user = findUserByUsername(request.body.username);
	if (!validateUser(user, request.body.password)) {
		response.staus(401);
		return response.send();
	}

	var token = jwt.encode({username: user.username}, config.secret);
	response.send(token);
})

router.get('/', function (request, response) {
	var token = request.headers['x-auth'];
	var user = jwt.decode(token, secretkey);
	response.json(user);
})

module.exports = router;