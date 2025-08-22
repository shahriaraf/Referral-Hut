import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaUser, FaReceipt, FaDollarSign, FaSpinner } from 'react-icons/fa';

// This is the component for a single form field. It helps keep the main form clean.
const FormField = ({ id, label, type, placeholder, icon, register, error }) => {
  const Icon = icon;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`block w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-gray-200 placeholder-gray-500 transition duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            error ? 'border-red-500 ring-red-500' : ''
          }`}
          {...register}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};


const Deposit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ message: '', type: '' });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus({ message: '', type: '' });

    try {
      // --- BACKEND INTEGRATION ---
      // This is the demo URL. Replace it with your actual backend endpoint.
      const API_URL = 'https://jsonplaceholder.typicode.com/posts';

      // The 'data' object contains { name, transactionId, amount }
      const response = await axios.post(API_URL, data);
      
      console.log('Submission successful:', response.data);

      // Handle success
      setSubmissionStatus({ message: 'Your deposit has been submitted for review!', type: 'success' });
      reset(); // Clear the form fields after successful submission

    } catch (error) {
      console.error('Submission failed:', error);

      // Handle error
      setSubmissionStatus({ message: 'An error occurred. Please try again later.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0D1117] p-4 font-sans">
       <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_top,_rgba(29,78,216,0.15),_transparent_40%)]"></div>
      
      <div className="relative w-full max-w-md rounded-2xl bg-[#161B22]/80 backdrop-blur-sm shadow-2xl shadow-blue-500/10 border border-slate-800">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Make a Deposit</h1>
            <p className="mt-2 text-gray-400">Fill in your transaction details below.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              id="name"
              label="Full Name"
              type="text"
              placeholder="e.g., Sarah Anderson"
              icon={FaUser}
              register={register('name', { required: 'Full Name is required' })}
              error={errors.name}
            />

            <FormField
              id="transactionId"
              label="Transaction ID"
              type="text"
              placeholder="Enter your transaction ID"
              icon={FaReceipt}
              register={register('transactionId', { required: 'Transaction ID is required' })}
              error={errors.transactionId}
            />

            <FormField
              id="amount"
              label="Amount"
              type="number"
              placeholder="0.00"
              icon={FaDollarSign}
              register={register('amount', {
                required: 'Amount is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Amount must be at least 1' },
              })}
              error={errors.amount}
            />

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-3 text-sm font-bold text-gray-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Submit Deposit'
                )}
              </button>
            </div>
          </form>

           {/* Submission Status Message */}
          {submissionStatus.message && (
            <div className={`mt-6 rounded-lg p-3 text-center text-sm ${
              submissionStatus.type === 'success' 
              ? 'bg-green-500/10 text-green-400' 
              : 'bg-red-500/10 text-red-400'
            }`}>
              {submissionStatus.message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Deposit;