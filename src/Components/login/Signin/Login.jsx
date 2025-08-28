// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
             const res = await axios.post('http://localhost:5000/api/users/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/userDashboard');
        } catch (err) {
            console.error(err.response.data);
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="container mx-auto max-w-md p-8 mt-10">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">Login to Your Account</h1>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="you@example.com"
                            onChange={onChange}
                            required
                            className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            onChange={onChange}
                            required
                            className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold text-white transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-6 text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;