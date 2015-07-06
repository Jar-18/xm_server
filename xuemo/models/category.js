"use strict";

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Category.belongsTo(Category, {
          as: 'parent'
        });
        Category.belongsToMany(models.User, {
          through: models.UserInterest,
          foreignKey: "interestId"
        });
      }
    }
  });

  return Category;
};