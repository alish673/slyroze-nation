export default function AuthModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg text-white">
        <h2 className="text-xl mb-4">Login / Sign Up</h2>
        <button onClick={onClose} className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded">Close</button>
      </div>
    </div>
  );
}
