// src/components/AllUsers.js

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { FaTrash, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import api from "../services/api";
import useAuth from "../CustomHooks/useAuth";
import Spinner from "./Spinner/Loading";
import DeleteUserModal from "./DeleteUserModal"; // Import the new modal
import toast, { Toaster } from "react-hot-toast";

const fetchAllUsers = async (page = 1, search = "") => {
  const { data } = await api.get(`/admin/users?page=${page}&limit=10&search=${search}`);
  return data;
};

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { token } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allUsers", page, debouncedSearchTerm],
    queryFn: () => fetchAllUsers(page, debouncedSearchTerm),
    enabled: !!token,
    keepPreviousData: true,
    retry: false,
  });

  // Mutation for deleting a user
  const deleteUserMutation = useMutation({
    mutationFn: (userId) => api.delete(`/admin/users/${userId}`),
    onSuccess: () => {
      toast.success("User deleted successfully!");
      // Invalidate the query to refetch the user list
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      handleCloseDeleteModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.msg || "Failed to delete user.");
    },
  });

  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading && !data) return <Spinner />;

  if (isError) {
    const errorMessage = error.response?.data?.msg || "Failed to fetch users.";
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-red-500 font-bold">An Error Occurred</h2>
        <p className="text-gray-400 mt-2">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
      </div>
      
      <div className="bg-[#161B22] border border-gray-700 rounded-lg shadow-lg relative">
         <div className="p-4 border-b border-gray-700">
             <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 pl-10 pr-4 py-2 bg-[#0D1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
         </div>

        {isLoading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg z-10">
                <Spinner />
            </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-[#161B22] divide-y divide-gray-700">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleOpenDeleteModal(user)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors duration-200"
                        title="Delete User"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-gray-500">
                    No users found for your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-800 border-t border-gray-700 rounded-b-lg">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition-colors"
          >
            <FaChevronLeft /> Previous
          </button>
          <span className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition-colors"
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteUserModal
          user={userToDelete}
          onClose={handleCloseDeleteModal}
          onConfirm={deleteUserMutation.mutate}
          isDeleting={deleteUserMutation.isLoading}
        />
      )}
    </div>
  );
};

export default AllUsers;