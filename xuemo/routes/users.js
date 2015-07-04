var express = require('express');
var router = express.Router();

var userService = require('../service/user');

router.post('/', function(req, res, next) {
	var params = {
		account: req.body.account,
    password: req.body.password,
    nickname: req.body.nickname,
    gender: req.body.gender,
    portrait: req.body.portrait,
    motto: req.body.motto,
    birthday: req.body.birthday
	}
	userService.createUser(params)
		.then(function(user) {
			res.status(201)
				.json(user);
		});
});

router.get('/:userId', function(req, res, next) {

})
.put('/:userId', function(req, res, next) {

});
	
module.exports = router;
