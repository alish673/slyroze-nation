import { useState } from 'react';

export default function NicknameModal({ currentNickname, onSave, onClose }) {
  const [nickname, setNickname] = useState(currentNickname || '');

  const handleSave = () => {
    if (!nickname.trim()) {
      alert("Please enter a valid nickname.");
      return;
    }
    onSave(nickname.trim());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-sm w-full space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-slyrozePink">Set Nickname</h2>
        <input
          type="text"
          className="w-full p-2 rounded text-black"
          placeholder="Enter new nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-neonPurple hover:bg-neonGreen text-black py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
              }
