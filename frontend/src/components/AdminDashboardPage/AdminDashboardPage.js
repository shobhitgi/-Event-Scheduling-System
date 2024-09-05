import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboardPage() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [availability, setAvailability] = useState([]);
    const [sessionDetails, setSessionDetails] = useState({ start: '', end: '', duration: 30 });

    useEffect(() => {
        // Fetch all users
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/users', { headers: { 'x-auth-token': token } });
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    const handleUserSelect = async (userId) => {
        setSelectedUser(userId);
        // Fetch user's availability
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/availability/${userId}`, { headers: { 'x-auth-token': token } });
        setAvailability(res.data);
    };

    const handleSessionCreate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await axios.post('/api/session', 
            { userId: selectedUser, ...sessionDetails }, 
            { headers: { 'x-auth-token': token } });
        alert('Session created successfully!');
        // Optionally, refresh the session list or reset the form
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Select User</h2>
                <ul>
                    {users.map(user => (
                        <li key={user._id} onClick={() => handleUserSelect(user._id)}>
                            {user.email}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedUser && (
                <div>
                    <h2>User Availability</h2>
                    <ul>
                        {availability.map(slot => (
                            <li key={slot._id}>
                                {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleString()} ({slot.duration} mins)
                            </li>
                        ))}
                    </ul>
                    <h2>Schedule Session</h2>
                    <form onSubmit={handleSessionCreate}>
                        <label>
                            Start Time:
                            <input 
                                type="datetime-local" 
                                value={sessionDetails.start} 
                                onChange={(e) => setSessionDetails({ ...sessionDetails, start: e.target.value })} 
                                required 
                            />
                        </label>
                        <label>
                            End Time:
                            <input 
                                type="datetime-local" 
                                value={sessionDetails.end} 
                                onChange={(e) => setSessionDetails({ ...sessionDetails, end: e.target.value })} 
                                required 
                            />
                        </label>
                        <label>
                            Duration (minutes):
                            <input 
                                type="number" 
                                value={sessionDetails.duration} 
                                onChange={(e) => setSessionDetails({ ...sessionDetails, duration: e.target.value })} 
                                required 
                            />
                        </label>
                        <button type="submit">Create Session</button>
                    </form>
                </div>
            )}
        </div>
    );
}
