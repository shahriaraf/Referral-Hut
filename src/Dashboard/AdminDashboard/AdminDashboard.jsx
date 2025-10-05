import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaTimes,
  FaArrowDown,
  FaArrowUp,
  FaHourglassHalf,
} from "react-icons/fa";
import api from "../../services/api";
import useAuth from "../../CustomHooks/useAuth";

// A reusable Stat Card component for the dashboard summary
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
    <div>
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
    <div className={`p-4 rounded-full ${color}`}>{icon}</div>
  </div>
);

const AdminDashboard = () => {
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const { user } = useAuth();

  // FIX 1: Update API calls to fetch ONLY pending requests.
  const fetchData = useCallback(async () => {
    try {
      const [depRes, withRes] = await Promise.all([
        // Add `?status=pending` to the API calls
        api.get("/admin/deposits?status=pending"),
        api.get("/admin/withdrawals?status=pending"),
      ]);
      setDeposits(depRes.data);
      setWithdrawals(withRes.data);
    } catch (err) {
      // Error is likely handled by an interceptor, but good to have a catch block.
      console.error("Failed to fetch data:", err);
      toast.error("Could not load dashboard data.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // This function is now correct. When it calls fetchData after a successful
  // action, the updated item will no longer have status="pending" and will
  // be filtered out by the API, causing it to disappear from the UI.
  const handleAction = async (type, id, status) => {
    const toastId = toast.loading(`Processing request...`);
    try {
      await api.put(`/admin/${type}/${id}`, { status });
      toast.success(`Request successfully ${status}.`, { id: toastId });
      // This will now fetch the updated list of PENDING items.
      fetchData();
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Failed to process request.";
      toast.error(errorMsg, { id: toastId });
    }
  };

  const renderTable = (title, data, type) => (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-600">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Details
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-200">
                    {item.userEmail}
                  </td>
                  <td className={`px-5 py-4 whitespace-nowrap font-semibold ${type === 'deposits' ? 'text-green-400' : 'text-yellow-400'}`}>
                    ${item.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400 max-w-xs truncate" title={type === 'deposits' ? item.transactionId : item.accountNumber}>
                    {type === "deposits"
                      ? `TxID: ${item.transactionId}`
                      : `Acc: ${item.accountNumber} (${item.accountType})`}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-center space-x-2">
                    <button
                      onClick={() => handleAction(type, item._id, "accepted")}
                      className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      aria-label="Accept"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleAction(type, item._id, "declined")}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      aria-label="Decline"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Admin Dashboard
          </h1>
          {user?.email && (
            <p className="text-gray-400 mt-1">Welcome back, {user.email}</p>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Pending Deposits"
            value={deposits.length}
            icon={<FaArrowDown size={24} />}
            color="bg-blue-500/20 text-blue-400"
          />
          <StatCard
            title="Pending Withdrawals"
            value={withdrawals.length}
            icon={<FaArrowUp size={24} />}
            color="bg-yellow-500/20 text-yellow-400"
          />
          <StatCard
            title="Total Pending"
            value={deposits.length + withdrawals.length}
            icon={<FaHourglassHalf size={24} />}
            color="bg-purple-500/20 text-purple-400"
          />
        </div>

        {/* FIX 2: Change layout from 2-column grid to single-column with vertical space */}
        <main className="space-y-8">
          {renderTable("Pending Deposits", deposits, "deposits")}
          {renderTable("Pending Withdrawals", withdrawals, "withdrawals")}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;