const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Session = require('../models/Session');
const User = require('../models/User');

const router = express.Router();

// Create a new session
router.post('/', authMiddleware, async (req, res) => {
    const { userId, start, end, duration, attendees } = req.body;
    try {
        const session = new Session({
            user: userId,
            start,
            end,
            duration,
            attendees,
        });
        await session.save();
        res.json(session);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all sessions for a user
router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.params.userId });
        res.json(sessions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
