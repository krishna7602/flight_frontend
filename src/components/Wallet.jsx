import React from 'react';
import { useAuth } from '../context/AuthContext';

const Wallet = () => {
  const { user } = useAuth();

  return (
    <div className="bg-green-500 px-4 py-2 rounded-md flex items-center space-x-2">
      <span className="font-semibold">💰 Wallet:</span>
      <span className="font-bold">₹{user?.walletBalance?.toLocaleString()}</span>
    </div>
  );
};

export default Wallet;