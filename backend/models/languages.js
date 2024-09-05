const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {
  const Language = sequelize.define('Language', {
    langName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    langLevel: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'language'
  })

  return Language
}
