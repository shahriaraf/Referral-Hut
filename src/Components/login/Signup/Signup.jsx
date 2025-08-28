// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


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
        <div className="container mx-auto max-w-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Name" onChange={onChange} required className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500" />
                <input type="email" name="email" placeholder="Email" onChange={onChange} required className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500" />
                <input type="password" name="password" placeholder="Password" onChange={onChange} required className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500" />
                <input type="text" name="referralId" placeholder="Referral ID (Optional)" onChange={onChange} className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500" />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold">Register</button>
            </form>

        </div>
    );
};

export default Signup;