import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { FaEye, FaSearch, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import Spinner from '../Components/Spinner/Loading';

// API call to fetch the complete deposit history, with an optional search term.
const fetchDepositHistory = async (search) => {
  const { data } = await api.get('/admin/deposits', {
    params: {
      search: search,
    },
  });
  return data;
};

// Renamed component for clarity and correct purpose.
const DepositHistoryPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Simplified React Query hook for fetching and managing the history data.
  const { data: deposits = [], isLoading, isError } = useQuery({
    queryKey: ['adminDepositHistory', debouncedSearchTerm],
    queryFn: () => fetchDepositHistory(debouncedSearchTerm),
  });

  const formatDate = (dateString) => new Date(dateString).toLocaleString();
  const formatTxId = (txId) => `${txId.slice(0, 10)}...${txId.slice(-10)}`;

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div className="text-center text-red-500 p-8">Failed to load deposit history.</div>
  }

  return (
    <div className="min-h-screen p-6 font-sans">
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Deposit History</h1>
          <p className="text-gray-400">A complete log of all user deposit requests.</p>
        </div>

        <div className="bg-[#161B22]/80 backdrop-blur-sm rounded-lg border border-slate-800 p-6 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by email, address, or transaction ID..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {deposits.map((deposit) => (
                  <tr key={deposit._id} className="hover:bg-slate-800/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{deposit.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium">${deposit.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                      {formatTxId(deposit.transactionId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatDate(deposit.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => setSelectedDeposit(deposit)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg">
                        <FaEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {deposits.length === 0 && (
            <div className="text-center py-12 text-gray-400">No deposits found.</div>
          )}
        </div>

        {selectedDeposit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#161B22] border border-slate-800 rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Deposit Details</h3>
                    <button onClick={() => setSelectedDeposit(null)} className="text-gray-400 hover:text-white">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div><label className="text-sm text-gray-400">User Email</label><div className="text-white">{selectedDeposit.userEmail}</div></div>
                    <div><label className="text-sm text-gray-400">Amount</label><div className="text-white">${selectedDeposit.amount.toFixed(2)}</div></div>
                    <div><label className="text-sm text-gray-400">Receiving Address</label><div className="text-white font-mono break-all">{selectedDeposit.address}</div></div>
                    <div><label className="text-sm text-gray-400">Transaction ID</label><div className="text-white font-mono break-all">{selectedDeposit.transactionId}</div></div>
                    <div><label className="text-sm text-gray-400">Request Date</label><div className="text-white">{formatDate(selectedDeposit.createdAt)}</div></div>
                    <div><label className="text-sm text-gray-400">Status</label><div className="text-white capitalize">{selectedDeposit.status}</div></div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositHistoryPanel;