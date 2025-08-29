import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes } from 'react-icons/fa';
import api from '../../services/api';

const AdminDashboard = () => {
    const [deposits, setDeposits] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const [depRes, withRes] = await Promise.all([
                api.get('/admin/deposits'),
                api.get('/admin/withdrawals')
            ]);
            setDeposits(depRes.data);
            setWithdrawals(withRes.data);
        } catch (err) {
            // Error handled by interceptor
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAction = async (type, id, status) => {
        const toastId = toast.loading(`Processing request...`);
        try {
            await api.put(`/admin/${type}/${id}`, { status });
            toast.success(`Request successfully ${status}.`, { id: toastId });
            fetchData();
        } catch (err) {
             toast.dismiss(toastId);
        }
    };

    const renderTable = (title, data, type) => (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {data.length > 0 ? data.map(item => (
                            <tr key={item._id} className="hover:bg-gray-700/50">
                                <td className="px-6 py-4 whitespace-nowrap">{item.userEmail}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-green-400 font-semibold">${item.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm text-gray-400">
                                    {type === 'deposits' ? `TxID: ${item.transactionId}` : `Acc: ${item.accountNumber} (${item.accountType})`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(item.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                                    <button onClick={() => handleAction(type, item._id, 'accepted')} className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"><FaCheck /></button>
                                    <button onClick={() => handleAction(type, item._id, 'declined')} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"><FaTimes /></button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="text-center py-8 text-gray-400">No pending requests.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div>
            {renderTable('Pending Deposits', deposits, 'deposits')}
            {renderTable('Pending Withdrawals', withdrawals, 'withdrawals')}
        </div>
    );
};

export default AdminDashboard;