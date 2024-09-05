// validation.js
const { body, validationResult } = require('express-validator');

// Validation rules for registering a new user
const validateUserRegistration = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// Validation rules for availability input
const validateAvailability = [
    body('start').isISO8601().withMessage('Invalid start time format'),
    body('end').isISO8601().withMessage('Invalid end time format'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
];

// Validation rules for session creation
const validateSession = [
    body('start').isISO8601().withMessage('Invalid start time format'),
    body('end').isISO8601().withMessage('Invalid end time format'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
    body('attendees').isArray().withMessage('Attendees must be an array'),
];

// Middleware to check for validation errors
const validationErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateAvailability,
    validateSession,
    validationErrorHandler,
};
