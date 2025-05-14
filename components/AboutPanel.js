export default function AboutPanel({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-slyrozePink">About Slyroze Nation</h2>
        <p className="text-sm text-gray-300">
          Slyroze Nation is a futuristic blockchain ecosystem where users can mint digital passports, claim land zones, and earn SLYP rewards.
        </p>
        <p className="text-sm text-gray-300">
          By participating, you join an evolving digital economy powered by community engagement and the SlyPass utility token.
        </p>
        <p className="text-sm text-gray-400 text-center mt-4">
          Powered by SlyPass Token.
        </p>
      </div>
    </div>
  );
}
