const express = require('express')
const app = express()
const port = 3000
const db = require("./models/index")
const cors = require('cors')

app.use(express.json())
app.use(cors())

const userRoute = require("./routers/userRouter")
app.use("/api", userRoute)

db.sequelize
  .authenticate()
  .then(() => console.log("db connected"))
  .catch((err) => console.error("Error in database:", err))

db.sequelize
  .sync({force:true})
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})