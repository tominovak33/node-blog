var path = require('path');
var router = require('express').Router();

router.get('/', function (request, response) {
	var abs_path = path.resolve(__dirname+'/../layouts/posts.html');
	console.log(abs_path);
	response.sendFile(abs_path);
})

module.exports = router;