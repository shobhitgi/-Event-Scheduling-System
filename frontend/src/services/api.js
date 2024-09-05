import axios from 'axios';

// Base URL configuration (you can set this to an environment variable)
const API_URL =  'http://localhost:5000/api';

// Add authorization token if available in localStorage
const setAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// User Authentication APIs
export const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password });
        localStorage.setItem('authToken', res.data.token);
        setAuthHeader();
        return res.data.user;
    } catch (err) {
        throw new Error(err.response.data.message || 'Login failed');
    }
};

export const register = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, { email, password });
        return res.data.user;
    } catch (err) {
        throw new Error(err.response.data.message || 'Registration failed');
    }
};

export const logout = () => {
    localStorage.removeItem('authToken');
    setAuthHeader();
};

// Availability APIs
export const fetchAvailability = async (userId) => {
    try {
        const res = await axios.get(`${API_URL}/availability/${userId}`);
        return res.data.availabilities;
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to fetch availability');
    }
};

export const addAvailability = async (userId, availabilityData) => {
    try {
        const res = await axios.post(`${API_URL}/availability`, { userId, ...availabilityData });
        return res.data.availability;
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to add availability');
    }
};

export const updateAvailability = async (availabilityId, availabilityData) => {
    try {
        const res = await axios.put(`${API_URL}/availability/${availabilityId}`, availabilityData);
        return res.data.availability;
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to update availability');
    }
};

export const deleteAvailability = async (availabilityId) => {
    try {
        await axios.delete(`${API_URL}/availability/${availabilityId}`);
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to delete availability');
    }
};

// Session APIs
export const fetchSessions = async (userId) => {
    try {
        const res = await axios.get(`${API_URL}/session/${userId}`);
        return res.data.sessions;
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to fetch sessions');
    }
};

export const scheduleSession = async (sessionData) => {
    try {
        const res = await axios.post(`${API_URL}/session`, sessionData);
        return res.data.session;
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to schedule session');
    }
};

export const updateSession = async (sessionId, sessionData) => {
    try {
        const res = await axios.put(`${API_URL}/session/${sessionId}`, sessionData);
        return res.data.session;
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to update session');
    }
};

export const deleteSession = async (sessionId) => {
    try {
        await axios.delete(`${API_URL}/session/${sessionId}`);
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to delete session');
    }
};

// User Management APIs (for admin)
export const fetchUsers = async () => {
    try {
        const res = await axios.get(`${API_URL}/users`);
        return res.data.users;
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to fetch users');
    }
};

export const fetchUserById = async (userId) => {
    try {
        const res = await axios.get(`${API_URL}/users/${userId}`);
        return res.data.user;
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to fetch user');
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const res = await axios.put(`${API_URL}/users/${userId}`, userData);
        return res.data.user;
    } catch (err) {
        throw new Error(err.response.data.message || 'Unable to update user');
    }
};
