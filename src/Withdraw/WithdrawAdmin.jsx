import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { FaEye, FaSearch, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import Spinner from '../Components/Spinner/Loading';

// Simplified API call: It only needs to handle search now.
const fetchWithdrawalHistory = async (search) => {
  const { data } = await api.get('/admin/withdrawals', {
    params: {
      search: search,
      // We no longer send a 'status' parameter, so the backend returns all records.
    },
  });
  return data;
};

// Renamed component for clarity
const WithdrawalHistoryPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Simplified Query: It only depends on the search term now.
  const { data: withdrawals = [], isLoading, isError } = useQuery({
    queryKey: ['adminWithdrawalHistory', debouncedSearchTerm],
    queryFn: () => fetchWithdrawalHistory(debouncedSearchTerm),
  });

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div className="text-center text-red-500 p-8">Failed to load withdrawal history.</div>
  }

  return (
    <div className="min-h-screen p-6 font-sans">
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Withdrawal History</h1>
          <p className="text-gray-400">A complete log of all user withdrawal requests.</p>
        </div>

        <div className="bg-[#161B22]/80 backdrop-blur-sm rounded-lg border border-slate-800 p-6 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by user email or account number..."
              className="w-full pl-11 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-[#161B22]/80 backdrop-blur-sm rounded-lg border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Account</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id} className="hover:bg-slate-800/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{withdrawal.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">${withdrawal.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                      {withdrawal.accountNumber} ({withdrawal.accountType})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatDate(withdrawal.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => setSelectedWithdrawal(withdrawal)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg">
                        <FaEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {withdrawals.length === 0 && (
            <div className="text-center py-12 text-gray-400">No withdrawals found.</div>
          )}
        </div>

        {selectedWithdrawal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#161B22] border border-slate-800 rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Withdrawal Details</h3>
                    <button onClick={() => setSelectedWithdrawal(null)} className="text-gray-400 hover:text-white">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div><label className="text-sm text-gray-400">User Email</label><div className="text-white">{selectedWithdrawal.userEmail}</div></div>
                    <div><label className="text-sm text-gray-400">Amount</label><div className="text-white">${selectedWithdrawal.amount.toFixed(2)}</div></div>
                    <div><label className="text-sm text-gray-400">Account Type</label><div className="text-white">{selectedWithdrawal.accountType}</div></div>
                    <div><label className="text-sm text-gray-400">Account Number</label><div className="text-white font-mono break-all">{selectedWithdrawal.accountNumber}</div></div>
                    <div><label className="text-sm text-gray-400">Request Date</label><div className="text-white">{formatDate(selectedWithdrawal.createdAt)}</div></div>
                    {/* The status is still useful in the details modal, so we keep it here */}
                    <div><label className="text-sm text-gray-400">Status</label><div className="text-white capitalize">{selectedWithdrawal.status}</div></div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalHistoryPanel;