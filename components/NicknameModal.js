import { useState } from 'react';

export default function NicknameModal({ isOpen, onClose, onSave }) {
  const [nickname, setNickname] = useState("");

  const handleSubmit = () => {
    if (!nickname.trim()) {
      alert("Please enter a nickname.");
      return;
    }
    onSave(nickname);
    setNickname("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Set Your Nickname</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter nickname"
          className="w-full p-2 rounded text-black mb-4"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-neonGreen hover:bg-neonPurple text-black py-2 px-4 rounded shadow-neon"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
