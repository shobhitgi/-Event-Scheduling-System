import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const SessionContext = createContext();

// Provider component
export const SessionProvider = ({ children }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all sessions for a user or admin
    const fetchSessions = async (userId) => {
        try {
            const res = await axios.get(`/api/session/${userId}`);
            setSessions(res.data.sessions);
        } catch (err) {
            console.error('Error fetching sessions', err);
        }
        setLoading(false);
    };

    // Schedule a new session
    const scheduleSession = async (sessionData) => {
        try {
            const res = await axios.post('/api/session', sessionData);
            setSessions([...sessions, res.data.session]);
        } catch (err) {
            console.error('Error scheduling session', err);
        }
    };

    // Update an existing session
    const updateSession = async (sessionId, sessionData) => {
        try {
            const res = await axios.put(`/api/session/${sessionId}`, sessionData);
            setSessions(sessions.map(session => session._id === sessionId ? res.data.session : session));
        } catch (err) {
            console.error('Error updating session', err);
        }
    };

    // Delete a session
    const deleteSession = async (sessionId) => {
        try {
            await axios.delete(`/api/session/${sessionId}`);
            setSessions(sessions.filter(session => session._id !== sessionId));
        } catch (err) {
            console.error('Error deleting session', err);
        }
    };

    return (
        <SessionContext.Provider value={{
            sessions,
            fetchSessions,
            scheduleSession,
            updateSession,
            deleteSession,
            loading,
        }}>
            {children}
        </SessionContext.Provider>
    );
};
