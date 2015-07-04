"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    account: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    nickname: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    portrait: DataTypes.STRING,
    motto: DataTypes.STRING,
    birthday: DataTypes.DATE,
    constellation: DataTypes.INTEGER
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Course, {
          as: "courses",
          foreignKey: "teacherId"
        });
        User.belongsTo(models.District, {
          as: "district",
          foreignKey: "districtId"
        });
        User.belongsToMany(models.Course, {
          as: "courseFavourites",
          through: models.CourseFavourite,
          foreignKey: "userId"
        });
        User.hasMany(models.UserInterest, {
          as: "interests",
          foreignKey: "userId"
        });
      }
    }
  });

  return User;
};