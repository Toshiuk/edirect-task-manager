'use strict'
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    completedDate: DataTypes.DATE,
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {})
  Task.associate = function (models) {
    Task.belongsTo(models.Project, {
      onDelete: 'CASCADE', foreignKey: 'ProjectId', as: 'project'
    })
  }
  return Task
}
