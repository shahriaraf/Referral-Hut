import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaSync } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PaymentModal from '../PaymentModal';
import SlotCard from '../../Components/SlotCard';

// --- Component-specific configuration for 6P ---
const programInfo = { title: '6P Program', description: 'Experience the dynamic 6P matrix with team-building spillovers.' };
const colors = { program: { text: 'text-purple-400', bg: 'bg-purple-600', border: 'border-purple-500' } };
const PACKAGE_NAME = '6p';

const SixPProgram = () => {
    // --- State Management (Identical to your ThreePProgram) ---
    const [user, setUser] = useState(null);
    const [allLevels, setAllLevels] = useState([]);
    const [userActivations, setUserActivations] = useState([]);
    const [activeLevel, setActiveLevel] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [levelAction, setLevelAction] = useState(null);
    const navigate = useNavigate();

    // --- Data Fetching Logic (Adapted for 6P) ---
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        const config = { headers: { 'x-auth-token': token } };

        try {
            const [userRes, levelsRes, activationsRes] = await Promise.all([
                axios.get('https://nexonext-server.vercel.app/api/users/me', config),
                axios.get('https://nexonext-server.vercel.app/api/levels/all', config),
                axios.get(`https://nexonext-server.vercel.app/api/levels/my-activations?package=${PACKAGE_NAME}`, config),
            ]);
            
            setUser(userRes.data);
            setAllLevels(levelsRes.data.filter(l => l.packageName === PACKAGE_NAME)); // Filter for 6P
            setUserActivations(activationsRes.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Runs once on component mount

    // --- API Action Handlers (Adapted for 6P) ---
    const handleBuyLevel = async (levelNumber) => {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        try {
            const res = await axios.post('https://nexonext-server.vercel.app/api/levels/buy', { levelNumber, packageName: PACKAGE_NAME }, config);
            toast.success(res.data.msg);
            fetchData();
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };
    
    const handleRecycleLevel = async (levelNumber) => {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        try {
            const res = await axios.post('https://nexonext-server.vercel.app/api/levels/recycle', { levelNumber, packageName: PACKAGE_NAME }, config);
            toast.success(res.data.msg);
            fetchData();
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    // --- Modal Controls (Identical) ---
    const handleOpenModal = (level, action) => { setLevelAction({ level, action }); setModalOpen(true); };
    const handleCloseModal = () => { setLevelAction(null); setModalOpen(false); };
    const handlePaymentSuccess = () => {
        if (!levelAction) return;
        if (levelAction.action === 'buy') handleBuyLevel(levelAction.level.levelNumber);
        else if (levelAction.action === 'recycle') handleRecycleLevel(levelAction.level.levelNumber);
        handleCloseModal();
    };

    // --- Data Processing for Rendering (Identical) ---
    const latestActivations = new Map();
    userActivations.forEach(act => {
        if (!latestActivations.has(act.levelNumber) || latestActivations.get(act.levelNumber).cycle < act.cycle) {
            latestActivations.set(act.levelNumber, act);
        }
    });
    const highestPurchasedLevel = Math.max(0, ...Array.from(latestActivations.keys()));
    const activeLevelActivation = latestActivations.get(activeLevel);

    // --- Render Logic ---
    if (!user) {
        return <div className="text-center py-10">Loading 6P Program...</div>;
    }

    return (
        <div>
            {/* Header Section */}
            <div className="text-center">
                <h3 className={`text-2xl font-bold mb-2 ${colors.program.text}`}>{programInfo.title}</h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">{programInfo.description}</p>
            </div>

            {/* Level Buttons Section */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
                {allLevels.map((level) => {
                    const activation = latestActivations.get(level.levelNumber);
                    const isUnlocked = !!activation;
                    const isFrozen = isUnlocked && activation.status === 'frozen';
                    const isActive = activeLevel === level.levelNumber;
                    const canPurchase = level.levelNumber === highestPurchasedLevel + 1;

                    return (
                        <button
                            key={level.levelNumber}
                            onClick={() => {
                                if (isFrozen) handleOpenModal(level, 'recycle');
                                else if (isUnlocked) setActiveLevel(level.levelNumber);
                                else if (canPurchase) handleOpenModal(level, 'buy');
                                else toast.info(`You must complete Level ${level.levelNumber - 1} of the 6P program first.`);
                            }}
                            className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                                isActive ? `${colors.program.bg} text-white shadow-lg shadow-purple-500/30`
                                : isFrozen ? `bg-yellow-600 text-white hover:bg-yellow-500`
                                : isUnlocked ? `bg-gray-700 text-gray-300 hover:bg-gray-600`
                                : `bg-gray-800 text-gray-500 border border-dashed border-gray-600 ${canPurchase ? 'cursor-pointer hover:border-solid hover:'+colors.program.border : 'cursor-not-allowed opacity-60'}`
                            }`}
                        >
                            {isFrozen ? <FaSync size={12} /> : !isUnlocked && <FaLock size={12} />}
                            <span>{isFrozen ? `Recycle Lvl ${level.levelNumber}` : `Level ${level.levelNumber}`}</span>
                        </button>
                    );
                })}
            </div>

            {/* Slots Display Section */}
            {activeLevelActivation ? (
                <motion.div
                    key={activeLevel}
                    className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // This grid layout works well for 6 items
                    variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                    initial="hidden"
                    animate="visible"
                >
                    {activeLevelActivation.slots.map((slot, index) => (
                        <SlotCard key={index} slot={slot} index={index} />
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-10 px-6 bg-gray-800/50 rounded-lg">
                    <p className="text-lg text-gray-400">Level {activeLevel} is locked.</p>
                    <p className="text-gray-500 mt-2">
                        {activeLevel === highestPurchasedLevel + 1
                         ? "Click the button above to unlock it!"
                         : `You need to purchase and complete Level ${highestPurchasedLevel} first.`
                        }
                    </p>
                </div>
            )}

            {/* Payment Modal */}
            {levelAction && (
                <PaymentModal
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    level={levelAction.level}
                    programTitle={programInfo.title}
                    onPaymentSuccess={handlePaymentSuccess}
                    action={levelAction.action}
                />
            )}
        </div>
    );
};

export default SixPProgram;