var models = require('../models');

var dateUtil = require('../util/dateUtil');

exports.create = function(newUser) {
	if (newUser.password) {
		var sha1 = crypto.createHash('sha1');
		sha1.update(password);
		newUser.passwordHash = sha1.digest();
	}

	if (newUser.birthday) {
		var birthdayDate = new Date(newUser.birthday);
		var now = new Date();
		newUser.age = 1900 + now.getYear() - newUser.birthday.split('-')[0];
		newUser.constellation = dateUtil.specifyConstellation(birthdayDate);
	}

	return models.User.create(newUser);
}

exports.findOne = function(userId) {
	return models.User.findOne({
		where: {
			id: userId
		},
		attributes: ['nickname', 'gender', 'age', 'portrait', 'motto', 'constellation', 'districtId'],
		include: [{
			model: models.Category,
			as: "interests",
			attributes: ['id', 'name']
		}, {
			model: models.District,
			as: "district",
			attributes: ['id', 'name', 'fullName']
		}]
	});
}

exports.modify = function(modifiedUser) {
	if (modifiedUser.password) {
		var sha1 = crypto.createHash('sha1');
		sha1.update(password);
		modifiedUser.passwordHash = sha1.digest();
	}

	if (modifiedUser.birthday) {
		var birthdayDate = new Date(modifiedUser.birthday);
		var now = new Date();
		modifiedUser.age = 1900 + now.getYear() - modifiedUser.birthday.split('-')[0];
		modifiedUser.constellation = dateUtil.specifyConstellation(birthdayDate);
	}

	return models.User.find(modifiedUser.id)
		.then(function(user) {
			return user.updateAttributes(modifiedUser);
		})
}