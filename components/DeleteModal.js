export default function DeleteModal({ onConfirm, onClose }) {
  const handleConfirm = () => {
    const input = prompt("Type 'delete' to confirm account deletion:");
    if (input === 'delete') {
      onConfirm();
    } else {
      alert("Incorrect input. Deletion cancelled.");
    }
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
        <h2 className="text-2xl font-bold text-red-500">Delete Account</h2>
        <p className="text-sm text-gray-300">
          This will permanently delete your account data from the leaderboard. Type <strong>delete</strong> to confirm.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Confirm Delete
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
