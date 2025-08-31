// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import { programsData } from'../../Route Programs/programData'; // Adjust path as needed

// // --- Component-specific configuration for VIP Admin ---
// const PACKAGE_NAME = 'vip';

// const EditLevelModal = ({ isOpen, onClose, level, onUpdate }) => {
//     const [price, setPrice] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (level) {
//             // Extract numeric value from price string (e.g., "৳ 5000" -> "5000")
//             const numericPrice = level.price ? level.price.toString().replace('৳ ', '') : '';
//             setPrice(numericPrice);
//         }
//     }, [level]);

//     const handleSubmit = async (e) => {
//         if (e) e.preventDefault();
//         if (!price || price <= 0) {
//             toast.error('Please enter a valid price');
//             return;
//         }

//         setLoading(true);

//         try {
//             // Simulate API call or update local data
//             setTimeout(() => {
//                 const updatedLevel = { ...level, price: `৳ ${parseFloat(price)}` };
//                 toast.success('VIP level price updated successfully!');
//                 onUpdate(updatedLevel);
//                 onClose();
//                 setLoading(false);
//             }, 1000);
//         } catch (error) {
//             console.error('Failed to update level price', error);
//             toast.error('Failed to update level price');
//             setLoading(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-white">
//                         Edit VIP Level {level?.levelNumber} Price
//                     </h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-white transition-colors"
//                     >
//                         <FaTimes size={20} />
//                     </button>
//                 </div>

//                 <div>
//                     <div className="mb-4">
//                         <label className="block text-gray-300 text-sm font-medium mb-2">
//                             Price (৳)
//                         </label>
//                         <input
//                             type="number"
//                             step="0.01"
//                             min="0"
//                             value={price.toString().replace('৳ ', '')}
//                             onChange={(e) => setPrice(e.target.value)}
//                             className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             placeholder="Enter price"
//                             onKeyPress={(e) => {
//                                 if (e.key === 'Enter') {
//                                     handleSubmit(e);
//                                 }
//                             }}
//                         />
//                     </div>

//                     <div className="flex gap-3">
//                         <button
//                             onClick={handleSubmit}
//                             disabled={loading}
//                             className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                         >
//                             {loading ? (
//                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                             ) : (
//                                 <FaSave size={16} />
//                             )}
//                             {loading ? 'Updating...' : 'Update Price'}
//                         </button>
//                         <button
//                             onClick={onClose}
//                             className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const AdminVIPLevels = () => {
//     // --- State Management ---
//     const [levels, setLevels] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedLevel, setSelectedLevel] = useState(null);

//     // --- Data Loading Logic ---
//     const loadLevels = () => {
//         try {
//             const programData = programsData[PACKAGE_NAME];
//             if (programData && programData.levels) {
//                 // Convert the levels format to match your component structure
//                 const formattedLevels = programData.levels.map((level, index) => ({
//                     _id: `${PACKAGE_NAME}-${level.level}`,
//                     levelNumber: level.level,
//                     price: level.price,
//                     packageName: PACKAGE_NAME,
//                     description: `VIP Level ${level.level} - Premium coaching with ${level.cards.length} sessions`,
//                     cards: level.cards,
//                     createdAt: new Date().toISOString(),
//                     updatedAt: new Date().toISOString()
//                 }));
//                 setLevels(formattedLevels);
//             }
//         } catch (error) {
//             console.error('Failed to load VIP levels', error);
//             toast.error('Failed to load VIP levels');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         // Simulate loading delay
//         setTimeout(() => {
//             loadLevels();
//         }, 500);
//     }, []);

//     // --- Event Handlers ---
//     const handleEditClick = (level) => {
//         setSelectedLevel(level);
//         setModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setSelectedLevel(null);
//         setModalOpen(false);
//     };

//     const handleLevelUpdate = (updatedLevel) => {
//         setLevels(prevLevels => 
//             prevLevels.map(level => 
//                 level._id === updatedLevel._id ? updatedLevel : level
//             )
//         );
        
//         // Update the programsData as well
//         try {
//             const programData = programsData[PACKAGE_NAME];
//             if (programData && programData.levels) {
//                 const levelIndex = programData.levels.findIndex(l => l.level === updatedLevel.levelNumber);
//                 if (levelIndex !== -1) {
//                     programData.levels[levelIndex].price = updatedLevel.price;
//                 }
//             }
//         } catch (error) {
//             console.error('Failed to update local VIP data', error);
//         }
//     };

//     // --- Render Logic ---
//     if (loading) {
//         return (
//             <div className="text-center py-10">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
//                 <p className="text-gray-400 mt-4">Loading VIP levels...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-6xl mx-auto p-6">
//             <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-green-400 mb-2">
//                     Admin - VIP Program Levels
//                 </h2>
//                 <p className="text-gray-400">
//                     Manage pricing for all VIP program levels
//                 </p>
//             </div>

//             <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                 {levels.map((level) => (
//                     <div
//                         key={level._id}
//                         className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-green-500 transition-all duration-300"
//                     >
//                         <div className="flex items-center justify-between mb-4">
//                             <div>
//                                 <h3 className="text-xl font-semibold text-white">
//                                     VIP Level {level.levelNumber}
//                                 </h3>
//                                 <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mt-1">
//                                     Premium
//                                 </span>
//                             </div>
//                             <button
//                                 onClick={() => handleEditClick(level)}
//                                 className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors hover:scale-110 transform duration-200"
//                                 title="Edit VIP Level Price"
//                             >
//                                 <FaEdit size={16} />
//                             </button>
//                         </div>

//                         <div className="space-y-2">
//                             <div className="flex justify-between">
//                                 <span className="text-gray-400">Price:</span>
//                                 <span className="text-green-400 font-bold text-lg">
//                                     {level.price || '৳ 0'}
//                                 </span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span className="text-gray-400">Package:</span>
//                                 <span className="text-green-400 font-medium uppercase">
//                                     {level.packageName}
//                                 </span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span className="text-gray-400">Sessions:</span>
//                                 <span className="text-blue-400 font-medium">
//                                     {level.cards?.length || 0} sessions
//                                 </span>
//                             </div>
//                             {level.description && (
//                                 <div className="pt-2">
//                                     <p className="text-gray-300 text-sm">
//                                         {level.description}
//                                     </p>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Sessions Preview */}
//                         {level.cards && level.cards.length > 0 && (
//                             <div className="mt-4 pt-4 border-t border-gray-700">
//                                 <h4 className="text-sm font-medium text-green-400 mb-2">VIP Sessions:</h4>
//                                 <div className="space-y-1">
//                                     {level.cards.map((card, index) => (
//                                         <div key={index} className="text-xs text-gray-400">
//                                             • {card.title}
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="mt-2 p-2 bg-green-900/20 rounded text-xs text-green-300">
//                                     One-on-one premium coaching sessions
//                                 </div>
//                             </div>
//                         )}

//                         <div className="mt-4 pt-4 border-t border-gray-700">
//                             <div className="flex justify-between text-xs text-gray-500">
//                                 <span>Created: {new Date(level.createdAt).toLocaleDateString()}</span>
//                                 <span>Updated: {new Date(level.updatedAt).toLocaleDateString()}</span>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {levels.length === 0 && (
//                 <div className="text-center py-10">
//                     <div className="bg-gray-800/50 rounded-lg p-8">
//                         <p className="text-gray-400 text-lg mb-2">
//                             No VIP levels found.
//                         </p>
//                         <p className="text-gray-500 text-sm">
//                             Please check your VIP program configuration.
//                         </p>
//                     </div>
//                 </div>
//             )}

//             <EditLevelModal
//                 isOpen={modalOpen}
//                 onClose={handleCloseModal}
//                 level={selectedLevel}
//                 onUpdate={handleLevelUpdate}
//             />
//         </div>
//     );
// };

// export default AdminVIPLevels;

// _______________________________________________________________ below the code is upgraded for backend__________________________



import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios'; // Add axios import

// --- Component-specific configuration for VIP Admin ---
const PACKAGE_NAME = 'vip';
const API_BASE_URL = 'http://localhost:5000/api'; // Define your API base URL

const EditLevelModal = ({ isOpen, onClose, level, onUpdate }) => {
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (level) {
            // Extract numeric value from price string (e.g., "৳ 5000" -> "5000")
            const numericPrice = level.price ? level.price.toString().replace('৳ ', '') : '';
            setPrice(numericPrice);
        }
    }, [level]);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!price || price <= 0) {
            toast.error('Please enter a valid price');
            return;
        }

        setLoading(true);

        try {
            // Make PATCH request to update the level
                     const response = await axios.patch(
  `${API_BASE_URL}/programs/${PACKAGE_NAME}/levels/${level.levelNumber}`, 
  { price: `৳ ${parseFloat(price)}` }
);


            // Handle successful response
            const updatedLevel = { ...level, price: `৳ ${parseFloat(price)}` };
            toast.success('VIP level price updated successfully!');
            onUpdate(updatedLevel);
            onClose();
        } catch (error) {
            console.error('Failed to update VIP level price', error);
            
            // Handle different types of errors
            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || 'Failed to update VIP level price';
                toast.error(errorMessage);
            } else if (error.request) {
                // Request was made but no response received
                toast.error('No response from server. Please check your connection.');
            } else {
                // Something else happened
                toast.error('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">
                        Edit VIP Level {level?.levelNumber} Price
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Price (৳)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={price.toString().replace('৳ ', '')}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter price"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(e);
                                }
                            }}
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <FaSave size={16} />
                            )}
                            {loading ? 'Updating...' : 'Update Price'}
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminVIPLevels = () => {
    // --- State Management ---
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);

    // --- Data Loading Logic ---
    const loadLevels = async () => {
        try {
            setLoading(true);
            
            // Fetch program data and levels from backend API
           const response = await axios.get(`${API_BASE_URL}/programs/${PACKAGE_NAME}/levels`);
            
            if (response.data && response.data.levels) {
                // If backend returns structured data with levels
                  const formattedLevels = response.data.levels.map((lvl, index) => ({
  _id: lvl.id || `${PACKAGE_NAME}-${lvl.level}`, // id নেই DB তে? তাহলে unique key দাও
  levelNumber: lvl.level,
  price: lvl.price,
  packageName: PACKAGE_NAME,
  description: `Level ${lvl.level} - ${lvl.cards?.length || 0} modules`,
  cards: lvl.cards,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));
setLevels(formattedLevels);
            } else if (Array.isArray(response.data)) {
                // If backend returns array of levels directly
                setLevels(response.data);
            } else {
                throw new Error('Invalid data format received from API');
            }
            
        } catch (apiError) {
            console.error('Failed to fetch VIP levels from API:', apiError.message);
            toast.error('Failed to load VIP levels from server');
            
            // Optional: Remove local fallback if you want to rely entirely on backend
            // Uncomment below if you want to keep local fallback
            /*
            console.warn('Falling back to local VIP data...');
            try {
                const programData = programsData[PACKAGE_NAME];
                if (programData && programData.levels) {
                    const formattedLevels = programData.levels.map((level, index) => ({
                        _id: `${PACKAGE_NAME}-${level.level}`,
                        levelNumber: level.level,
                        price: level.price,
                        packageName: PACKAGE_NAME,
                        description: `VIP Level ${level.level} - Premium coaching with ${level.cards.length} sessions`,
                        cards: level.cards,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }));
                    setLevels(formattedLevels);
                } else {
                    toast.error('No local VIP data available');
                }
            } catch (localError) {
                console.error('Failed to load local VIP data:', localError);
                toast.error('Failed to load VIP levels');
            }
            */
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLevels();
    }, []);

    // --- Event Handlers ---
    const handleEditClick = (level) => {
        setSelectedLevel(level);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedLevel(null);
        setModalOpen(false);
    };

    const handleLevelUpdate = (updatedLevel) => {
        setLevels(prevLevels => 
            prevLevels.map(level => 
                level._id === updatedLevel._id ? 
                { ...level, ...updatedLevel, updatedAt: new Date().toISOString() } : 
                level
            )
        );
        
        // No need to update local programsData since we're fetching from backend
        // Local data update removed as we're now using backend as source of truth
    };

    // --- Render Logic ---
    if (loading) {
        return (
            <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                <p className="text-gray-400 mt-4">Loading VIP levels...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-400 mb-2">
                    Admin - VIP Program Levels
                </h2>
                <p className="text-gray-400">
                    Manage pricing for all VIP program levels
                </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {levels.map((level) => (
                    <div
                        key={level._id}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-green-500 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    VIP Level {level.levelNumber}
                                </h3>
                                <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mt-1">
                                    Premium
                                </span>
                            </div>
                            <button
                                onClick={() => handleEditClick(level)}
                                className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors hover:scale-110 transform duration-200"
                                title="Edit VIP Level Price"
                            >
                                <FaEdit size={16} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Price:</span>
                                <span className="text-green-400 font-bold text-lg">
                                    {level.price || '৳ 0'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Package:</span>
                                <span className="text-green-400 font-medium uppercase">
                                    {level.packageName}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Sessions:</span>
                                <span className="text-blue-400 font-medium">
                                    {level.cards?.length || 0} sessions
                                </span>
                            </div>
                            {level.description && (
                                <div className="pt-2">
                                    <p className="text-gray-300 text-sm">
                                        {level.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sessions Preview */}
                        {level.cards && level.cards.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-700">
                                <h4 className="text-sm font-medium text-green-400 mb-2">VIP Sessions:</h4>
                                <div className="space-y-1">
                                    {level.cards.map((card, index) => (
                                        <div key={index} className="text-xs text-gray-400">
                                            • {card.title}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 p-2 bg-green-900/20 rounded text-xs text-green-300">
                                    One-on-one premium coaching sessions
                                </div>
                            </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Created: {new Date(level.createdAt).toLocaleDateString()}</span>
                                <span>Updated: {new Date(level.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {levels.length === 0 && (
                <div className="text-center py-10">
                    <div className="bg-gray-800/50 rounded-lg p-8">
                        <p className="text-gray-400 text-lg mb-2">
                            No VIP levels found.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Please check your VIP program configuration.
                        </p>
                    </div>
                </div>
            )}

            <EditLevelModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                level={selectedLevel}
                onUpdate={handleLevelUpdate}
            />
        </div>
    );
};

export default AdminVIPLevels;