import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaClock, FaEye, FaFilter, FaSearch, FaSpinner } from 'react-icons/fa';

const WithdrawalAdminPanel = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [updating, setUpdating] = useState(null);

  // Mock data - replace with actual API call
  const mockWithdrawals = [
    {
      id: 1,
      userId: 'user123',
      amount: 500,
      withdrawalAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      status: 'pending',
      requestDate: '2024-01-15T10:30:00Z',
      email: 'user1@example.com'
    },
    {
      id: 2,
      userId: 'user456',
      amount: 250,
      withdrawalAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      status: 'approved',
      requestDate: '2024-01-14T15:45:00Z',
      email: 'user2@example.com',
      processedDate: '2024-01-14T16:00:00Z'
    },
    {
      id: 3,
      userId: 'user789',
      amount: 1000,
      withdrawalAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      status: 'rejected',
      requestDate: '2024-01-13T08:20:00Z',
      email: 'user3@example.com',
      processedDate: '2024-01-13T09:00:00Z',
      rejectionReason: 'Insufficient verification'
    },
    {
      id: 4,
      userId: 'user321',
      amount: 750,
      withdrawalAddress: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      status: 'pending',
      requestDate: '2024-01-16T12:15:00Z',
      email: 'user4@example.com'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWithdrawals(mockWithdrawals);
      setFilteredWithdrawals(mockWithdrawals);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = withdrawals;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(w => w.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(w => 
        w.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.withdrawalAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredWithdrawals(filtered);
  }, [withdrawals, statusFilter, searchTerm]);

  const updateWithdrawalStatus = async (withdrawalId, newStatus, reason = '') => {
    setUpdating(withdrawalId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWithdrawals(prev => prev.map(w => 
        w.id === withdrawalId 
          ? { 
              ...w, 
              status: newStatus, 
              processedDate: new Date().toISOString(),
              ...(reason && { rejectionReason: reason })
            }
          : w
      ));
    } catch (error) {
      console.error('Failed to update withdrawal status:', error);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: FaClock },
      approved: { color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: FaCheck },
      rejected: { color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: FaTimes }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D1117]">
        <FaSpinner className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] p-6 font-sans">
      <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_top,_rgba(29,78,216,0.15),_transparent_40%)]"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Withdrawal Management</h1>
          <p className="text-gray-400">Manage and process user withdrawal requests</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#161B22]/80 backdrop-blur-sm rounded-lg border border-slate-800 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by user ID, email, or address..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {['all', 'pending', 'approved', 'rejected'].map(status => {
            const count = status === 'all' 
              ? withdrawals.length 
              : withdrawals.filter(w => w.status === status).length;
            
            return (
              <div key={status} className="bg-[#161B22]/80 backdrop-blur-sm rounded-lg border border-slate-800 p-4">
                <div className="text-2xl font-bold text-white">{count}</div>
                <div className="text-sm text-gray-400 capitalize">{status === 'all' ? 'Total' : status}</div>
              </div>
            );
          })}
        </div>

        {/* Withdrawals Table */}
        <div className="bg-[#161B22]/80 backdrop-blur-sm rounded-lg border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredWithdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{withdrawal.userId}</div>
                        <div className="text-sm text-gray-400">{withdrawal.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white font-medium">${withdrawal.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 font-mono">{formatAddress(withdrawal.withdrawalAddress)}</td>
                    <td className="px-6 py-4">{getStatusBadge(withdrawal.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{formatDate(withdrawal.requestDate)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedWithdrawal(withdrawal)}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        {withdrawal.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateWithdrawalStatus(withdrawal.id, 'approved')}
                              disabled={updating === withdrawal.id}
                              className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors disabled:opacity-50"
                              title="Approve"
                            >
                              {updating === withdrawal.id ? (
                                <FaSpinner className="w-4 h-4 animate-spin" />
                              ) : (
                                <FaCheck className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Rejection reason (optional):');
                                updateWithdrawalStatus(withdrawal.id, 'rejected', reason);
                              }}
                              disabled={updating === withdrawal.id}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                              title="Reject"
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredWithdrawals.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">No withdrawals found</div>
              <div className="text-sm text-gray-500">Try adjusting your search or filter criteria</div>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedWithdrawal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#161B22] border border-slate-800 rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Withdrawal Details</h3>
                <button
                  onClick={() => setSelectedWithdrawal(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">ID</label>
                  <div className="text-white">{selectedWithdrawal.id}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">User</label>
                  <div className="text-white">{selectedWithdrawal.userId}</div>
                  <div className="text-gray-300 text-sm">{selectedWithdrawal.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Amount</label>
                  <div className="text-white font-medium">${selectedWithdrawal.amount}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Withdrawal Address</label>
                  <div className="text-white font-mono text-sm break-all">{selectedWithdrawal.withdrawalAddress}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <div>{getStatusBadge(selectedWithdrawal.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Request Date</label>
                  <div className="text-white">{formatDate(selectedWithdrawal.requestDate)}</div>
                </div>
                {selectedWithdrawal.processedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Processed Date</label>
                    <div className="text-white">{formatDate(selectedWithdrawal.processedDate)}</div>
                  </div>
                )}
                {selectedWithdrawal.rejectionReason && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Rejection Reason</label>
                    <div className="text-red-400">{selectedWithdrawal.rejectionReason}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalAdminPanel;