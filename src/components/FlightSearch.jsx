import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFlights } from '../services/api';
import FlightCard from './FlightCard';
import BookingModal from './BookingModal';

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    departure_city: '',
    arrival_city: '',
    sortBy: '',
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await getFlights(filters);
      setFlights(response.data);
    } catch (error) {
      toast.error('Failed to fetch flights');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBookFlight = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const handleBookingSuccess = () => {
    setShowModal(false);
    fetchFlights(); // Refresh flights to update pricing
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Search Flights</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <input
              type="text"
              name="departure_city"
              value={filters.departure_city}
              onChange={handleFilterChange}
              placeholder="Mumbai"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <input
              type="text"
              name="arrival_city"
              value={filters.arrival_city}
              onChange={handleFilterChange}
              placeholder="Delhi"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Default</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Flights List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading flights...</p>
        </div>
      ) : flights.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600">No flights found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight) => (
            <FlightCard
              key={flight._id}
              flight={flight}
              onBook={handleBookFlight}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showModal && (
        <BookingModal
          flight={selectedFlight}
          onClose={() => setShowModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default FlightSearch;