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