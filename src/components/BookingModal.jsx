import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createBooking, recordAttempt } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookingModal = ({ flight, onClose, onSuccess }) => {
  const [passengerName, setPassengerName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, updateWallet } = useAuth();

  const handleRecordAttempt = async () => {
    try {
      const response = await recordAttempt(flight._id);
      if (response.data.surgeApplied) {
        toast.warning('Price increased due to multiple booking attempts!');
      }
      return response.data;
    } catch (error) {
      console.error('Failed to record attempt:', error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Record attempt first
      await handleRecordAttempt();

      // Create booking
      const response = await createBooking({
        flightId: flight._id,
        passengerName,
      });

      updateWallet(response.data.walletBalance);
      toast.success('Booking successful! 🎉');
      onSuccess();
    } catch (error) {
      const message = error.response?.data?.message || 'Booking failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Confirm Booking
        </h2>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Flight Details</h3>
          <p className="text-sm text-gray-600">
            <strong>Airline:</strong> {flight.airline}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Route:</strong> {flight.departure_city} → {flight.arrival_city}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Time:</strong> {flight.departure_time} - {flight.arrival_time}
          </p>
          <p className="text-lg font-bold text-green-600 mt-2">
            Total: ₹{flight.currentPrice.toLocaleString()}
          </p>
          {flight.surgeApplied && (
            <p className="text-xs text-red-600 mt-1">
              ⚠️ Surge pricing applied
            </p>
          )}
        </div>

        <form onSubmit={handleBooking}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passenger Name
            </label>
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-md mb-6">
            <p className="text-sm text-gray-700">
              <strong>Wallet Balance:</strong> ₹{user?.walletBalance?.toLocaleString()}
            </p>
            {user?.walletBalance < flight.currentPrice && (
              <p className="text-xs text-red-600 mt-1">
                ⚠️ Insufficient balance
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || user?.walletBalance < flight.currentPrice}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;