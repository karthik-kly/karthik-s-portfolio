const express = require('express')
const router  = express.Router()
const Contact = require('../models/Contact')

// POST /api/contact → save to MongoDB
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const newContact = new Contact({ name, email, subject, message })
    await newContact.save()

    res.json({ success: true, message: 'Message stored in database' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/contact → fetch all messages (to verify in browser)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, count: messages.length, data: messages })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
