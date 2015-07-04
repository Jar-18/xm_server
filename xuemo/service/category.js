var models = require('../models');

exports.findChildCategories = function(categoryId) {
	return models.Category.find({
		where: {
			id: categoryId
		}
	}).then(function(category) {
		return models.Category.findAll({
			where: {
				code: {
					$like: category.code + '%'
				}
			}
		});
	})
}