var express = require('express');
var router = express.Router();

var courseService = require('../service/course');

router.get('/', function(req, res, next) {

		var pageSize = req.query.pageSize ? req.query.pageSize : 10;
		var pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
		var sorter = req.query.orderBy ? req.query.orderBy : 'latest';
		var filter = {
			exceptCourseId: req.query.exceptCourseId,
			teacherId: req.query.teacherId,
			districtId: req.query.districtId,
			categoryId: req.query.categoryId
		};

		courseService.findAll(filter, sorter, pageNumber, pageSize)
			.then(function(coursesWithCount) {
				res.set({
					'Access-Control-Expose-Headers': 'X-Total-Count',
					'X-Total-Count': coursesWithCount.count
				});
				res.status(200)
					.json(coursesWithCount.courses);
			})
			.catch(function(err) {

			});
	})
	.post('/', function(req, res, next) {
		var newCourse = {
			title: req.body.title,
			price: req.body.price,
			describe: req.body.describe,
			districtId: req.body.district.id,
			location: req.body.location,
			pics: req.body.pics
		};
		courseService.create(newCourse)
			.then(function(course) {
				res.status(201)
					.json(course);
			});
	});

router.get('/:courseId', function(req, res, next) {

})

module.exports = router;