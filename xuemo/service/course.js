var models = require('../models');

var dateUtil = require('../util/dateUtil');

exports.create = function(newCourse) {
	return models.Course.create(newCourse)
		.then(function(course) {
			var promiseArr = [];
			for (var i = 0; i < newCourse.pics.length; i++) {
				promiseArr.push(models.CoursePic.create({
					name: newCourse.pics[i].name,
					courseId: course.id
				}));
			}
			return models.sequelize.all(promiseArr)
				.then(function(result) {
					return course;
				});
		});
}

exports.findAll = function(filter, sorter, pageNumber, pageSize) {
	var promiseArr = [];
	var handledFilter = {};
	var handledSorter;

	if ('latest' == sorter) {
		handledSorter = 'updatedAt DESC';
	} else if ('hotest' == sorter) {
		handledSorter = 'ratingCount DESC';
	} else {
		handledSorter = 'updatedAt DESC';
	}

	if (filter.districtId != null) {
		promiseArr.push(districtService.findChildDistricts(filter.districtId)
			.then(function(districts) {
				var districtArr = [];
				for (var i = 0; i < districts.length; i++) {
					districtArr.push(districts[i].id);
				}
				otherFilters.districtArr = districtArr;
			}));
	}
	if (filter.categoryId != null) {
		promiseArr.push(categoryService.findChildCategories(filter.categoryId)
			.then(function(categories) {
				var categoryArr = [];
				for (var i = 0; i < categories.length; i++) {
					categoryArr.push(categories[i].id);
				}
				otherFilters.categoryArr = categoryArr;
			}));
	}

	return models.sequelize.Promise.all(promiseArr)
		.then(function() {
			return _findIdArr(handledFilter, handledSorter, pageNumber, pageSize);
		})
		.then(function(result) {
			var count = result.count;
			var courses = result.rows;
			var courseIdArr = [];
			for (var i = 0; i < courses.length; i++) {
				courseIdArr.push(courses[i].id);
			}
			return findByIdArr(courseIdArr, handledSorter)
				.then(function(courses) {
					var coursesWithCount = {
						count: count,
						courses: courses
					};
					return coursesWithCount;
				});
		});
}

exports.findByIdArr = function(idArr) {
	return models.Course.findAll({
		where: {
			id: {
				$in: courseIdArr
			}
		},
		attributes: ['id', 'title', 'price', 'status', 'rating', 'ratingCount', 'teacherId', 'categoryId', 'createdAt', 'updatedAt'],
		order: handledSorter,
		include: [{
			model: models.User,
			as: "teacher",
			attributes: ['id', 'nickname', 'gender', 'age']
		}, {
			model: models.Category,
			as: "category",
			attributes: ['id', 'name'],
		}, {
			model: models.District,
			as: "districts",
			attributes: ['id', 'name', 'fullName'],
		}, {
			model: models.CoursePic,
			as: "pics",
			attributes: ['name']
		}],
	});
}

exports._findIdList = function(handledFilter, handledSorter, pageNumber, pageSize) {
	return models.Course.findAndCountAll({
		where: {
			id: {
				$ne: handledFilter.exceptCourseId
			},
			teacherId: handledFilter.teacherId,
			categoryId: {
				$in: handledFilter.categoryIdArr
			},
			districtId: {
				$in: handledFilter.districtIdArr
			}
		},
		attributes: ['id'],
		offset: (pageNumber - 1) * pageSize,
		limit: pageSize,
		order: handledSorter,
	});
}