const Contact = require('../models/Contact')

// ── POST /api/contact ─────────────────────────────────
// Save a new contact message to MongoDB
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error:   'All fields are required.',
      })
    }

    // Save to MongoDB
    const newMessage = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
    })

    console.log(`📨  New message from ${name} (${email})`)

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! Karthik will get back to you soon.',
      data: {
        id:        newMessage._id,
        name:      newMessage.name,
        createdAt: newMessage.createdAt,
      },
    })
  } catch (err) {
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ success: false, error: errors.join(', ') })
    }
    console.error('Contact save error:', err)
    return res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.',
    })
  }
}

// ── GET /api/contact ──────────────────────────────────
// Get all messages (for admin/demo purposes)
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    return res.status(200).json({
      success: true,
      count:   messages.length,
      data:    messages,
    })
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error' })
  }
}

module.exports = { sendMessage, getMessages }
