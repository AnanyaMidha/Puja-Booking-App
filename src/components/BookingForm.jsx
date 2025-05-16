import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function BookingForm({ onBook, currentUser }) {
    const [form, setForm] = useState({
        name: currentUser || '',
        pujaType: '',
        datetime: '',
        notes: ''
    });

    // Update form state properly
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final check before submission
        if (!form.pujaType || !form.datetime) {
            alert('Please select puja type and date/time.');
            return;
        }

        await addDoc(collection(db, 'bookings'), {
            ...form,
            datetime: Timestamp.fromDate(new Date(form.datetime))
        });

        setForm({
            name: currentUser,
            pujaType: '',
            datetime: '',
            notes: ''
        });

        onBook();
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 👇 Show the name but don't allow editing */}
            <input name="name" value={currentUser} disabled />

            <select
                name="pujaType"
                value={form.pujaType}
                onChange={handleChange}
                required
            >
                <option value="">Select Puja</option>
                <option value="Grihapravesh">Grihapravesh</option>
                <option value="Lakshmi Puja">Lakshmi Puja</option>
                <option value="Satyanarayan Puja">Satyanarayan Puja</option>
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
