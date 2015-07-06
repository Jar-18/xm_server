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
    teacherId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    describe: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.User, {
          as: "teacher",
          foreignKey: "teacherId"
        });
        Course.belongsTo(models.Category, {
          as: "category",
          foreignKey: "categoryId"
        });
        Course.belongsTo(models.District, {
          as: "district",
          foreignKey: "districtId"
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