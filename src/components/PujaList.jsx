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

    // ❗ Filter bookings only for the current user
    const userBookings = bookings.filter((b) => b.name === currentUser);

    const upcoming = userBookings.filter(
        (b) => b.datetime > now && (!filter || b.pujaType === filter)
    );

    const past = userBookings.filter(
        (b) => b.datetime <= now && (!filter || b.pujaType === filter)
    );

    return (
        <>
            <h3>Upcoming Pujas</h3>
            {upcoming.length === 0 ? <p>No upcoming pujas.</p> : null}
            {upcoming.map((b) => (
                <div key={b.id}>
                    <strong>{b.pujaType}</strong> for {b.name} on{' '}
                    {b.datetime.toLocaleString()}
                    <p>{b.notes}</p>
                </div>
            ))}

            <h3>Past Pujas</h3>
            {past.length === 0 ? <p>No past pujas.</p> : null}
            {past.map((b) => (
                <div key={b.id}>
                    <strong>{b.pujaType}</strong> for {b.name} on{' '}
                    {b.datetime.toLocaleString()}
                </div>
            ))}
        </>
    );
}
