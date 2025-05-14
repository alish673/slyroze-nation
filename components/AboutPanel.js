export default function AboutPanel({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-darkGray text-white p-6 rounded-2xl shadow-neon max-w-md w-full relative animate-float">
        <h2 className="text-2xl font-bold mb-4 text-neonPurple">About Slyroze Nation</h2>
        <p className="text-gray-300 text-sm mb-4">
          Slyroze Nation is a blockchain-powered digital ecosystem where users can mint unique Passports,
          claim land zones, and earn monthly SLYP token rewards. Each land zone represents a piece of the
          Slyroze Nation Metaverse, owned and traded as NFTs.
        </p>
        <p className="text-gray-400 text-xs mb-2">
          Powered by the SlyPass utility token, every interaction helps you grow your influence in the Slyroze economy.
        </p>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neonGreen hover:text-slyrozePink transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
