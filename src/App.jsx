import { useState } from 'react';
import BookingForm from './components/BookingForm';
import PujaList from './components/PujaList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [filter, setFilter] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [tempName, setTempName] = useState('');

  const handleBook = () => {
    toast.success("✅ Puja booked successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div>
      <h1>Puja Booking App</h1>

      {!currentUser ? (
        <div>
          <label>Enter Your Name to Continue:</label>
          <input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Your full name"
          />
          <button onClick={() => setCurrentUser(tempName)}>Continue</button>
        </div>
      ) : (
        <>
          <BookingForm onBook={handleBook} currentUser={currentUser} />

          <div>
            <label>Filter by Puja Type:</label>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="">All</option>
              <option>Grihapravesh</option>
              <option>Lakshmi Puja</option>
              <option>Satyanarayan Puja</option>
            </select>
          </div>

          <PujaList filter={filter} currentUser={currentUser} />
        </>
      )}

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
