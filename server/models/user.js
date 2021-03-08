'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  User.associate = model => {
    User.hasMany(model.project);
  };
  return User;
};
