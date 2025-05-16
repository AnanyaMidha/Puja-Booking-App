import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

export default function PujaList({ filter, currentUser }) {
    const [bookings, setBookings] = useState([]);
    const now = new Date();

    useEffect(() => {
        const q = query(collection(db, 'bookings'));
        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                datetime: doc.data().datetime.toDate()
            }));
            setBookings(data);
        });
        return () => unsub();
    }, []);

    const userBookings = bookings.filter((b) => b.name === currentUser);

    const upcoming = userBookings.filter(
        (b) => b.datetime > now && (!filter || b.pujaType === filter)
    );

    const past = userBookings.filter(
        (b) => b.datetime <= now && (!filter || b.pujaType === filter)
    );

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2>📅 Upcoming Pujas</h2>
            {upcoming.length === 0 ? (
                <p>No upcoming pujas.</p>
            ) : (
                upcoming.map((b) => (
                    <div
                        key={b.id}
                        style={{
                            border: '2px solid #4caf50',
                            backgroundColor: '#e8f5e9',
                            padding: '1rem',
                            borderRadius: '10px',
                            marginBottom: '1rem',
                        }}
                    >
                        <strong>{b.pujaType}</strong> for {b.name} <br />
                        🕒 {b.datetime.toLocaleString()}
                        {b.notes && <p>📝 {b.notes}</p>}
                    </div>
                ))
            )}

            <h2 style={{ marginTop: '2rem' }}>📜 Past Pujas</h2>
            {past.length === 0 ? (
                <p>No past pujas.</p>
            ) : (
                past.map((b) => (
                    <div
                        key={b.id}
                        style={{
                            border: '2px solid #ccc',
                            backgroundColor: '#f5f5f5',
                            padding: '1rem',
                            borderRadius: '10px',
                            marginBottom: '1rem',
                        }}
                    >
                        <strong>{b.pujaType}</strong> for {b.name} <br />
                        🕒 {b.datetime.toLocaleString()}
                    </div>
                ))
            )}
        </div>
    );
}
