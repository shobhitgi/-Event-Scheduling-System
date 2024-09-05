const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    duration: { type: Number, required: true }, // In minutes
    attendees: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Session', SessionSchema);
