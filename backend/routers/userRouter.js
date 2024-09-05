const express = require('express')
const router = express.Router()
const { User, Language, Experience, Education } = require('../models/index')
const {create, getOne, getAll, deleteCV, updateCV} = require("../controllers/contUser")


router.use(express.json())

router.post('/user', create )
router.get('/user', getAll)
router.get('/user/:id', getOne)
router.delete('/user/:id', deleteCV)
router.put('/user/:id', updateCV)

module.exports = router