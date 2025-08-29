import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const Deposit = () => {
    const [formData, setFormData] = useState({ address: '', transactionId: '', amount: '' });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const toastId = toast.loading('Submitting deposit request...');
        try {
            const res = await api.post('/user/deposit', formData);
            toast.success(res.data.msg, { id: toastId });
            setFormData({ address: '', transactionId: '', amount: '' }); // Clear form
        } catch (err) {
             toast.dismiss(toastId);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-white mb-6">Deposit Funds</h1>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Wallet Address</label>
                        <input type="text" name="address" value={formData.address} onChange={onChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"/>
                    </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Transaction ID (TxID)</label>
                        <input type="text" name="transactionId" value={formData.transactionId} onChange={onChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"/>
                    </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Amount (USD)</label>
                        <input type="number" name="amount" value={formData.amount} onChange={onChange} required min="1" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"/>
                    </div>
                    <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">Submit Deposit Request</button>
                </form>
            </div>
        </div>
    );
};

export default Deposit;