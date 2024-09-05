import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SessionManagementPage() {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {
        // Fetch all sessions for the logged-in admin
        const fetchSessions = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/session', { headers: { 'x-auth-token': token } });
            setSessions(res.data);
        };
        fetchSessions();
    }, []);

    const handleReschedule = async (sessionId, newStart, newEnd) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`/api/session/${sessionId}`, { start: newStart, end: newEnd }, { headers: { 'x-auth-token': token } });
            alert('Session rescheduled successfully');
            // Optionally, refresh the session list
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    const handleCancel = async (sessionId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/session/${sessionId}`, { headers: { 'x-auth-token': token } });
            alert('Session canceled successfully');
            // Optionally, refresh the session list
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    return (
        <div>
            <h1>Session Management</h1>
            <ul>
                {sessions.map(session => (
                    <li key={session._id}>
                        {new Date(session.start).toLocaleString()} - {new Date(session.end).toLocaleString()} ({session.duration} mins)
                        <button onClick={() => handleReschedule(session._id, '2024-09-01T10:00', '2024-09-01T10:30')}>Reschedule</button>
                        <button onClick={() => handleCancel(session._id)}>Cancel</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
