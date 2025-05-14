export default function AboutPanel({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded shadow-lg text-white max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold">About Slyroze Nation</h2>
        <p>
          Slyroze Nation is a blockchain-based digital ecosystem where users can mint Passports,
          claim land zones, and earn monthly SLYP rewards. Built with web3 technologies, it aims
          to gamify digital ownership and community rewards.
        </p>
        <button onClick={onClose} className="bg-neonPurple hover:bg-neonGreen text-black py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
