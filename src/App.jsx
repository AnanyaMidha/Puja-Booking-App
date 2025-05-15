import { useState } from 'react';
import BookingForm from './components/BookingForm';
import PujaList from './components/PujaList';

export default function App() {
  const [filter, setFilter] = useState('');
  const [toast, setToast] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleBook = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div>
      <h1>Puja Booking App</h1>

      {/* 👇 Ask user name if not provided */}
      {!currentUser ? (
        <div>
          <label>Enter Your Name to Continue:</label>
          <input
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
            placeholder="Your name"
          />
        </div>
      ) : (
        <>
          <BookingForm onBook={handleBook} currentUser={currentUser} />
          {toast && <div className="toast">✅ Puja booked successfully!</div>}

          <div>
            <label>Filter by Puja Type:</label>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="">All</option>
              <option>Grihapravesh</option>
              <option>Lakshmi Puja</option>
              <option>Satyanarayan Puja</option>
            </select>
          </div>

          {/* 👇 Pass currentUser to PujaList */}
          <PujaList filter={filter} currentUser={currentUser} />
        </>
      )}
    </div>
  );
}
