exports.specifyConstellation = function(date) {
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (month == 1 && date >= 20 || month == 2 && date <= 18) {
		value = 1;
	}
	if (month == 2 && date >= 19 || month == 3 && date <= 20) {
		value = 2;
	}
	if (month == 3 && date >= 21 || month == 4 && date <= 19) {
		value = 3;
	}
	if (month == 4 && date >= 20 || month == 5 && date <= 20) {
		value = 4;
	}
	if (month == 5 && date >= 21 || month == 6 && date <= 21) {
		value = 5;
	}
	if (month == 6 && date >= 22 || month == 7 && date <= 22) {
		value = 6;
	}
	if (month == 7 && date >= 23 || month == 8 && date <= 22) {
		value = 7;
	}
	if (month == 8 && date >= 23 || month == 9 && date <= 22) {
		value = 8;
	}
	if (month == 9 && date >= 23 || month == 10 && date <= 22) {
		value = 9;
	}
	if (month == 10 && date >= 23 || month == 11 && date <= 21) {
		value = 10;
	}
	if (month == 11 && date >= 22 || month == 12 && date <= 21) {
		value = 11;
	}
	if (month == 12 && date >= 22 || month == 1 && date <= 19) {
		value = 12;
	}
	return value;
}