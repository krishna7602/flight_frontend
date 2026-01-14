import React from 'react';

const FlightCard = ({ flight, onBook }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {flight.airline}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Flight ID: {flight.flight_id}
          </p>
          <div className="flex items-center space-x-4 mt-3">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {flight.departure_city}
              </p>
              <p className="text-sm text-gray-500">{flight.departure_time}</p>
            </div>
            <div className="flex-1 text-center">
              <div className="border-t-2 border-gray-300 relative">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                  {flight.duration}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">✈️</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {flight.arrival_city}
              </p>
              <p className="text-sm text-gray-500">{flight.arrival_time}</p>
            </div>
          </div>
        </div>

        <div className="ml-8 text-right">
          <div className="mb-4">
            <p className="text-sm text-gray-500 line-through">
              ₹{flight.base_price.toLocaleString()}
            </p>
            <p className="text-3xl font-bold text-green-600">
              ₹{flight.currentPrice.toLocaleString()}
            </p>
            {flight.surgeApplied && (
              <div className="mt-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                🔥 Surge Pricing (+10%)
              </div>
            )}
            {flight.attemptCount > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {flight.attemptCount} recent {flight.attemptCount === 1 ? 'attempt' : 'attempts'}
              </p>
            )}
          </div>
          <button
            onClick={() => onBook(flight)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;