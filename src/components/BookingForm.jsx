import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function BookingForm({ onBook, currentUser }) {
    const [form, setForm] = useState({
        pujaType: '',
        datetime: '',
        notes: ''
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'bookings'), {
            name: currentUser, // Automatically use the logged-in user
            pujaType: form.pujaType,
            datetime: Timestamp.fromDate(new Date(form.datetime)),
            notes: form.notes
        });
        setForm({ pujaType: '', datetime: '', notes: '' });
        onBook();
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Removed name input since user is auto-filled */}
            <select
                name="pujaType"
                value={form.pujaType}
                onChange={handleChange}
                required
            >
                <option value="">Select Puja</option>
                <option>Grihapravesh</option>
                <option>Lakshmi Puja</option>
                <option>Satyanarayan Puja</option>
            </select>

            <input
                type="datetime-local"
                name="datetime"
                value={form.datetime}
                onChange={handleChange}
                required
            />

            <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Notes (optional)"
            />

            <button type="submit">Book Puja</button>
        </form>
    );
}
