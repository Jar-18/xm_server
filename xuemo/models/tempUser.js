"use strict";

module.exports = function(sequelize, DataTypes) {
  var TempUser = sequelize.define("TempUser", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true
  });
  return TempUser;
};