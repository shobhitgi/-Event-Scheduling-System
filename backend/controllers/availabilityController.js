const Availability = require('../models/Availability');

// Create new availability
exports.createAvailability = async (req, res) => {
    const { start, end, duration } = req.body;
    const userId = req.userId; // Assuming the userId is set after authentication

    try {
        const availability = new Availability({
            user: userId,
            start,
            end,
            duration
        });

        await availability.save();
        res.status(201).json({ message: 'Availability created', availability });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update availability
exports.updateAvailability = async (req, res) => {
    const { availabilityId } = req.params;
    const { start, end, duration } = req.body;

    try {
        const availability = await Availability.findByIdAndUpdate(
            availabilityId,
            { start, end, duration },
            { new: true }
        );

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        res.status(200).json({ message: 'Availability updated', availability });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete availability
exports.deleteAvailability = async (req, res) => {
    const { availabilityId } = req.params;

    try {
        const availability = await Availability.findByIdAndDelete(availabilityId);

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        res.status(200).json({ message: 'Availability deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all availability for a user
exports.getUserAvailability = async (req, res) => {
    const userId = req.params.userId;

    try {
        const availability = await Availability.find({ user: userId });
        res.status(200).json({ availability });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
