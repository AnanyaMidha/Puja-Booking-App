import { useState } from 'react';
import BookingForm from './components/BookingForm';
import PujaList from './components/PujaList';

export default function App() {
  const [filter, setFilter] = useState('');
  const [toast, setToast] = useState(false);

  const handleBook = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div>
      <h1>Puja Booking App</h1>
      <BookingForm onBook={handleBook} />
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
      <PujaList filter={filter} />
    </div>
  );
}
