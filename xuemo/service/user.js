var models = require('../models');

var dateUtil = require('../util/dateUtil');

exports.createUser = function(params) {
	if (params.password) {
		var sha1 = crypto.createHash('sha1');
		sha1.update(password);
		params.passwordHash = sha1.digest();
	}

	if (params.birthday) {
		var birthdayDate = new Date(params.birthday);
		var now = new Date();
		params.age = 1900 + now.getYear() - params.birthday.split('-')[0];
		params.constellation = dateUtil.specifyConstellation(birthdayDate);
	}

	return models.User.create(params);
}