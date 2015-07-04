var models = require('../models');
var jwt = require('jsonwebtoken');

var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];

exports.requestTmpAuth = function() {
	return models.TempUser.create({})
		.then(function(tempUser) {
			var userToHash = {
				tempUserId: tempUser.id
			}
			var token = jwt.sign(userToHash, config['secrect'], {
				//expires in 90 days
				expiresInMinutes: 60 * 60 * 24 * 90
			});
			return {
				status: 'Success',
				tempToken: token,
				tempUserId: tempUser.Id
			};
		});
}

exports.signAuth = function(account, password) {

}

exports.verifyAuth = function(token) {
	var decoded;
	try {
		var decoded = jwt.verify(token, config['secrect']);
		return {
			status: 'Success',
			decoded: decoded
		};
	} catch (err) {
		console.log('Auth fail');
	}
	return {
		status: 'Fail'
	};
}