import React from 'react';
import axios from 'axios';

// ছোট স্লট UI কম্পোনেন্ট
const Slot = ({ status }) => {
    let bgColor = 'bg-gray-700';
    if (status === 'paid_to_user') bgColor = 'bg-green-500';
    if (status === 'paid_to_upliner') bgColor = 'bg-yellow-500';
    return <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${bgColor} border-2 border-gray-500`}></div>;
};

const ThreePProgram = ({ user, allLevels, userActivations, fetchData }) => {
    // লেভেল কেনা এবং রিসাইকেল করার হ্যান্ডলারগুলো এখানে থাকবে
    const handleBuyLevel = async (levelNumber) => {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        try {
            const res = await axios.post('http://localhost:5000/api/levels/buy', { levelNumber }, config);
            alert(res.data.msg);
            fetchData(); // ডেটা রিফ্রেশ করার জন্য প্যারেন্ট থেকে আসা ফাংশন কল
        } catch (err) {
            alert(err.response?.data?.msg || "An error occurred");
        }
    };
    
    const handleRecycleLevel = async (levelNumber) => {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        try {
            const res = await axios.post('http://localhost:5000/api/levels/recycle', { levelNumber }, config);
            alert(res.data.msg);
            fetchData(); // ডেটা রিফ্রেশ করার জন্য প্যারেন্ট থেকে আসা ফাংশন কল
        } catch (err) {
            alert(err.response?.data?.msg || "An error occurred");
        }
    };

    // ডেটা লোড না হলে লোডিং মেসেজ দেখানো
    if (!user || !allLevels.length) {
        return <div className="text-center text-gray-300 py-10">Loading program data...</div>;
    }

    // ইউজারের লেভেলগুলোর সর্বশেষ অবস্থা গণনা করা
    const latestActivationsMap = new Map();
    userActivations.forEach(act => {
        if (!latestActivationsMap.has(act.levelNumber) || latestActivationsMap.get(act.levelNumber).cycle < act.cycle) {
            latestActivationsMap.set(act.levelNumber, act);
        }
    });
    const latestActivations = Array.from(latestActivationsMap.values());
    const purchasedLevelNumbers = latestActivations.map(a => a.levelNumber);
    const highestPurchasedLevel = Math.max(0, ...purchasedLevelNumbers);

    return (
        <div className="text-white">
            {/* উপরের ব্যালেন্স এবং আইডি সেকশন */}
            <div className="bg-slate-800/50 p-4 rounded-lg mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <p className="text-md">Your Referral ID: 
                    <span className="font-mono bg-purple-600 text-white px-3 py-1 rounded-md ml-2">{user.uniqueId}</span>
                </p>
                <p className="text-md">Wallet Balance: 
                    <span className="font-bold text-green-400 text-xl ml-2">${user.walletBalance.toFixed(2)}</span>
                </p>
            </div>

            {/* অ্যাক্টিভ লেভেল সেকশন */}
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-300">Your Activations</h2>
            {latestActivations.length === 0 ? (
                <p className="text-gray-400 text-center py-4">You have not purchased any levels yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {latestActivations.sort((a,b) => a.levelNumber - b.levelNumber).map(act => {
                        const levelInfo = allLevels.find(l => l.levelNumber === act.levelNumber);
                        const status = act?.status ?? 'active';
                        return (
                            <div key={act._id} className={`p-5 rounded-lg border-2 ${status === 'frozen' ? 'border-red-500 bg-slate-900/70' : 'border-slate-700 bg-slate-900/70'}`}>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-lg md:text-xl">Level {act.levelNumber}</h3>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${status === 'frozen' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>{status.toUpperCase()}</span>
                                </div>
                                <p className="text-xs text-gray-400 mb-4">Cycle: {act.cycle} | Completed: {act.completedCycles}</p>
                                <div className="flex justify-around items-center space-x-2 my-4">
                                    {act.slots.map((slot, index) => <Slot key={index} status={slot.status} />)}
                                </div>
                                {status === 'frozen' && (
                                    <button onClick={() => handleRecycleLevel(act.levelNumber)} className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 p-2 rounded font-bold transition duration-200 text-sm">
                                        Recycle for ${levelInfo?.price}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* নতুন লেভেল কেনার সেকশন */}
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-300">Available Levels to Purchase</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allLevels.map(level => {
                    if (purchasedLevelNumbers.includes(level.levelNumber)) return null;
                    const canPurchase = level.levelNumber === highestPurchasedLevel + 1;
                    return (
                        <div key={level.levelNumber} className={`p-5 rounded-lg border border-slate-700 text-center transition-all duration-300 ${!canPurchase ? 'opacity-50 bg-slate-800' : 'bg-slate-800 hover:border-purple-500'}`}>
                            <h3 className="font-bold text-xl md:text-2xl">Level {level.levelNumber}</h3>
                            <p className="text-2xl md:text-3xl text-green-400 my-4 font-bold">${level.price}</p>
                            <button 
                                onClick={() => handleBuyLevel(level.levelNumber)} 
                                disabled={!canPurchase}
                                className={`w-full px-6 py-2 md:py-3 rounded font-bold transition duration-200 ${canPurchase ? 'bg-purple-600 hover:bg-purple-700 cursor-pointer' : 'bg-gray-600 cursor-not-allowed'}`}
                            >
                                {canPurchase ? 'Buy Now' : 'Locked'}
                            </button>
                            {!canPurchase && level.levelNumber > 1 && (
                                <p className="text-xs text-gray-400 mt-2">Purchase Level {level.levelNumber - 1} first.</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ThreePProgram;