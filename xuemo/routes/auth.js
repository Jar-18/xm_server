var express = require('express');
var router = express.Router();

var authService = require('../service/auth');

router.post('/requestTempAuth', function(req, res, next) {
	authService.requestTmpAuth()
		.then(function(authRes) {
			res.status(200)
				.json(authRes);
		});
});

router.post('/signAuth', function(req, res, next) {

});

router.all('*', function(req, res, next) {
	// GET 'http://www.example.com/admin/new'
	console.log(req.originalUrl); // '/admin/new'
	console.log(req.baseUrl); // '/admin'
	console.log(req.path); // '/new'
	var token = req.body.token || req.query.token || req.headers['authorization'];
	var authRes = authService.verifyAuth(token);
	if ('Success' == authRes.status) {
		next();
	} else {
		res.status(401)
			.json({
				message: 'Authorization fails'
			});
	}
});

module.exports = router;