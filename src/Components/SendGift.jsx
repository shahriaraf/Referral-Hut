import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { FaSearch, FaGift } from "react-icons/fa";
import api from "../services/api";
import { Toaster } from "react-hot-toast";
import SendGiftModal from "./SendGiftModal";

const searchUsers = async (search) => {
  if (!search) return [];
  const { data } = await api.get(`/user/search?search=${search}`);
  return data;
};

const SendGift = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["userSearch", debouncedSearch],
    queryFn: () => searchUsers(debouncedSearch),
    enabled: debouncedSearch.length > 2,
    placeholderData: [],
  });

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Send a Gift from Your Balance</h1>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search user by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="bg-[#161B22] border border-gray-700 rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-700">
          {isLoading && <li className="p-4 text-center text-gray-400">Searching...</li>}
          
          {!isLoading && debouncedSearch.length > 2 && users.length === 0 && (
            <li className="p-4 text-center text-gray-500">No users found.</li>
          )}

          {users.map((user) => (
            <li key={user._id} className="p-4 flex justify-between items-center hover:bg-gray-800 transition-colors">
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <button
                onClick={() => setSelectedUser(user)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
              >
                <FaGift />
                Gift
              </button>
            </li>
          ))}

          {debouncedSearch.length <= 2 && users.length === 0 && !isLoading && (
             <li className="p-4 text-center text-gray-500">
                Type at least 3 characters to search for a user.
             </li>
          )}
        </ul>
      </div>

      {selectedUser && (
        <SendGiftModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          isAdmin={false} // This ensures it uses the user-to-user logic
        />
      )}
    </div>
  );
};

export default SendGift;