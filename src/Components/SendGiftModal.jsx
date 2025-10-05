import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// The import for Toaster is no longer needed here
import toast from 'react-hot-toast'; 
import api from '../services/api';

const SendGiftModal = ({ user, onClose, onSuccess, isAdmin = false }) => {
  const [amount, setAmount] = useState('');
  const queryClient = useQueryClient();

  const giftMutation = useMutation({
    mutationFn: (giftDetails) => {
      const { endpoint, payload } = giftDetails;
      return api.post(endpoint, payload);
    },
    onSuccess: (response) => {
      // This toast will now be displayed by the <Toaster /> in SendGift.jsx
      toast.success(response.data.msg || 'Gift sent successfully!');
      
      if (isAdmin) {
        onSuccess();
      } else {
        queryClient.invalidateQueries({ queryKey: ['authUser'] });
      }
      onClose();
    },
    onError: (error) => {
      // This error toast will also work correctly
      toast.error(error.response?.data?.msg || 'An error occurred.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error('Please enter a valid positive amount.');
      return;
    }

    let endpoint;
    let payload;

    if (isAdmin) {
      endpoint = `/admin/users/${user._id}/gift`;
      payload = { amount: parsedAmount };
    } else {
      endpoint = '/user/gift';
      payload = { amount: parsedAmount, recipientEmail: user.email };
    }
    
    giftMutation.mutate({ endpoint, payload });
  };

  const descriptionText = isAdmin
    ? "This amount will be added to the user's balance from system funds."
    : "This amount will be deducted from your balance and transferred to the user.";

  return (
    // The outer <></> fragment is no longer necessary but is harmless
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-[#161B22] border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-white mb-4">Send Gift to <span className="text-purple-400">{user.name}</span></h2>
        
        {isAdmin && (
          <p className="text-gray-400 mb-1">
            Current Balance: <span className="text-green-400 font-bold">${(user.balance || 0).toFixed(2)}</span>
          </p>
        )}

        <p className="text-gray-400 mb-6">{descriptionText}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">Gift Amount ($)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#0D1117] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 25"
              step="0.01"
              min="0.01"
              required
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
              Cancel
            </button>
            <button type="submit" disabled={giftMutation.isLoading} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:bg-purple-800 disabled:cursor-not-allowed">
              {giftMutation.isLoading ? 'Sending...' : 'Send Gift'}
            </button>
          </div>
        </form>
      </div>
      {/* --- THIS IS THE LINE TO REMOVE --- */}
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </div>
  );
};

export default SendGiftModal;