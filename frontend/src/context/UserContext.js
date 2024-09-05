import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all users (admin view)
    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/users');
            setUsers(res.data.users);
        } catch (err) {
            console.error('Error fetching users', err);
        }
        setLoading(false);
    };

    // Fetch a single user by ID
    const fetchUserById = async (userId) => {
        try {
            const res = await axios.get(`/api/users/${userId}`);
            return res.data.user;
        } catch (err) {
            console.error('Error fetching user', err);
        }
    };

    // Update user profile
    const updateUser = async (userId, userData) => {
        try {
            const res = await axios.put(`/api/users/${userId}`, userData);
            setUsers(users.map(user => user._id === userId ? res.data.user : user));
        } catch (err) {
            console.error('Error updating user', err);
        }
    };

    return (
        <UserContext.Provider value={{
            users,
            fetchUsers,
            fetchUserById,
            updateUser,
            loading,
        }}>
            {children}
        </UserContext.Provider>
    );
};
