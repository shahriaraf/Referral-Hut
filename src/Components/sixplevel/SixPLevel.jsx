import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../services/api"; // <-- মূল পরিবর্তন: axios এর পরিবর্তে api ইম্পোর্ট করা হয়েছে

const PACKAGE_NAME = "6p";

const EditLevelModal = ({ isOpen, onClose, level, onUpdate }) => {
  const [cost, setCost] = useState("");
  const [unfreezeCost, setUnfreezeCost] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (level) {
      setCost(level.cost || "");
      setUnfreezeCost(level.unfreezeCost || "");
    }
  }, [level]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        cost: parseFloat(cost),
        unfreezeCost: parseFloat(unfreezeCost),
      };
      // --- api.patch ব্যবহার করা হচ্ছে ---
      await api.patch(
        `/programs/${PACKAGE_NAME}/levels/${level.level}`,
        payload
      );
      toast.success("Level updated successfully!");
      onUpdate({ ...level, ...payload });
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to update level");
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-6">
          Edit Level {level?.level}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Cost ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">
              Unfreeze Cost ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={unfreezeCost}
              onChange={(e) => setUnfreezeCost(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2"></div>
              ) : (
                <FaSave />
              )}{" "}
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Admin6PLevels = () => {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const loadLevels = async () => {
    setLoading(true);
    try {
      // --- api.get ব্যবহার করা হচ্ছে ---
      const response = await api.get(`/programs/${PACKAGE_NAME}/levels`);
      if (Array.isArray(response.data)) {
        setLevels(response.data);
      } else {
        setLevels([]);
      }
    } catch (error) {
      toast.error("Failed to load levels.");
      setLevels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLevels();
  }, []);

  const handleEditClick = (level) => {
    setSelectedLevel(level);
    setModalOpen(true);
  };
  const handleLevelUpdate = (updatedLevel) => {
    setLevels((prev) =>
      prev.map((l) => (l.level === updatedLevel.level ? updatedLevel : l))
    );
  };
  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
        Admin - 6P Program Levels
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <div
            key={level.level}
            className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                Level {level.level}
              </h3>
              <button
                onClick={() => handleEditClick(level)}
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
              >
                <FaEdit />
              </button>
            </div>
            <div className="space-y-2 text-gray-300">
              <p>
                Cost:{" "}
                <span className="font-semibold text-green-400">
                  ${level.cost || 0}
                </span>
              </p>
              <p>
                Unfreeze Cost:{" "}
                <span className="font-semibold text-yellow-400">
                  ${level.unfreezeCost || 0}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {levels.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          No levels found for this program.
        </div>
      )}
      <EditLevelModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        level={selectedLevel}
        onUpdate={handleLevelUpdate}
      />
    </div>
  );
};
export default Admin6PLevels;
