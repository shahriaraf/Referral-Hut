import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaLock, FaSync } from 'react-icons/fa';
import SlotCard from '../../Components/SlotCard';
import Modal from '../../Components/Modal/Modal';
import useAuth from '../../CustomHooks/useAuth';
import api from '../../services/api';

// কম্পোনেন্ট ইম্পোর্ট



// প্রতিটি প্রোগ্রামের জন্য আলাদা তথ্য ও ডিজাইন
const programInfo = {
    '3p': { title: '3P Program', description: 'Unlock levels, refer users, and earn in the 3P matrix with 3 slots.' },
    '6p': { title: '6P Program', description: 'A larger matrix with 6 slots, offering different reward distributions.' },
    'vip': { title: 'VIP Program', description: 'Exclusive high-tier program with unique benefits and 4 slots.' },
};

const programColors = {
    '3p': { text: 'text-blue-400', bg: 'bg-blue-600', border: 'border-blue-500' },
    '6p': { text: 'text-purple-400', bg: 'bg-purple-600', border: 'border-purple-500' },
    'vip': { text: 'text-amber-400', bg: 'bg-amber-600', border: 'border-amber-500' },
};

const Packages = () => {
    const { user, setUser } = useAuth();
    const [activeProgram, setActiveProgram] = useState('3p');
    const [selectedLevelDetails, setSelectedLevelDetails] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [levelToPurchase, setLevelToPurchase] = useState(null);

    const handlePurchaseClick = (program, level) => {
        setLevelToPurchase({ program, level });
        setIsModalOpen(true);
    };

    const confirmPurchase = async () => {
        if (!levelToPurchase) return;
        const { program, level } = levelToPurchase;
        const toastId = toast.loading('Processing purchase...');
        try {
            const res = await api.post(`/user/packages/purchase/${program}/${level.level}`);
            toast.success(res.data.msg, { id: toastId });
            const userRes = await api.get('/auth');
            setUser(userRes.data);
        } catch (err) {
            toast.error(err.response?.data?.msg || "Purchase failed.", { id: toastId });
        } finally {
            setIsModalOpen(false);
            setLevelToPurchase(null);
        }
    };

    // মেমোমাইজেশন ব্যবহার করে পারফরম্যান্স অপটিমাইজেশন
    const { levels, highestPurchasedLevel, currentLevelData } = useMemo(() => {
        if (!user) return { levels: [], highestPurchasedLevel: 0, currentLevelData: null };
        const programLevels = user.packages[activeProgram].levels;
        const purchased = programLevels.filter(l => l.status !== 'locked');
        const highest = purchased.length > 0 ? Math.max(...purchased.map(l => l.level)) : 0;
        const currentData = programLevels.find(l => l.level === selectedLevelDetails);
        return { levels: programLevels, highestPurchasedLevel: highest, currentLevelData: currentData };
    }, [user, activeProgram, selectedLevelDetails]);

    if (!user) return <Spinner fullPage />;

    const colors = programColors[activeProgram];

    return (
        <div className="p-4 md:p-6">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmPurchase}
                title="Confirm Purchase"
            >
                Are you sure you want to purchase {levelToPurchase?.program.toUpperCase()} Level {levelToPurchase?.level.level} for ${}?
            </Modal>
            
            {/* Program Toggles */}
            <div className="flex justify-center mb-8 border-b-2 border-gray-700">
                {['3p', '6p', 'vip'].map(p => (
                    <button
                        key={p}
                        onClick={() => { setActiveProgram(p); setSelectedLevelDetails(1); }}
                        className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${activeProgram === p ? `${programColors[p].text} border-b-2 ${programColors[p].border}` : 'text-gray-400'}`}
                    >
                        {p.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="text-center">
                <h3 className={`text-2xl font-bold mb-2 ${colors.text}`}>{programInfo[activeProgram].title}</h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">{programInfo[activeProgram].description}</p>
            </div>

            {/* Level Selection Buttons */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
                {levels.map((level) => {
                    const isUnlocked = level.status !== 'locked';
                    const isFrozen = level.status === 'frozen';
                    const isActive = level.level === selectedLevelDetails;
                    const canPurchase = activeProgram === 'vip' ? level.status === 'locked' : level.status === 'locked' && level.level === highestPurchasedLevel + 1;

                    return (
                        <button
                            key={level.level}
                            onClick={() => {
                                if (isUnlocked) setSelectedLevelDetails(level.level);
                                else if (canPurchase) handlePurchaseClick(activeProgram, level);
                                else toast.info(`Please unlock previous levels first.`);
                            }}
                            className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                                isActive ? `${colors.bg} text-white shadow-lg` :
                                isFrozen ? 'bg-yellow-600 text-white hover:bg-yellow-500' :
                                isUnlocked ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' :
                                `bg-gray-800 text-gray-500 border border-dashed border-gray-600 ${canPurchase ? 'cursor-pointer hover:border-solid hover:' + colors.border : 'cursor-not-allowed opacity-60'}`
                            }`}
                        >
                            {isFrozen ? <FaSync size={12} /> : !isUnlocked && <FaLock size={12} />}
                            <span>{isFrozen ? `Recycle Lvl ${level.level}` : `Level ${level.level}`}</span>
                        </button>
                    );
                })}
            </div>

            {/* Slots/Boxes Display */}
            {currentLevelData && currentLevelData.status !== 'locked' ? (
                <motion.div
                    key={selectedLevelDetails} // Re-trigger animation on level change
                    className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                    initial="hidden"
                    animate="visible"
                >
                    {Array.from({ length: activeProgram === '3p' ? 3 : activeProgram === '6p' ? 6 : 4 }).map((_, index) => (
                        <SlotCard key={index} index={index} isFilled={index < currentLevelData.boxes.length} />
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-10 px-6 bg-gray-800/50 rounded-lg">
                    <p className="text-lg text-gray-400">Level {selectedLevelDetails} is locked.</p>
                    <p className="text-gray-500">Purchase this level to view its slots.</p>
                </div>
            )}
        </div>
    );
};

export default Packages;