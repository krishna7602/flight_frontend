import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getBookings, downloadTicket } from '../services/api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTicket = async (bookingId, pnr) => {
    try {
      const response = await downloadTicket(bookingId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ticket-${pnr}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Ticket downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download ticket');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-xl text-gray-600">No bookings found</p>
          <p className="text-gray-500 mt-2">Start booking flights to see them here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {booking.status.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">
                      PNR: <strong>{booking.pnr}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {booking.flight.airline} - {booking.flight.flight_id}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Passenger</p>
                      <p className="font-semibold">{booking.passenger_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="font-semibold">
                        {booking.flight.departure_city} → {booking.flight.arrival_city}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="font-semibold">{booking.flight.departure_time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Arrival</p>
                      <p className="font-semibold">{booking.flight.arrival_time}</p>
                    </div>
                  </div>

                  <div className="flex space-x-6 text-sm text-gray-600">
                    <div>
                      <p>Amount Paid</p>
                      <p className="text-lg font-bold text-green-600">
                        ₹{booking.final_price.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p>Booking Date</p>
                      <p className="font-semibold">
                        {new Date(booking.booking_date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-6">
                  <button
                    onClick={() => handleDownloadTicket(booking._id, booking.pnr)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold flex items-center space-x-2"
                  >
                    <span>📄</span>
                    <span>Download Ticket</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;