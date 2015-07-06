var models = require("../../models");
var data = require("./data.json");
var districts = require("./districts.json");
var categories = require("./category.json");

var rc = require('redis').createClient();

exports.createInitData = function() {

  rc.flushdb();

  return models.sequelize.sync({
      force: true
    })
    .then(function() {
      return models.District.bulkCreate(districts);
    })
    .then(function() {
      return models.Category.bulkCreate(categories);
    })
    .then(function() {
      return models.User.bulkCreate(data.users);
    })
    .then(function() {
      return models.Course.bulkCreate(data.courses);
    })
    .then(function() {
      return models.CoursePic.bulkCreate(data.coursePics);
    });
}