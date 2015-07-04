var models = require('../models');

exports.findChildDistricts = function(districtId) {
	return models.District.find({
		where: {
			id: districtId
		}
	}).then(function(district) {
		if (district != null) {
			return models.District.findAll({
				where: {
					code: {
						$like: district.code + '%'
					}
				}
			});
		}
		else {
			throw Error("Not found this district");
		}
	})
}