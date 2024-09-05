const Session = require('../models/Session');
const Availability = require('../models/Availability');

// Create a new session
exports.createSession = async (req, res) => {
    const { start, end, duration, attendees } = req.body;

    try {
        // Check for availability conflicts
        const availableSlots = await Availability.find({
            user: attendees[0], // Assume the first attendee is the main one
            start: { $lte: start },
            end: { $gte: end }
        });

        if (availableSlots.length === 0) {
            return res.status(400).json({ message: 'No availability for the selected time' });
        }

        const session = new Session({
            start,
            end,
            duration,
            attendees
        });

        await session.save();
        res.status(201).json({ message: 'Session created', session });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find().populate('attendees');
        res.status(200).json({ sessions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update session
exports.updateSession = async (req, res) => {
    const { sessionId } = req.params;
    const { start, end, duration, attendees } = req.body;

    try {
        const session = await Session.findByIdAndUpdate(
            sessionId,
            { start, end, duration, attendees },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json({ message: 'Session updated', session });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete session
exports.deleteSession = async (req, res) => {
    const { sessionId } = req.params;

    try {
        const session = await Session.findByIdAndDelete(sessionId);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json({ message: 'Session deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
