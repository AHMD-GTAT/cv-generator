const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  const Experience = sequelize.define('Experience', {
    expName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expDate: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'experience'
  })

  return Experience
}
