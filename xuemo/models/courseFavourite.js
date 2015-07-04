"use strict";

module.exports = function(sequelize, DataTypes) {
  var CourseFavourite = sequelize.define("CourseFavourite", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    timestamps: true,
  });

  return CourseFavourite;
};