// src/components/DeleteUserModal.js

import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const DeleteUserModal = ({ user, onClose, onConfirm, isDeleting }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-[#161B22] border border-red-500/50 rounded-lg shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
            <FaExclamationTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-4 text-left">
            <h3 className="text-lg leading-6 font-bold text-white" id="modal-title">
              Delete User
            </h3>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-300">
            Are you sure you want to delete the user <strong className="text-purple-400">{user.name}</strong> ({user.email})?
          </p>
          <p className="mt-2 text-sm text-red-400">
            This action is irreversible. All associated data will be permanently removed.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:bg-red-800 disabled:cursor-not-allowed"
            onClick={() => onConfirm(user._id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;