import React from 'react';
import { FaLock, FaCheckCircle, FaSnowflake } from 'react-icons/fa';

const PackageLevel = ({ program, levelData, onPurchase, onUnfreeze }) => { // Added onUnfreeze prop
    const getStatusInfo = (status) => {
        switch (status) {
            case 'active': return { color: 'green', icon: <FaCheckCircle /> };
            case 'frozen': return { color: 'blue', icon: <FaSnowflake /> };
            default: return { color: 'gray', icon: <FaLock /> };
        }
    };
    const { color, icon } = getStatusInfo(levelData.status);
    
    // --- CHANGE: VIP case removed from box count logic ---
    const boxCount = program === '3p' ? 3 : 6;
    const filledBoxes = levelData.boxes?.length || 0;

    return (
        <div className={`bg-gray-800 p-5 rounded-lg shadow-md border-t-4 border-${color}-500 flex flex-col justify-between`}>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-white">Level {levelData.level}</h3>
                    <div className={`text-2xl text-${color}-400`}>{icon}</div>
                </div>
                <p className="text-gray-400 capitalize mb-4">Status: {levelData.status}</p>
                
                {/* Dynamically show cost or unfreezeCost */}
                {levelData.status === 'frozen' ?
                    <p className="text-4xl font-extrabold text-white mb-4">${levelData.unfreezeCost} <span className="text-lg font-normal text-gray-400">to Unfreeze</span></p> :
                    <p className="text-4xl font-extrabold text-white mb-4">${levelData.cost}</p>
                }
                
                {levelData.status === 'active' && (
                    <div>
                        <p className="text-sm text-gray-400 mb-2">Referral Boxes: {filledBoxes}/{boxCount}</p>
                        <div className={`grid ${boxCount === 3 ? 'grid-cols-3' : 'grid-cols-3'} gap-2`}>
                            {Array.from({ length: boxCount }).map((_, i) => (
                                <div key={i} className={`h-5 w-full rounded ${i < filledBoxes ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* --- CHANGE: Button logic updated for all states --- */}
            {levelData.status === 'locked' && (
                <button
                    onClick={onPurchase}
                    className="w-full mt-6 px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
                >
                    Purchase Now
                </button>
            )}
            {levelData.status === 'frozen' && (
                <button
                    onClick={onUnfreeze}
                    className="w-full mt-6 px-4 py-2 font-bold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 transition-all"
                >
                    Unfreeze Now
                </button>
            )}
            {levelData.status === 'active' && (
                 <button
                    disabled
                    className="w-full mt-6 px-4 py-2 font-bold text-white bg-gray-500 rounded-md cursor-not-allowed"
                >
                    Purchased
                </button>
            )}
        </div>
    );
};
export default PackageLevel;