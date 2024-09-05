// scheduler.js

/**
 * Check if a time slot is available.
 * @param {Date} start - Start time of the slot.
 * @param {Date} end - End time of the slot.
 * @param {Array} scheduledSlots - Array of already scheduled slots for the user.
 * @returns {Boolean} - True if the time slot is available, false if it overlaps.
 */
const isTimeSlotAvailable = (start, end, scheduledSlots) => {
    for (const slot of scheduledSlots) {
        if (
            (start >= slot.start && start < slot.end) ||
            (end > slot.start && end <= slot.end) ||
            (start <= slot.start && end >= slot.end)
        ) {
            return false;  // There is an overlap
        }
    }
    return true;
};

/**
 * Create time slots within a given availability window.
 * @param {Date} start - Start time of the availability.
 * @param {Date} end - End time of the availability.
 * @param {Number} duration - Duration of each slot in minutes.
 * @returns {Array} - Array of available time slots (each containing start and end time).
 */
const createTimeSlots = (start, end, duration) => {
    const slots = [];
    let currentTime = new Date(start);

    while (currentTime < end) {
        const slotEnd = new Date(currentTime.getTime() + duration * 60000); // Add 'duration' in minutes
        if (slotEnd > end) break;  // Ensure slotEnd does not exceed the availability end time

        slots.push({
            start: new Date(currentTime),
            end: slotEnd,
        });

        currentTime = new Date(slotEnd);  // Move to the next time slot
    }

    return slots;
};

/**
 * Schedule a session and update the availability.
 * @param {Object} userAvailability - The user's availability object from the database.
 * @param {Date} start - Start time of the session.
 * @param {Date} end - End time of the session.
 * @param {Array} attendees - Array of session participants.
 * @returns {Object} - Updated availability with the new session scheduled.
 */
const scheduleSession = (userAvailability, start, end, attendees) => {
    if (!isTimeSlotAvailable(start, end, userAvailability.scheduledSlots)) {
        throw new Error('The selected time slot is not available.');
    }

    // Add the new session to the user's scheduled slots
    userAvailability.scheduledSlots.push({
        start,
        end,
        attendees,
    });

    return userAvailability;
};

module.exports = {
    isTimeSlotAvailable,
    createTimeSlots,
    scheduleSession,
};
