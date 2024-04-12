const express = require('express')
const router = express.Router()

const { addNotes } = require('../controller/notesController')

router.post('/', addNotes)

module.exports = router 