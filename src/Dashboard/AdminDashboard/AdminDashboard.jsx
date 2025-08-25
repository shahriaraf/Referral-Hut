import React, { useState } from 'react';
import useAllDeposite from '../../CustomHooks/useAllDeposite';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAxiosPublic from '../../CustomHooks/Api/useAxiosPublic';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [allDeposite, refetch,isLoading] = useAllDeposite();
  const [loading,setLoading] = useState(false)     
  const axiosPublic = useAxiosPublic();

//  deposite accept funttion 
const handleDepositeAccept = async (email) => {
  try {
    // Send PATCH request
     setLoading(true)
    const res = await axiosPublic.patch(`/api/accept-deposite-status/${email}`);
    
      if(res.data.success){
            setLoading(false);
            toast.success(res.data.message);
            refetch()
      }

    refetch();
  } catch (error) {
    console.error("Error accepting deposit:", error);
    setLoading(false)
  }finally{
    setLoading(false)
  }
};

//  deposite decline funttion 
  const handleDepositeCancel = (id) => console.log("Declined ID:", id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0D1117]">
        <TbFidgetSpinner className="animate-spin text-5xl text-gray-400" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-[#0D1117] text-gray-200">
      <h1 className="text-red-500 text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Wrapper for auto table width */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <div className="inline-block min-w-max">
          <table className="table-auto border-collapse">
            <thead className="bg-gray-900 text-gray-200 uppercase">
              <tr>
                <th className="py-3 px-4 border-b border-gray-700">#</th>
             
                <th className="py-3 px-4 border-b border-gray-700">Email</th>
                <th className="py-3 px-4 border-b border-gray-700">Amount</th>
                <th className="py-3 px-4 border-b border-gray-700">Transaction ID</th>
                <th className="py-3 px-4 border-b border-gray-700">Address</th>
                <th className="py-3 px-4 border-b border-gray-700">Date</th>
                <th className="py-3 px-4 border-b border-gray-700 text-center">Accept</th>
                <th className="py-3 px-4 border-b border-gray-700 text-center">Decline</th>
              </tr>
            </thead>
            <tbody>
              {allDeposite && allDeposite.length > 0 ? (
                allDeposite.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-800 transition">
                    <td className="py-3 px-4 border-b border-gray-700">{index + 1}</td>
            
                    <td className="py-3 px-4 border-b border-gray-700">{item.email}</td>
                    <td className="py-3 px-4 border-b border-gray-700 font-semibold text-green-400">${item.ammount}</td>
                    <td className="py-3 px-4 border-b border-gray-700">{item.transectionId}</td>
                    <td className="py-3 px-4 border-b border-gray-700">{item.address}</td>
                    <td className="py-3 px-4 border-b border-gray-700">{item.Date}</td>
                    <td className="py-3 px-4 border-b border-gray-700 text-center">
                      <button
                        onClick={() => handleDepositeAccept(item?.email)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center justify-center gap-1 mx-auto transition"
                      >
                        <FaCheck /> Accept
                      </button>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-700 text-center">
                      <button
                        onClick={() => handleDepositeCancel(item?.email)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center justify-center gap-1 mx-auto transition"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-400 font-medium">
                    No deposit records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
