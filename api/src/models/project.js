'use strict'
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {})
  Project.associate = function (models) {
    Project.belongsTo(models.User, {
      onDelete: 'CASCADE', foreignKey: 'UserId', as: 'user'
    })

    Project.hasMany(models.Task, {
      onDelete: 'cascade',
      hooks: true,
      as: 'tasks'
    })
  }
  return Project
}
