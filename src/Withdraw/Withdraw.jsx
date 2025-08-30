import React, { useState } from 'react';

import toast from 'react-hot-toast';
import useAuth from '../CustomHooks/useAuth';
import api from '../services/api';


const Withdraw = () => {
    const [formData, setFormData] = useState({ accountType: 'Bkash', accountNumber: '', amount: '' });
    const { user } = useAuth();
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (parseFloat(formData.amount) > user.balance) {
            return toast.error("Withdrawal amount cannot exceed your balance.");
        }
        const toastId = toast.loading('Submitting withdrawal request...');
        try {
            const res = await api.post('/user/withdraw', formData);
            toast.success(res.data.msg, { id: toastId });
            setFormData({ accountType: 'Bkash', accountNumber: '', amount: '' });
        } catch (err) {
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-white mb-6">Request Withdrawal</h1>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Account Type</label>
                        <select name="accountType" value={formData.accountType} onChange={onChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md">
                            <option>Bkash</option>
                            <option>Nagad</option>
                            <option>Rocket</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Account Number</label>
                        <input type="text" name="accountNumber" value={formData.accountNumber} onChange={onChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Amount (USD)</label>
                        <input type="number" name="amount" value={formData.amount} onChange={onChange} required min="1" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"/>
                    </div>
                    <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-red-600 rounded-md hover:bg-red-700">Submit Withdrawal Request</button>
                </form>
            </div>
        </div>
    );
};
export default Withdraw;