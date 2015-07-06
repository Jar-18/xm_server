var models = require('../models');
var express = require('express');
var router = express.Router();

var courseFavouriteService = require('../service/courseFavourite');

router.get('/', function(req, res) {
	var userId = req.query.userId;
	var params = {
		pageSize: req.query.pageSize ? req.query.pageSize : 10,
		pageNumber: req.query.pageNumber ? req.query.pageNumber : 1
	}
	courseFavouriteService.findAll(userId, params)
		.then(function(courses) {
			res.status(200)
				.json(courses);
		});
})
.post('/', function(req, res) {
	var params = {
		userId: req.body.userId,
		courseId: req.body.courseId
	};
	courseFavouriteService.create(params)
		.then(function(result) {
			res.status(201)
				.json({
					status: "Success"
				});
		});
})
.delete('/', function(req, res) {
	var params = {
		userId: req.query.userId,
		courseId: req.query.courseId
	};
	courseFavouriteService.delete(params)
		.then(function(result) {
			res.status(200)
				.json({
					status: "Success"
				});
		});
});

module.exports = router;