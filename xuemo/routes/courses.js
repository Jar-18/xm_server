var express = require('express');
var router = express.Router();

var courseService = require('../service/course');

router.post('/', function(req, res, next) {
	var params = {
		title: req.body.title,
		price: req.body.price,
		describe: req.body.describe,
		districtId: req.body.district.id,
		location: req.body.location,
		pics: req.body.pics
	};
	courseService.create(params)
		.then(function(course) {
			res.status(201)
				.json(course);
		});
});

router.get('/:courseId', function(req, res, next) {

})

module.exports = router;