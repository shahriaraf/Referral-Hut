import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../../CustomHooks/useAuth';


const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '', referralId: '' });
    const { register } = useAuth();
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            return toast.error('Passwords do not match');
        }
        try {
            await register({ name: formData.name, email: formData.email, password: formData.password, referralId: formData.referralId });
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            // Error is handled by global interceptor
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-white">Create an Account</h1>
                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Form fields here */}
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Name</label>
                        <input type="text" name="name" onChange={onChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                        <input type="email" name="email" onChange={onChange} required className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                        <input type="password" name="password" onChange={onChange} required minLength="6" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Confirm Password</label>
                        <input type="password" name="password2" onChange={onChange} required minLength="6" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Referral ID (Optional)</label>
                        <input type="text" name="referralId" onChange={onChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">Register</button>
                </form>
                <p className="text-sm text-center text-gray-400">
                    Already have an account? <Link to="/login" className="font-medium text-blue-400 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;