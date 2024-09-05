const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('cv_gen', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})


const User = require('./user')(sequelize, Sequelize.DataTypes)
const Language = require('./languages')(sequelize, Sequelize.DataTypes)
const Experience = require('./experience')(sequelize, Sequelize.DataTypes)
const Education = require('./education')(sequelize, Sequelize.DataTypes)

User.hasMany(Language, { as: 'languages' })
Language.belongsTo(User)

User.hasMany(Experience, { as: 'experiences' })
Experience.belongsTo(User)

User.hasMany(Education, { as: 'educations' })
Education.belongsTo(User)


module.exports = {
  sequelize,
  User,
  Language,
  Experience,
  Education
}
