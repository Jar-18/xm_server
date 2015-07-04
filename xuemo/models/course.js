"use strict";

module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    describe: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.User, {
          as: "teacher"
        });
        Course.belongsTo(models.Category, {
          as: "category"
        });
        Course.belongsTo(models.District, {
          as: "district"
        });
        Course.hasMany(models.CoursePic, {
          as: "pics",
          foreignKey: "courseId"
        });
        Course.belongsToMany(models.User, {
          as: "followers",
          through: models.CourseFavourite,
          foreignKey: "courseId"
        });
      }
    }
  });

  return Course;
};