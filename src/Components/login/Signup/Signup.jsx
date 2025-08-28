// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', referralId: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/referral-creat-user', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/userDashboard');
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl border border-purple-500/30">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Create Your Account
                    </h1>
                    <p className="mt-2 text-gray-400">Join us and start your journey</p>
                </div>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="John Doe"
                            onChange={onChange}
                            required
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="you@example.com"
                            onChange={onChange}
                            required
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            onChange={onChange}
                            required
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="referralId">
                            Referral ID (Optional)
                        </label>
                        <input
                            type="text"
                            name="referralId"
                            id="referralId"
                            placeholder="Enter referral code"
                            onChange={onChange}
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-1"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/" className="font-medium text-purple-400 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;