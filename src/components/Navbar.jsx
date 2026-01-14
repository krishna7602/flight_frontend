import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Wallet from './Wallet';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              ✈️ FlightBook
            </Link>
          </div>

          {isAuthenticated && (
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="hover:bg-blue-700 px-3 py-2 rounded-md transition"
              >
                Search Flights
              </Link>
              <Link
                to="/bookings"
                className="hover:bg-blue-700 px-3 py-2 rounded-md transition"
              >
                My Bookings
              </Link>
              <Wallet />
              <div className="flex items-center space-x-3">
                <span className="text-sm">Hi, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;