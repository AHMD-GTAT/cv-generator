const db=require("../models/index")

module.exports = {
   create: async (req, res)=>{
    try {
        const user = await db.User.create(req.body, {
          include: [
            {model: db.Language, as:'languages'},
            {model: db.Experience, as: 'experiences' }, 
             {model: db.Education, as: 'educations'}
            ]
        })
        res.status(201).json(user)
      } catch (error) {
        res.status(500).json({ error: error })
        console.error(error)
      }
    },
    getAll: async (req, res) => {
        try {
          const users = await db.User.findAll({
            include: [
              { model: db.Language, as: 'languages' },
              { model: db.Experience, as: 'experiences' },
              { model: db.Education, as: 'educations' }
            ]
          })
    
          res.status(200).json(users);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "error" });
        }
      },

    getOne: async (req, res) => {
        try {
          const { id } = req.params
          const user = await db.User.findOne({
            where: { id },
            include: [
              { model: db.Language, as: 'languages' },
              { model: db.Experience, as: 'experiences' },
              { model: db.Education, as: 'educations' }
            ]
          })
    
    
          res.status(200).json(user)
        } catch (error) {
          console.error(error)
          res.status(500).json({ error: error })
        }
      },
      deleteCV: async (req, res) => {
        try {
          const userId = req.params.id
          const user = await db.User.findByPk(userId)
          await user.destroy()
          res.status(200).json({ message: "user deleted" })
        } catch (error) {
          console.error(error)
          res.status(500).json({ error: error })
        }
      },
      updateCV: async (req, res) => {
        const { id } = req.params
        const { firstName, lastName, address, birthday, number, email, link, expertise, skills, languages, experiences, educations } = req.body
    
        try {

          const user = await db.User.findByPk(id)
          await user.update({
            firstName,
            lastName,
            address,
            birthday,
            number,
            email,
            link,
            expertise,
            skills
          })
    
        
          await db.Language.destroy({ where: { userId: id } })
          await db.Experience.destroy({ where: { userId: id } })
          await db.Education.destroy({ where: { userId: id } })
    
     
          await db.Language.bulkCreate(languages.map(lang => ({
            userId: id,
            langName: lang.langName,
            langLevel: lang.langLevel
          })))
    
          await db.Experience.bulkCreate(experiences.map(exp => ({
            userId: id,
            expName: exp.expName,
            company: exp.company,
            role: exp.role,
            expDate: exp.expDate
          })))
    
          await db.Education.bulkCreate(educations.map(edu => ({
            userId: id,
            eduDate: edu.eduDate,
            eduName: edu.eduName,
            diplome: edu.diplome 
          })))
    
       
          const updatedUser = await db.User.findByPk(id, {
            include: [
              { model: db.Language, as: 'languages' },
              { model: db.Experience, as: 'experiences' },
              { model: db.Education, as: 'educations' }
            ]
          })
    
          res.status(200).json(updatedUser)
        } catch (error) {
          res.status(500).json({ error: error.message })
          console.error(error)
        }
      }
}