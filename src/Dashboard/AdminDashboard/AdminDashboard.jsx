import React, { useState } from "react";
import useAllDeposite from "../../CustomHooks/useAllDeposite";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs"; // Icon for the dropdown
import useAxiosPublic from "../../CustomHooks/Api/useAxiosPublic";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [allDeposite, refetch, isLoading] = useAllDeposite();
  const axiosPublic = useAxiosPublic();

  // State to manage which dropdown is open. We store the ID of the deposit.
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Function to toggle the dropdown for a specific row
  const handleToggleDropdown = (depositeId) => {
    // If the clicked dropdown is already open, close it. Otherwise, open it.
    setOpenDropdownId(openDropdownId === depositeId ? null : depositeId);
  };

  // --- No changes to the logic functions below ---

  //  deposite accept function
  const handleDepositeAccept = async (deposite) => {
    try {
      const res = await axiosPublic.patch(
        `/api/accept-deposite-status/${deposite?._id}`
      );
      if (res.data.acknowledged && res.data.modifiedCount > 0) {
        toast.success(`Deposit status for ${deposite.email} updated to accepted`);
        refetch();
        setOpenDropdownId(null); // Close dropdown after action
      }
    } catch (error) {
      console.error("Error accepting deposit:", error);
    }
  };

  //  deposite decline function
  const handleDepositeCancel = async (deposite) => {
    try {
      const res = await axiosPublic.patch(
        `/api/cancel-deposite-status/${deposite?._id}`
      );
      if (res.data.acknowledged && res.data.modifiedCount > 0) {
        toast.success(`Deposit status for ${deposite.email} updated to cancelled`);
        refetch();
        setOpenDropdownId(null); // Close dropdown after action
      }
    } catch (error) {
      console.error("Error cancelling deposit:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0D1117]">
        <TbFidgetSpinner className="animate-spin text-5xl text-gray-400" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 bg-[#0D1117] text-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Deposit Requests</h1>

      <div className="overflow-x-auto bg-[#161B22] rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              {/* Cleaner header styling */}
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">#</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Email</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Amount</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Transaction ID</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Date</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-300">Status</th>
              {/* A single "Actions" column */}
              <th scope="col" className="relative py-3.5 px-4"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {allDeposite && allDeposite.length > 0 ? (
              allDeposite.map((deposite, index) => (
                <tr key={deposite._id} className="hover:bg-gray-800/40 transition-colors duration-200">
                  <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-300">{index + 1}</td>
                  <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-400">{deposite.email}</td>
                  <td className="whitespace-nowrap py-4 px-4 text-sm font-semibold text-green-400">${deposite.ammount}</td>
                  <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-400 truncate max-w-xs">{deposite.transectionId}</td>
                  <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-400">{deposite.Date}</td>
                  <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">
                    {/* Status Badge */}
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full
                      ${deposite.status?.toLowerCase() === 'accepted' ? 'bg-green-500/20 text-green-400' : ''}
                      ${deposite.status?.toLowerCase() === 'cancelled' ? 'bg-red-500/20 text-red-400' : ''}
                      ${deposite.status?.toLowerCase() === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                    `}>
                      {deposite.status}
                    </span>
                  </td>
                  {/* The new Actions cell with the dropdown */}
                  <td className="relative whitespace-nowrap py-4 px-4 text-right text-sm font-medium">
                    {deposite.status?.toLowerCase() === 'pending' && (
                      <>
                        <button
                          onClick={() => handleToggleDropdown(deposite._id)}
                          className="p-2 rounded-full hover:bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                        >
                          <BsThreeDotsVertical size={16} />
                        </button>
                        
                        {/* The Dropdown Menu */}
                        {openDropdownId === deposite._id && (
                          <div className="absolute right-8 top-full z-10 mt-2 w-32 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <button
                                onClick={() => handleDepositeAccept(deposite)}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                              >
                                <FaCheck className="text-green-400" /> Approve
                              </button>
                              <button
                                onClick={() => handleDepositeCancel(deposite)}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                              >
                                <FaTimes className="text-red-400" /> Reject
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No pending deposit requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;