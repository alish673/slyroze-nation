export default function DisclaimerPanel({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-slyrozeBlue">Disclaimer</h2>
        <p className="text-sm text-gray-300">
          Slyroze Nation is a digital collectible platform. All land zones, passports, and SlyPass tokens are virtual assets with no guaranteed financial value.
        </p>
        <p className="text-sm text-gray-300">
          Participation involves blockchain transactions and is subject to market risks. Please do your own research before engaging.
        </p>
        <p className="text-xs text-gray-500 mt-4 text-center">
          This is not financial advice.
        </p>
      </div>
    </div>
  );
}
