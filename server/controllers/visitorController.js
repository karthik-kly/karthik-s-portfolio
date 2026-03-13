const Visitor = require('../models/Visitor')

// ── POST /api/visitor/ping ────────────────────────────
// Called when someone opens the portfolio — increments visitor count
const pingVisitor = async (req, res) => {
  try {
    // Find the single visitor doc, or create it
    let doc = await Visitor.findOne()
    if (!doc) {
      doc = await Visitor.create({ count: 1 })
    } else {
      doc.count       += 1
      doc.lastVisited  = new Date()
      await doc.save()
    }
    return res.status(200).json({ success: true, count: doc.count })
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error' })
  }
}

// ── GET /api/visitor/count ────────────────────────────
const getCount = async (req, res) => {
  try {
    const doc = await Visitor.findOne()
    return res.status(200).json({ success: true, count: doc ? doc.count : 0 })
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error' })
  }
}

module.exports = { pingVisitor, getCount }
