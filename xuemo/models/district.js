"use strict";

module.exports = function(sequelize, DataTypes) {
  var District = sequelize.define("District", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    fullName: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        District.belongsTo(District, {
          as: "parent"
        });
      }
    }
  });

  return District;
};