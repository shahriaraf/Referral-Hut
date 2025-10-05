import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaLock, FaSyncAlt } from 'react-icons/fa'; // FaSync বদলে FaSyncAlt ব্যবহার করা হয়েছে
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SlotCard from '../../Components/SlotCard';
import Modal from '../../Components/Modal/Modal';
import useAuth from '../../CustomHooks/useAuth';
import api from '../../services/api';
import Spinner from '../../Components/Spinner/Loading';

// --- CHANGE 1: VIP program removed ---
const programInfo = {
    '3p': { title: '3P Program', description: 'Unlock levels, refer users, and earn in the 3P matrix with 3 slots.' },
    '6p': { title: '6P Program', description: 'A larger matrix with 6 slots, offering different reward distributions.' },
};
const programColors = {
    '3p': { text: 'text-blue-400', bg: 'bg-blue-600', border: 'border-blue-500' },
    '6p': { text: 'text-purple-400', bg: 'bg-purple-600', border: 'border-purple-500' },
};

const Packages = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    
    const [activeProgram, setActiveProgram] = useState('3p');
    const [selectedLevelDetails, setSelectedLevelDetails] = useState(1);
    
    // --- CHANGE 2: Modal state is now more generic ---
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null, // 'purchase' or 'unfreeze'
        levelData: null,
        program: '',
    });

    // --- useQuery to load program prices (VIP removed) ---
    const { data: allProgramsData, isLoading: isLoadingPrices } = useQuery({
        queryKey: ['programPrices'],
        queryFn: async () => {
            const programKeys = ['3p', '6p'];
            const promises = programKeys.map(key => api.get(`/programs/${key}/levels`));
            const responses = await Promise.all(promises);
            return {
                '3p': responses[0].data,
                '6p': responses[1].data,
            };
        }
    });

    const invalidateUserData = () => {
        queryClient.invalidateQueries({ queryKey: ['authUser'] });
    };
    
    // --- useMutation for purchasing a package ---
    const purchaseMutation = useMutation({
        mutationFn: ({ program, level }) => api.post(`/user/packages/purchase/${program}/${level}`),
        onSuccess: (data) => {
            toast.success(data.data.msg || "Level purchased successfully!");
            invalidateUserData();
        },
        onError: (error) => toast.error(error.response?.data?.msg || "Purchase failed."),
        onSettled: () => setModalState({ isOpen: false, type: null, levelData: null, program: '' })
    });

    // --- CHANGE 3: New mutation for unfreezing a level ---
    const unfreezeMutation = useMutation({
        mutationFn: ({ program, level }) => api.post(`/user/packages/unfreeze/${program}/${level}`),
        onSuccess: (data) => {
            toast.success(data.data.msg || "Level unfrozen successfully!");
            invalidateUserData();
        },
        onError: (error) => toast.error(error.response?.data?.msg || "Unfreeze failed."),
        onSettled: () => setModalState({ isOpen: false, type: null, levelData: null, program: '' })
    });

    const openModal = (type, program, levelData) => {
        if (levelData) {
            setModalState({ isOpen: true, type, levelData, program });
        } else {
            toast.error("Could not find level details. Please try again.");
        }
    };

    const handleConfirm = () => {
        const { type, program, levelData } = modalState;
        if (type === 'purchase') {
            purchaseMutation.mutate({ program, level: levelData.level });
        } else if (type === 'unfreeze') {
            unfreezeMutation.mutate({ program, level: levelData.level });
        }
    };

    const { levels, highestPurchasedLevel, currentLevelData } = useMemo(() => {
        if (!user || !user.packages[activeProgram]) return { levels: [], highestPurchasedLevel: 0, currentLevelData: null };
        const programLevels = user.packages[activeProgram].levels;
        const purchased = programLevels.filter(l => l.status !== 'locked');
        const highest = purchased.length > 0 ? Math.max(...purchased.map(l => l.level)) : 0;
        const currentData = programLevels.find(l => l.level === selectedLevelDetails);
        return { levels: programLevels, highestPurchasedLevel: highest, currentLevelData: currentData };
    }, [user, activeProgram, selectedLevelDetails]);
      
    if (!user || isLoadingPrices) return <Spinner/>;

    const colors = programColors[activeProgram];

    return (
        <div className="p-4 md:p-6 text-white">
            <Modal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onConfirm={handleConfirm}
                title={`Confirm ${modalState.type}`}
                isConfirming={purchaseMutation.isLoading || unfreezeMutation.isLoading}
            >
                {modalState.type === 'purchase' && `Are you sure you want to purchase ${modalState.program?.toUpperCase()} Level ${modalState.levelData?.level} for $${modalState.levelData?.cost}?`}
                {modalState.type === 'unfreeze' && `Are you sure you want to unfreeze ${modalState.program?.toUpperCase()} Level ${modalState.levelData?.level} for $${modalState.levelData?.unfreezeCost}?`}
            </Modal>
            
            <div className="flex justify-center mb-8 border-b-2 border-gray-700">
                 {['3p', '6p'].map(p => ( // VIP removed
                    <button key={p} onClick={() => { setActiveProgram(p); setSelectedLevelDetails(1); }} className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 ${activeProgram === p ? `${programColors[p].text} border-b-2 ${programColors[p].border}` : 'text-gray-400'}`}>
                        {p.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="text-center">
                <h3 className={`text-2xl font-bold mb-2 ${colors.text}`}>{programInfo[activeProgram].title}</h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">{programInfo[activeProgram].description}</p>
            </div>
            
            <div className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
                 {levels.map((level) => {
                    const isUnlocked = level.status !== 'locked';
                    const isFrozen = level.status === 'frozen';
                    const isActive = level.level === selectedLevelDetails;
                    const canPurchase = level.status === 'locked' && level.level <= highestPurchasedLevel + 1;
                    const levelPriceData = allProgramsData[activeProgram]?.find(l => l.level === level.level);

                    return (
                        <button key={level.level} onClick={() => {
                                if (isFrozen) openModal('unfreeze', activeProgram, levelPriceData);
                                else if (isUnlocked) setSelectedLevelDetails(level.level);
                                else if (canPurchase) openModal('purchase', activeProgram, levelPriceData);
                                else toast.info(`Please purchase previous levels first.`);
                            }}
                            className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                                isActive ? `${colors.bg} text-white shadow-lg` :
                                isFrozen ? 'bg-cyan-600 text-white hover:bg-cyan-500 cursor-pointer' :
                                isUnlocked ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' :
                                `bg-gray-800 text-gray-500 border border-dashed border-gray-600 ${canPurchase ? 'cursor-pointer hover:border-solid hover:' + colors.border : 'cursor-not-allowed opacity-60'}`
                            }`}>
                            {isFrozen ? <FaSyncAlt size={12} /> : !isUnlocked && <FaLock size={12} />}
                            {/* --- CHANGE 4: Button text updated for clarity --- */}
                            <span>{isFrozen ? `Unfreeze Lvl ${level.level}` : `Level ${level.level}`}</span>
                        </button>
                    );
                })}
            </div>

            {currentLevelData && currentLevelData.status !== 'locked' ? (
                <motion.div key={`${activeProgram}-${selectedLevelDetails}`} className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" variants={{ visible: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="visible">
                    {Array.from({ length: activeProgram === '3p' ? 3 : 6 }).map((_, index) => ( // VIP removed
                        <SlotCard key={index} index={index} isFilled={index < currentLevelData.boxes.length} />
                    ))}
                </motion.div>
            ) : (
                <div className="text-center py-10 px-6 bg-gray-800/50 rounded-lg">
                    <p className="text-lg text-gray-400">Level {selectedLevelDetails} is locked.</p>
                    <p className="text-sm text-gray-500 mt-2">Purchase previous levels to unlock.</p>
                </div>
            )}
        </div>
    );
};

export default Packages;