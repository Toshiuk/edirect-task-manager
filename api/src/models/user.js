'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {})
  User.associate = function (models) {
    User.hasMany(models.Project, {
      onDelete: 'cascade',
      hooks: true,
      as: 'projects'
    })
  }

  return User
}
