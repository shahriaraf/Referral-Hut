import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { programsData } from '../../Route Programs/programData'; // Adjust path as needed

// --- Component-specific configuration for 3P Admin ---
const PACKAGE_NAME = '3p';

const EditLevelModal = ({ isOpen, onClose, level, onUpdate }) => {
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (level) {
            // Extract numeric value from price string (e.g., "৳ 100" -> "100")
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
            // Simulate API call or update local data
            setTimeout(() => {
                const updatedLevel = { ...level, price: `৳ ${parseFloat(price)}` };
                toast.success('Level price updated successfully!');
                onUpdate(updatedLevel);
                onClose();
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Failed to update level price', error);
            toast.error('Failed to update level price');
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">
                        Edit Level {level?.levelNumber} Price
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={price.toString().replace('৳ ', '')}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter price"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <FaSave size={16} />
                            )}
                            {loading ? 'Updating...' : 'Update Price'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Admin3PLevels = () => {
    // --- State Management ---
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);

    // --- Data Loading Logic ---
    const loadLevels = () => {
        try {
            const programData = programsData[PACKAGE_NAME];
            if (programData && programData.levels) {
                // Convert the levels format to match your component structure
                const formattedLevels = programData.levels.map((level, index) => ({
                    _id: `${PACKAGE_NAME}-${level.level}`,
                    levelNumber: level.level,
                    price: level.price,
                    packageName: PACKAGE_NAME,
                    description: `Level ${level.level} - Contains ${level.cards.length} modules`,
                    cards: level.cards,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }));
                setLevels(formattedLevels);
            }
        } catch (error) {
            console.error('Failed to load levels', error);
            toast.error('Failed to load levels');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            loadLevels();
        }, 500);
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
                level._id === updatedLevel._id ? updatedLevel : level
            )
        );
        
        // Optionally update the programsData as well
        // This would persist the changes in your local data
        try {
            const programData = programsData[PACKAGE_NAME];
            if (programData && programData.levels) {
                const levelIndex = programData.levels.findIndex(l => l.level === updatedLevel.levelNumber);
                if (levelIndex !== -1) {
                    programData.levels[levelIndex].price = updatedLevel.price;
                }
            }
        } catch (error) {
            console.error('Failed to update local data', error);
        }
    };

    // --- Render Logic ---
    if (loading) {
        return (
            <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-400 mt-4">Loading 3P levels...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-400 mb-2">
                    Admin - 3P Program Levels
                </h2>
                <p className="text-gray-400">
                    Manage pricing for all 3P program levels
                </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {levels.map((level) => (
                    <div
                        key={level._id}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">
                                Level {level.levelNumber}
                            </h3>
                            <button
                                onClick={() => handleEditClick(level)}
                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors hover:scale-110 transform duration-200"
                                title="Edit Level Price"
                            >
                                <FaEdit size={16} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Price:</span>
                                <span className="text-green-400 font-semibold">
                                    {level.price || '৳ 0'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Package:</span>
                                <span className="text-blue-400 font-medium uppercase">
                                    {level.packageName}
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
                    <p className="text-gray-400 text-lg">
                        No 3P levels found. Please check your configuration.
                    </p>
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

export default Admin3PLevels;