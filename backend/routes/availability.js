const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Add Availability
router.post('/', authMiddleware, async (req, res) => {
    const { start, end, duration } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.availability.push({ start, end, duration });
        await user.save();
        res.json(user.availability);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Availability
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.availability);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
