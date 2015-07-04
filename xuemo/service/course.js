var models = require('../models');

var dateUtil = require('../util/dateUtil');

exports.create = function(params) {
	return models.Course.create(params)
		.then(function(course) {
			var promiseArr = [];
			for (var i = 0; i < params.pics.length; i++) {
				promiseArr.push(models.CoursePic.create({
					name: params.pics[i].name,
					courseId: course.id
				}));
			}
			return models.sequelize.all(promiseArr)
				.then(function(result) {
					return course;
				});
		});
}