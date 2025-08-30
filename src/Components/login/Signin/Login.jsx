import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../CustomHooks/useAuth';



const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) { /* Error handled by global interceptor */ }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-white">Login to Your Account</h1>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={onChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={onChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">Login</button>
                </form>
                <p className="text-sm text-center text-gray-400">
                    Don't have an account? <Link to="/register" className="font-medium text-blue-400 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;