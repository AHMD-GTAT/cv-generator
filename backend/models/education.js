const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Education = sequelize.define('Education', {
    eduDate: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    eduName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    diplome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'education'
  })

  return Education
}
