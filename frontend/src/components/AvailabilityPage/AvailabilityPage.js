import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AvailabilityPage() {
    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        const fetchAvailability = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/availability', {
                headers: { 'x-auth-token': token }
            });
            setAvailability(res.data);
        };
        fetchAvailability();
    }, []);

    return (
        <div>
            <h1>Your Availability</h1>
            <ul>
                {availability.map(slot => (
                    <li key={slot._id}>
                        {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleString()} ({slot.duration} mins)
                    </li>
                ))}
            </ul>
        </div>
    );
}
