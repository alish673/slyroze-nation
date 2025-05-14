export default function DisclaimerPanel({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded shadow-lg text-white max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold">Disclaimer</h2>
        <p>
          Slyroze Nation is a decentralized platform. Digital Passports, Zones, and SLYP tokens
          are blockchain assets with no guaranteed financial return. Participate at your own risk.
        </p>
        <button onClick={onClose} className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
