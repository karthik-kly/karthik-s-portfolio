const express = require('express')
const router  = express.Router()
const { pingVisitor, getCount } = require('../controllers/visitorController')

// POST /api/visitor/ping  → increment count
router.post('/ping',  pingVisitor)

// GET  /api/visitor/count → get current count
router.get('/count',  getCount)

module.exports = router
