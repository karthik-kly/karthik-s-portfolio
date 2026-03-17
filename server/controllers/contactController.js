const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')

// ── Email Transporter ─────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// ── POST /api/contact ─────────────────────────────────
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required.',
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

    // Send email to your Gmail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,   // ← you receive it
      replyTo: email,               // ← reply goes to sender
      subject: `📬 New Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #6c63ff;">New Message from Your Portfolio</h2>
          <hr/>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f4; padding: 12px; border-radius: 6px;">${message}</p>
          <hr/>
          <small style="color: #999;">Sent from KBuilds Portfolio Contact Form</small>
        </div>
      `,
    })

    console.log(`✅  Email sent to ${process.env.EMAIL_USER}`)

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
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ success: false, error: errors.join(', ') })
    }
    console.error('Contact error:', err)
    return res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.',
    })
  }
}

// ── GET /api/contact ──────────────────────────────────
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