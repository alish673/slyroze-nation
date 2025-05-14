export default function StatsCard({ walletAddress, slypBalance, district = "N/A" }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-neon space-y-4 transition-transform hover:scale-105">
      <div>
        <p className="text-neonGreen font-semibold">Connected Wallet:</p>
        <p className="break-words text-sm text-white">{walletAddress || "Not Connected"}</p>
      </div>
      <div>
        <p className="text-neonPurple font-semibold">SLYP Balance:</p>
        <p className="text-white">{slypBalance || "0"} SLYP</p>
      </div>
      <div>
        <p className="text-slyrozeBlue font-semibold">District:</p>
        <p className="text-white">{district}</p>
      </div>
    </div>
  );
}
