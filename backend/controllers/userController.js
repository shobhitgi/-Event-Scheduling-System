const User = require('../models/User');

// Get user by ID
exports.getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const { email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { email }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
