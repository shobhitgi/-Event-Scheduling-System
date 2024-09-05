const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for availability
const AvailabilitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,  // In minutes (e.g., 30 minutes)
        required: true,
    },
    scheduledSlots: [
        {
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
                required: true,
            },
            attendees: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    email: {
                        type: String,
                        required: true,
                    }
                }
            ]
        }
    ]
}, {
    timestamps: true  // Automatically create createdAt and updatedAt fields
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
